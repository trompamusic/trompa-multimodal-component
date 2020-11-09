import gql from 'graphql-tag';
import DigitalDocument from './DigitalDocument';

class AudioObject {
  static name = 'AudioObject';

  static filters = [{
    onProperty: 'exampleOfWork',
    name      : 'Score',
    searchType: DigitalDocument,
  }, {
    onProperty: 'format',
    name      : 'Format',
  }];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [AudioObject], onFields: [title], substring: $query, first: $first) {
        ... on AudioObject {
          identifier
          format
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _AudioObjectFilter) {
      results: AudioObject(filter: $filter, first: 50) {
        __typename
        ... on AudioObject {
          identifier
          name
          creator
          source
        }
      }
    }
  `;
}

export default AudioObject;
