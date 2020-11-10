# Trompa Multimodal Component

> The Multimodal Component React library for the TROMPA project

[![NPM](https://img.shields.io/npm/v/trompa-multimodal-component.svg)](https://www.npmjs.com/package/trompa-multimodal-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project is part of the [TROMPA project](https://trompamusic.eu).

## Installation

Assuming you already have a React application, the easiest way to start using the Multimodal Component, is to install it via NPM or Yarn.

If you're using NPM:

```bash
npm install --save trompa-multimodal-component
```

If you're using Yarn:

```bash
yarn add trompa-multimodal-component
```

### Material-UI
The MultiModal Component uses the peer dependency MaterialUI, so make sure you have it installed as well.

NPM:
```bash
npm install @material-ui/core @material-ui/icons
```

Yarn:
```bash
yarn add @material-ui/core @material-ui/icons
```



## Usage

This is a basic usage example. There will be more examples after more options have been added to the Multimodal Component.

```jsx
import React, { Component } from 'react'
import MultiModalComponent, { SearchConfig, searchTypes } from 'trompa-multimodal-component'

const searchConfig = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition],
});

class Example extends Component {
  render () {
    return (
      <MultiModalComponent
        config={searchConfig}
        placeholderText="Search for all music compositions..."
        onResultClick={node => console.log('User has clicked on:', node)}
      />
    )
  }
}
```

### Explicit filtering example

```jsx
const searchConfig = new SearchConfig({
  searchTypes: [searchTypes.DigitalDocument],
  fixedFilter: {
    workExample_some: {
      identifier_in: ['56667d40-aa92-4106-a97e-9b28656c56e3', '7e36728d-6112-4deb-9240-1ff77e219f96', '25cdbfcb-af80-4fe6-9dc5-1ae47bcea5e0', 'b31c303e-3484-4787-896c-3c1048995103'],
    },
  },
});
```

### Props

| Prop | Type | Default value | Description | Required |
|------|------|---------------|-------------|----------|
| **searchConfig** | SearchConfig | undefined  | An instance of the SearchConfig class | Yes |
| **onResultClick** | Function | function(**result**: *Object*) { }  | Callback when the user clicks on a result. | No |
| **placeholderText** | String | Enter a search phrase... | Placeholder text for the search input | No |

#### Currently supported searchTypes
```jsx
const searchTypes = ['AudioObject', 'DigitalDocument', 'Person', 'MusicComposition', 'VideoObject'];
```

## License

Apache-2.0 ©
