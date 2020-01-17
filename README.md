# trompa-multimodal-component

> The Multimodal Component for React applications

[![NPM](https://img.shields.io/npm/v/trompa-multimodal-component.svg)](https://www.npmjs.com/package/trompa-multimodal-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

If you're using NPM:

```bash
npm install --save trompa-multimodal-component
```

If you're using Yarn:

```bash
yarn add trompa-multimodal-component
```

## Usage

```jsx
import React, { Component } from 'react'
import { MultiModalComponent } from 'trompa-multimodal-component'

class Example extends Component {
  render () {
    return (
      <MultiModalComponent
        uri
        onResultClick={node => console.log('User has clicked on:', node)}
      />
    )
  }
}
```

### Props

| Prop | Type | Default value | Description | Required |
|------|------|---------------|-------------|----------|
| **uri** | String | https://api-test.trompamusic.eu  | The GraphQL uri used in the ApolloClient | No |
| **onResultClick** | Function | function(**result**: *Object*) { }  | Callback when the user clicks on a result. | No |

## License

MIT © [ChristiaanScheermeijer](https://github.com/ChristiaanScheermeijer)
