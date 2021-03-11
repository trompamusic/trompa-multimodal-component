import gql from 'graphql-tag';
import Person from './Person';

class MusicComposition {
  static name = 'MusicComposition';

  static filters = [{
    onProperty: 'author',
    name      : 'composer',
    searchType: Person,
  }];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [MusicComposition], onFields: [title], substring: $query, first: $first) {
        ... on MusicComposition {
          identifier
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _MusicCompositionFilter) {
      results: MusicComposition(filter: $filter, first: 50) {
        __typename
        ... on MusicComposition {
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

export default MusicComposition;
