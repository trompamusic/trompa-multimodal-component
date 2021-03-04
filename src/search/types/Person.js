import gql from 'graphql-tag';
import Place from './Place';

class Person {
  static name = 'Person';

  static filters = [{
    onProperty: 'subject',
    name      : 'role',
  }, {
    onProperty: 'birthPlace',
    name      : 'birthplace',
    searchType: Place,
  }];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [Person], onFields: [title], substring: $query, first: $first) {
        ... on Person {
          identifier
          name
          subject
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
          subject
          creator
          source
          jobTitle
        }
      }
    }
  `;
}

export default Person;
