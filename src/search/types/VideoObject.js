import gql from 'graphql-tag';
import DigitalDocument from './DigitalDocument';

class VideoObject {
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
      allResults: searchMetadataText(onTypes: [VideoObject], onFields: [title], substring: $query, first: $first) {
        ... on VideoObject {
          identifier
          format
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _VideoObjectFilter) {
      results: VideoObject(filter: $filter, first: 50) {
        __typename
        ... on VideoObject {
          identifier
          name
          creator
          source
        }
      }
    }
  `;
}

export default VideoObject;
