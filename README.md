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

### Props

| Prop | Type | Default value | Description | Required |
|------|------|---------------|-------------|----------|
| **searchConfig** | SearchConfig | undefined  | An instance of the SearchConfig class | Yes |
| **onResultClick** | Function | function(**result**: *Object*) { }  | Callback when the user clicks on a result. | No |
| **placeholderText** | String | Enter a search phrase... | Placeholder text for the search input | No |

## License

Apache-2.0 ©
