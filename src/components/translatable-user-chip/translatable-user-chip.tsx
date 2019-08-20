import { Component, h, ComponentInterface, Prop } from '@stencil/core'

@Component({
  tag: 'translatable-user-chip',
  styleUrl: 'translatable-user-chip.scss',
  shadow: true,
})
export class TranslatableUserChip implements ComponentInterface {
  @Prop() photoURL?: string
  @Prop() displayName?: string
  @Prop() textColor?: string
  @Prop() color?: string

  render() {
    return (
      <ion-chip color={this.color}>
        <ion-avatar>
          <img src={this.photoURL} />
        </ion-avatar>
        <ion-label color={this.textColor}>{this.displayName}</ion-label>
      </ion-chip>
    )
  }
}
