import gql from 'graphql-tag';
import Person from './Person';

class DigitalDocument {
  static name = 'DigitalDocument';

  static filters = [{
    onProperty: 'author',
    name      : 'Composer',
    searchType: Person,
  }];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [DigitalDocument], onFields: [title], substring: $query, first: $first) {
        ... on DigitalDocument {
          identifier
          name
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _DigitalDocumentFilter) {
      results: DigitalDocument(filter: $filter, first: 50) {
        __typename
        ... on DigitalDocument {
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

export default DigitalDocument;
