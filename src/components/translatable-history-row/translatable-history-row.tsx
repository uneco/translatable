import { Component, h, ComponentInterface, Prop } from '@stencil/core'
import '@ionic/core'
import { TranslateHistory } from '../../types'

@Component({
  tag: 'translatable-history-row',
  styleUrl: 'translatable-history-row.scss',
  shadow: true,
})
export class TranslatableHistoryRow implements ComponentInterface {
  @Prop() history!: TranslateHistory

  render() {
    return (
      <ion-label>
        <div class="diff">
          {this.history.diff ? (this.history.diff.map((diff, i) => {
            return <span class={diff.type} key={i.toString()}>{diff.value}</span>
          })) : this.history.translatedText}
        </div>
        <div class="metadata">
          <span class="timestamp">{this.history.translatedAt.toDate().toLocaleString()}</span>
          <translatable-user-chip
            color="primary"
            displayName={this.history.user.displayName || undefined}
            photoURL={this.history.user.photoURL || undefined}
            textColor="primary"
          />
        </div>
      </ion-label>
    )
  }
}
