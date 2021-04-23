# Trompa Multimodal Component

> The Multimodal Component React library for the TROMPA project

[![NPM](https://img.shields.io/npm/v/trompa-multimodal-component.svg)](https://www.npmjs.com/package/trompa-multimodal-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project is part of the [TROMPA project](https://trompamusic.eu).

## Installation

Assuming you already have a React application, the easiest way to start using the Multimodal Component, is to install it
via NPM or Yarn.

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

This is a basic usage example. There will be more examples after more options have been added to the Multimodal
Component.

```jsx
import React, { Component } from 'react'
import MultiModalComponent, { SearchConfig, searchTypes } from 'trompa-multimodal-component'

const searchConfig = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition],
});

class Example extends Component {
  render() {
    return (
      <MultiModalComponent
        config={searchConfig}
        onResultClick={node => console.log('User has clicked on:', node)}
        i18n={{
          'en-US': { searchBar: { placeholder_text: 'Search for all music compositions...' } },
          'nl-NL': { searchBar: { placeholder_text: 'Zoek voor alle muziek composities...' } },
        }}
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
| **renderSearchResult** | Function | function(**type**: *String*, **item**: *Object*, **onResultClick**: *function*) { } | Custom render function for search results. | No |
| **placeholderText (deprecated, use i18n)** | String | Enter a search phrase... | Placeholder text for the search input | No |
| **i18n** | Object | undefined | Override translations | No |

#### Currently supported searchTypes

```jsx
const searchTypes = ['AudioObject', 'DigitalDocument', 'Person', 'MusicComposition', 'VideoObject'];
```

#### Custom searchTypes

A custom search type can also be used. This can be either a Class or Object with at least the following properties:
name, filters, searchAllQuery and searchQuery.

For example to create a custom search type for SoftwareApplications;

```js
import gql from 'graphql-tag';

class CustomType {
  static name = 'SoftwareApplication';

  static filters = [];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [SoftwareApplication], onFields: [title], substring: $query, first: $first) {
        ... on SoftwareApplication {
          identifier
          format
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _SoftwareApplicationFilter) {
      results: SoftwareApplication(filter: $filter, first: 50) {
        __typename
        ... on SoftwareApplication {
          identifier
          name
          title
          creator
          source
        }
      }
    }
  `;
}
```

If your setup doesn't
support [static class properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties), you can define the
properties like this as well:

```js
class CustomType {
}

// or const CustomType = {}

CustomType.name = 'SoftwareApplication';
CustomType.filters = [];
CustomType.searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [SoftwareApplication], onFields: [title], substring: $query, first: $first) {
        ... on SoftwareApplication {
          identifier
          format
          _searchScore
        }
      }
    }
  `;

CustomType.searchQuery = gql`
    query($filter: _SoftwareApplicationFilter) {
      results: SoftwareApplication(filter: $filter, first: 50) {
        __typename
        ... on SoftwareApplication {
          identifier
          name
          title
          creator
          source
        }
      }
    }
  `;
```

#### Custom result

If you want to change the rendered result, you can use the `renderSearchResult` prop to use a custom function. This function should return a valid JSX object.

You can use the `SearchResult` component to quickly customise or add a custom search result. However, you can return any
custom styled component. Make sure to pass the onClick function so that the trompa-multimodal-component can handle this
event accordingly.

```jsx
import React, { Component } from 'react'
import MultiModalComponent, { SearchConfig, searchTypes, SearchResult } from 'trompa-multimodal-component'

const searchConfig = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition],
});

const renderSearchResult = (type, item, onClick) => {
  // You can return custom JSX
  // return (
  //   <div onClick={() => onClick(item)}>{item.title}</div>
  // );

  // If you conditionally return a search result, make sure to always fallback to a default search result like the
  // following line.
  return <SearchResult title={item.title} variant="default" onClick={() => onClick(item)} />
};

class Example extends Component {
  render() {
    return (
      <MultiModalComponent
        config={searchConfig}
        onResultClick={node => console.log('User has clicked on:', node)}
        renderSearchResult={renderSearchResult}
        i18n={{
          'en-US': { searchBar: { placeholder_text: 'Search for all music compositions...' } },
          'nl-NL': { searchBar: { placeholder_text: 'Zoek voor alle muziek composities...' } },
        }}
      />
    )
  }
}
```

## Local development

To start the example demo, run

```bash
npm run start:example
```

And visit http://localhost:5050 in a browser

## License

Apache-2.0 ©
