import gql from 'graphql-tag';

class Person {
  static filters = [{
    onProperty: 'birthPlace',
    name      : 'Birthplace',
    filter    : null,
  }];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [Person], onFields: [title], substring: $query, first: $first) {
        ... on Person {
          identifier
          name
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _PersonFilter) {
      results: Person(filter: $filter, first: 50) {
        __typename
        ... on Person {
          identifier
          name
          creator
          source
          jobTitle
        }
      }
    }
  `;
}

export default Person;
