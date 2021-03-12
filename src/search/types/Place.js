import gql from 'graphql-tag';

class Place {
  static name = 'Place';

  static filters = [];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [Place], onFields: [title], substring: $query, first: $first) {
        ... on Place {
          identifier
          name
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _PersonFilter) {
      results: Place(filter: $filter, first: 50) {
        __typename
        ... on Place {
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

export default Place;
