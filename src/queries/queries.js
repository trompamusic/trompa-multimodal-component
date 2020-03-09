export const SEARCH_PERSONS_QUERY = `
  Person (filter: { name_contains: $searchPhrase }, first: $first) {
    name
    creator
    source
    jobTitle
  }
`;

export const SEARCH_MUSIC_COMPOSITION_QUERY = `
  MusicComposition (filter: { name_contains: $searchPhrase }, first: $first) {
    name
    creator
    source
  }
`;

export const SEARCH_DIGITAL_DOCUMENT_QUERY = `
  DigitalDocument (filter: { name_contains: $searchPhrase }, first: $first) {
    name
    version
    creator
    source
    publisher
  }
`;

export const SEARCH_VIDEO_OBJECT_QUERY = `
  VideoObject (filter: { name_contains: $searchPhrase }, first: $first) {
    name
    url
    description
    creator
    source
    duration
  }
`;