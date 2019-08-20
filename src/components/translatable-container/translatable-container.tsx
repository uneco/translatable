import { Component, h, ComponentInterface, Listen, Prop, Host, State } from '@stencil/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import '@ionic/core'

import { FirebaseConfig, PhraseData, TranslateHistory } from '../../types'
import { SaveTranslationEvent, RequireSignInEvent } from '../translatable-modal/translatable-modal'
import { FetchTranslationEvent, StartTranslationEvent } from '../translatable-text/translatable-text'
import { normalizeText, onCustomEvent, sortBy } from '../../utils/utils'

@Component({
  tag: 'translatable-container',
  styleUrl: 'translatable-container.scss',
  shadow: true,
})
export class TranslatableContainer implements ComponentInterface {
  @Prop() pageTitle!: string
  @Prop() firebaseConfigPath?: string
  @State() private currentUser?: firebase.User
  @State() private signInRequired = false

  private firebaseConfig?: FirebaseConfig
  private firebaseApp!: Promise<firebase.app.App>
  private firebaseAppResolver!: (value: firebase.app.App) => void
  private modalController?: HTMLIonModalControllerElement
  private modalContent?: HTMLTranslatableModalElement

  constructor () {
    this.firebaseApp = new Promise((resolve) => {
      this.firebaseAppResolver = resolve
    })
  }

  /*
   * lifecycles
   */
  async componentDidLoad() {
    if (!this.firebaseConfigPath) {
      throw new Error('no firebase config path given')
    }
    this.fetchFirebaseConfig(this.firebaseConfigPath).then(() => {
      if (this.firebaseConfig) {
        const app = firebase.initializeApp(this.firebaseConfig)
        this.firebaseAppResolver(app)
      }
    })

    const app = await this.firebaseApp
    app.auth().onAuthStateChanged((user) => this.handleAuthStateChange(user))
  }

  /*
   * handlers
   */
  @Listen('fetchTranslation')
  async handleFetchTranslation(event: CustomEvent<FetchTranslationEvent>) {
    const { hash } = event.detail
    const phrase = await this.fetchPhrase(hash)
    event.detail.setPhrase(phrase)
  }

  @Listen('startTranslation')
  async handleStartTranslation(startTranslationEvent: CustomEvent<StartTranslationEvent>) {
    const { hash, originalText, file } = startTranslationEvent.detail

    const phraseRef = await this.getPhraseRef(hash)
    const phraseSnapshot = await phraseRef.get()
    const phrase = phraseSnapshot.data()

    const { modal, modalContent } = await this.showModal()

    const dismiss = () => {
      modal.dismiss()
      modalContent.originalText = ''
      modalContent.translatedText = ''
      modalContent.history = []
    }

    modal.addEventListener('cancel', () => {
      dismiss()
    })

    onCustomEvent<RequireSignInEvent>(modal, 'requireSignIn', async (event) => {
      event.detail.signedIn(await this.signIn())
    })

    onCustomEvent<SaveTranslationEvent>(modal, 'saveTranslation', async (event) => {
      if (!this.currentUser) {
        throw new Error('Authorization Required')
      }

      const { translatedText } = event.detail
      const isNotChanged = phrase && normalizeText(phrase.translatedText) === normalizeText(translatedText)
      if (isNotChanged) {
        dismiss()
        return
      }

      const newPhrase = {
        originalText: normalizeText(originalText),
        translatedText: normalizeText(translatedText),
      }

      await phraseRef.set({
        ...newPhrase,
        translatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: await this.getUserRef(this.currentUser.uid),
        files: firebase.firestore.FieldValue.arrayUnion(file),
      }, { merge: true })

      startTranslationEvent.detail.textElement.setPhrase(newPhrase)
      dismiss()
    })

    if (phrase) {
      modalContent.originalText = phrase.originalText
      modalContent.translatedText = phrase.translatedText
    } else {
      modalContent.originalText = originalText
      modalContent.translatedText = ''
    }

    const historyRef = phraseRef.collection('history')
    const history = (await historyRef.get()).docs.map((history) => ({
      id: history.id,
      ...history.data(),
    })) as TranslateHistory[]
    modalContent.history = sortBy(history, (t) => t.translatedAt.toMillis(), true)
  }

  async handleSignInButtonClick () {
    await this.signIn()
  }

  async handleSignOutButtonClick () {
    const app = await this.firebaseApp
    await app.auth().signOut()
    this.currentUser = undefined
  }

  async handleAuthStateChange(user: firebase.User | null) {
    if (user) {
      this.currentUser = user
      this.signInRequired = false
      const userRef = await this.getUserRef(user.uid)
      await userRef.set({
        displayName: user.displayName,
        photoURL: user.photoURL,
      }, { merge: true })
    } else {
      this.signInRequired = true
    }
  }

  async getPhraseRef (hash: string) {
    return (await this.firebaseApp).firestore().collection('phrases').doc(hash)
  }

  async getUserRef (uid: string) {
    return (await this.firebaseApp).firestore().collection('users').doc(uid)
  }

  /*
   * actions
   */
  async signIn() {
    const app = await this.firebaseApp
    const credential = await app.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
    if (!credential.user) {
      throw new Error('sign in failed')
    }
    return credential.user
  }

  async fetchFirebaseConfig(path: string) {
    const response = await fetch(path)
    this.firebaseConfig = await response.json()
  }

  async fetchPhrase(hash: string) {
    const app = await this.firebaseApp
    const phraseRef = app.firestore().collection('phrases').doc(hash)
    const phraseSnapshot = await phraseRef.get()
    if (!phraseSnapshot.exists) {
      return null
    }
    return phraseSnapshot.data() as PhraseData
  }

  async showModal() {
    if (!this.modalController || !this.modalContent) {
      throw new Error('modal is not rendered!')
    }

    const modalContent = this.modalContent
    const modal = await this.modalController.create({
      component: modalContent,
    })

    modal.style.setProperty('--width', '80%')
    modal.style.setProperty('--height', '420px')
    modal.style.setProperty('position', 'fixed')

    await modal.present()
    return {
      modal,
      modalContent,
    }
  }

  render() {
    return (
      <Host>
        <ion-modal-controller ref={(c) => this.modalController = c} />
        <translatable-modal
          isUserSignedIn={this.currentUser !== undefined}
          originalText=""
          ref={(m) => this.modalContent = m}
          translatedText=""
        />
        <header>
          <ion-toolbar color="tertiary">
            <ion-title>{this.pageTitle}</ion-title>
            {this.currentUser && (
              <translatable-user-chip
                displayName={this.currentUser.displayName || undefined}
                photoURL={this.currentUser.photoURL || undefined}
                slot="end"
                textColor="light"
              />
            )}
            <ion-buttons slot="end">
              {this.signInRequired && (
                <ion-button onClick={() => this.handleSignInButtonClick()}>
                  <ion-icon name="logo-github" slot="start"></ion-icon>
                  Sign in with Github
                </ion-button>
              )}
              {this.currentUser && (
                <ion-button onClick={() => this.handleSignOutButtonClick()}>
                  <ion-icon name="log-out" slot="start"></ion-icon>
                  Sign Out
                </ion-button>
              )}
            </ion-buttons>
          </ion-toolbar>
        </header>
        <slot />
      </Host>
    )
  }
}
