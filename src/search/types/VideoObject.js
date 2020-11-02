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
    query($query: String!) {
      allResults: searchMetadataText(onTypes: [VideoObject], onFields: [title], substring: $query) {
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
