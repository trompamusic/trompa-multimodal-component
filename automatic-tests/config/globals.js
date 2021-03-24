module.exports = {
  secondsToWait    : 30,
  visualDiffOptions: { tolerance: 15, prepareBaseImage: false },
  byRole           : role => ({ css: `[role=${role}] ` }),
  getUrlHostName   : url => {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
  
    return null;
  },
  compositionModalLocators: {
    selectCompositionModal: 'button[data-test-id=select-composition-modal]',
    headerInitialResults  : '//h6[contains(text(), "50 results")]',
    firstSearchResult     : 'div[data-test-id=first-search-result]',
  },
  mediaModalLocators: {
    selectMediaModal    : 'button[data-test-id=select-media-modal]',
    headerInitialResults: '//h6[contains(text(), "18 results")]',
    firstSearchResult   : 'div[data-test-id=first-search-result]',
  },
  personModalLocators: {
    selectPersonModal   : 'button[data-test-id=select-person-modal]',
    firstSearchResult   : 'div[data-test-id=first-search-result]',
    headerInitialResults: '//h6[contains(text(), "50 results")]',
  },
  scoreModalLocators: {
    selectScoreModal    : 'button[data-test-id=select-score-modal]',
    headerInitialResults: '//h6[contains(text(), "50 results")]',
    firstSearchResult   : 'div[data-test-id=first-search-result]',
  },
};
