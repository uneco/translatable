import { Component, h, Element, ComponentInterface, Event, EventEmitter, Prop, Host, State, Method } from '@stencil/core'
import { PhraseData } from '../../types'
import { markdown, toHypertext } from '../../utils/utils'

export interface FetchTranslationEvent {
  text: string
  hash: string
  element: TranslatableText
  setPhrase(phrase: PhraseData | null): void
}

export interface StartTranslationEvent {
  hash: string
  originalText: string
  textElement: HTMLTranslatableTextElement
  file: string
}

@Component({
  tag: 'translatable-text',
  styleUrl: 'translatable-text.scss',
  shadow: true,
})
export class TranslatableText implements ComponentInterface {
  @Element() element!: HTMLTranslatableTextElement

  @Event({
    eventName: 'fetchTranslation',
    composed: true,
    bubbles: true,
  }) fetchTranslationEventEmitter!: EventEmitter<FetchTranslationEvent>

  @Event({
    eventName: 'startTranslation',
    composed: true,
    bubbles: true,
  }) startTranslationEventEmitter!: EventEmitter<StartTranslationEvent>

  @Prop() hash!: string
  @Prop() originalText!: string
  @Prop() file!: string
  @Prop() translatedText?: string
  @Prop() preparing = true

  @State() private hypertext?: any[]
  private lastFetchedHash?: string

  /*
   * lifecycles
   */
  async componentDidRender() {
    this.fetchTranslation()
  }

  /*
   * handlers
   */
  async handleTranslateButtonClick (event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.startTranslationEventEmitter.emit({
      hash: this.hash,
      originalText: this.originalText,
      textElement: this.element,
      file: this.file,
    })
  }

  /*
   * actions
   */
  async fetchTranslation() {
    if (this.lastFetchedHash === this.hash) {
      return
    }
    this.lastFetchedHash = this.hash
    this.fetchTranslationEventEmitter.emit({
      text: this.originalText,
      hash: this.hash,
      element: this,
      setPhrase: (phrase) => {
        this.setPhrase(phrase)
      },
    })
  }

  @Method()
  async setPhrase (phrase: PhraseData | null) {
    this.preparing = false
    this.hypertext = toHypertext(markdown(phrase ? phrase.translatedText : this.originalText))
    this.translatedText = phrase ? phrase.translatedText : undefined
  }

  render() {
    return (
      <Host class={{ preparing: this.preparing, translated: Boolean(this.translatedText) }}>
        <div class="translate-button-area">
          <button class="translate-button" onClick={(event) => this.handleTranslateButtonClick(event)}>
            <ion-icon color="light" name="create"></ion-icon>
          </button>
        </div>
        { this.hypertext ? this.hypertext : <slot /> }
      </Host>
    )
  }
}
