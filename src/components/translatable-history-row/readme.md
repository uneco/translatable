# translatable-history-row



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description | Type               | Default     |
| ---------------------- | --------- | ----------- | ------------------ | ----------- |
| `history` _(required)_ | --        |             | `TranslateHistory` | `undefined` |


## Dependencies

### Used by

 - [translatable-modal](../translatable-modal)

### Depends on

- ion-label
- [translatable-user-chip](../translatable-user-chip)

### Graph
```mermaid
graph TD;
  translatable-history-row --> ion-label
  translatable-history-row --> translatable-user-chip
  translatable-user-chip --> ion-chip
  translatable-user-chip --> ion-avatar
  translatable-user-chip --> ion-label
  ion-chip --> ion-ripple-effect
  translatable-modal --> translatable-history-row
  style translatable-history-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
