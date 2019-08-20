# translatable-modal



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute           | Description | Type                 | Default     |
| ----------------------------- | ------------------- | ----------- | -------------------- | ----------- |
| `history`                     | --                  |             | `TranslateHistory[]` | `[]`        |
| `isUserSignedIn`              | `is-user-signed-in` |             | `boolean`            | `false`     |
| `originalText` _(required)_   | `original-text`     |             | `string`             | `undefined` |
| `translatedText` _(required)_ | `translated-text`   |             | `string`             | `undefined` |


## Events

| Event             | Description | Type                                |
| ----------------- | ----------- | ----------------------------------- |
| `cancel`          |             | `CustomEvent<void>`                 |
| `requireSignIn`   |             | `CustomEvent<RequireSignInEvent>`   |
| `saveTranslation` |             | `CustomEvent<SaveTranslationEvent>` |


## Dependencies

### Used by

 - [translatable-container](../translatable-container)

### Depends on

- ion-content
- ion-grid
- ion-row
- ion-col
- ion-title
- ion-textarea
- ion-list
- ion-item
- [translatable-history-row](../translatable-history-row)
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  translatable-modal --> ion-content
  translatable-modal --> ion-grid
  translatable-modal --> ion-row
  translatable-modal --> ion-col
  translatable-modal --> ion-title
  translatable-modal --> ion-textarea
  translatable-modal --> ion-list
  translatable-modal --> ion-item
  translatable-modal --> translatable-history-row
  translatable-modal --> ion-button
  translatable-modal --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  translatable-history-row --> ion-label
  translatable-history-row --> translatable-user-chip
  translatable-user-chip --> ion-chip
  translatable-user-chip --> ion-avatar
  translatable-user-chip --> ion-label
  ion-chip --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  translatable-container --> translatable-modal
  style translatable-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
