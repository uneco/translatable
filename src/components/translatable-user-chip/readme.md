# translatable-user-chip



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                  | Default     |
| ------------- | -------------- | ----------- | --------------------- | ----------- |
| `color`       | `color`        |             | `string \| undefined` | `undefined` |
| `displayName` | `display-name` |             | `string \| undefined` | `undefined` |
| `photoURL`    | `photo-u-r-l`  |             | `string \| undefined` | `undefined` |
| `textColor`   | `text-color`   |             | `string \| undefined` | `undefined` |


## Dependencies

### Used by

 - [translatable-container](../translatable-container)
 - [translatable-history-row](../translatable-history-row)

### Depends on

- ion-chip
- ion-avatar
- ion-label

### Graph
```mermaid
graph TD;
  translatable-user-chip --> ion-chip
  translatable-user-chip --> ion-avatar
  translatable-user-chip --> ion-label
  ion-chip --> ion-ripple-effect
  translatable-container --> translatable-user-chip
  translatable-history-row --> translatable-user-chip
  style translatable-user-chip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
