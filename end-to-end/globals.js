module.exports = {
  secondsToWait      : 10,
  visualDiffOptions  : { tolerance: 1, prepareBaseImage: true },
  personModalLocators: {
    selectPersonModal   : 'button[data-test-id=select-person-modal]',
    firstSearchResult   : 'div[data-test-id=first-search-result]',
    headerInitialResults: '//h6[contains(text(), "50 results")]',
  },
  mediaModalLocators: {
    selectMediaModal    : 'button[data-test-id=select-media-modal]',
    headerInitialResults: '//h6[contains(text(), "18 results")]',
    firstSearchResult   : 'div[data-test-id=first-search-result]',
  },
};
