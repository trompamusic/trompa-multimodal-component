import gql from 'graphql-tag';
import Person from './Person';

class MusicComposition {
  static filters = [{
    onProperty: 'author',
    name      : 'Composer',
    searchType: Person,
  }];

  static searchAllQuery = gql`
    query($query: String!) {
      allResults: searchMetadataText(onTypes: [MusicComposition], onFields: [title], substring: $query) {
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
          creator
          source
        }
      }
    }
  `;
}

export default MusicComposition;
