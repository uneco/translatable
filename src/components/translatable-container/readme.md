# translatable-container



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description | Type                  | Default     |
| ------------------------ | ---------------------- | ----------- | --------------------- | ----------- |
| `firebaseConfigPath`     | `firebase-config-path` |             | `string \| undefined` | `undefined` |
| `pageTitle` _(required)_ | `page-title`           |             | `string`              | `undefined` |


## Dependencies

### Depends on

- ion-modal-controller
- [translatable-modal](../translatable-modal)
- ion-toolbar
- ion-title
- [translatable-user-chip](../translatable-user-chip)
- ion-buttons
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  translatable-container --> ion-modal-controller
  translatable-container --> translatable-modal
  translatable-container --> ion-toolbar
  translatable-container --> ion-title
  translatable-container --> translatable-user-chip
  translatable-container --> ion-buttons
  translatable-container --> ion-button
  translatable-container --> ion-icon
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
  style translatable-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
