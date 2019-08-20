import { Component, h, ComponentInterface, Event, EventEmitter, Prop, Element } from '@stencil/core'
import '@ionic/core'
import { TextareaChangeEventDetail } from '@ionic/core'
import { TranslateHistory } from '../../types'

export interface SaveTranslationEvent {
  translatedText: string
}

export interface RequireSignInEvent {
  signedIn: (user: firebase.User) => void
}

@Component({
  tag: 'translatable-modal',
  styleUrl: 'translatable-modal.scss',
  shadow: true,
})
export class TranslatableModal implements ComponentInterface {
  @Element() element?: HTMLTranslatableModalElement

  @Prop() originalText!: string
  @Prop({
    mutable: true,
    reflect: true,
  }) translatedText!: string
  @Prop() isUserSignedIn = false
  @Prop() history: TranslateHistory[] = []

  @Event({
    eventName: 'requireSignIn',
  }) requireSignInEventEmitter!: EventEmitter<RequireSignInEvent>

  @Event({
    eventName: 'cancel',
  }) cancelEventEmitter!: EventEmitter<void>

  @Event({
    eventName: 'saveTranslation',
  }) saveEventEmitter!: EventEmitter<SaveTranslationEvent>

  cancel () {
    this.cancelEventEmitter.emit()
  }

  saveTranslation () {
    this.saveEventEmitter.emit({
      translatedText: this.translatedText,
    })
  }

  handleCancelButtonClick () {
    this.cancel()
  }

  handleSaveButtonClick () {
    this.saveTranslation()
  }

  handleTranslatedTextChange (event: CustomEvent<TextareaChangeEventDetail>) {
    this.translatedText = event.detail.value || ''
  }

  handleTranslatedTextKeyDown (event: KeyboardEvent) {
    if (event.metaKey && event.key === 'Enter') {
      this.saveTranslation()
    }
  }

  handleSignInButtonClick () {
    this.requireSignInEventEmitter.emit({
      signedIn: () => {
        this.isUserSignedIn = true
      },
    })
  }

  render() {
    return (
      <ion-content class="container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-title>Original</ion-title>
              <ion-textarea
                class="original"
                disabled
                readonly
                spellcheck
                value={this.originalText}
              >
              </ion-textarea>
            </ion-col>
            <ion-col>
              <ion-title>Translated</ion-title>
              <ion-textarea
                class="translated"
                onIonChange={(event) => this.handleTranslatedTextChange(event)}
                onKeyDown={(event) => this.handleTranslatedTextKeyDown(event)}
                spellcheck
                value={this.translatedText}
              />
            </ion-col>
            <ion-col>
              <ion-title>History</ion-title>
              <ion-content class="history">
                <ion-list>
                  {this.history.map((history) => (
                    <ion-item key={history.id}>
                      <translatable-history-row history={history} />
                    </ion-item>
                  ))}
                </ion-list>
              </ion-content>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="actions">
              <ion-button fill="outline" onClick={() => this.handleCancelButtonClick()}>Cancel</ion-button>
              <ion-button onClick={() => this.handleSaveButtonClick()}>Save</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        {!this.isUserSignedIn && (
          <div class="sign-in-required-overlay">
            <ion-button onClick={() => this.handleSignInButtonClick()}>
              <ion-icon name="logo-github" slot="start"></ion-icon>
              Sign in with Github
            </ion-button>
          </div>
        )}
      </ion-content>
    )
  }
}
