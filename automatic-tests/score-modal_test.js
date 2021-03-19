const { secondsToWait, visualDiffOptions, scoreModalLocators: locators, getUrlHostName, byRole } = require('./config/globals');

Feature('Score modal');

let currentBrowser;

Scenario('Opens score modal with expected content', async ({ I }) => {
  const screenshotPath = "score_modal_loaded.png";

  I.usePlaywrightTo('Detect current browser', async ({ browser }) => {
    const browserObject = await browser;

    currentBrowser = browserObject._initializer.name;
    console.log('Current browser is:', currentBrowser);
  });

  const response                                     = await I.sendQuery(searchQuery);
  const { title, name, __typename, creator, source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('50 results');

  within(byRole('listitem'), () => {
    I.see(title);
    I.see(name);
    I.see(__typename);
    I.see(creator);
    I.seeElementInDOM(locate('a')
      .withAttr({ href: source }));
  });
});

Scenario('Language switcher initially loads English', ({ I }) => {
  const screenshotPath = "score_modal_language_switcher_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.see('English');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Language switcher can select Dutch language', ({ I }) => {
  const screenshotPath = "score_modal_language_switcher_dutch_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.click('English', { xpath: '//header//li[1]' });
  I.click('Dutch', { xpath: '//ul//li[2]' });
  I.see('Nederlands');

  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Selects score from modal', async ({ I }) => {
  const screenshotPath = "home_score_modal_selected_.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(locate({ css: '[role=listitem]' }).withText(title));
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see(name);
});

Scenario('Opens and closes source image link from modal', async ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];
  
  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(getUrlHostName(source));
  I.wait(2);
});

Scenario('Gives results that match query within modal', async ({ I }) => {
  const screenshotPath = "score_modal_with_score_searched.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', name);
  I.see(title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', async ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see(getUrlHostName(source));
});

// Scenario('Removing filters works as expected', ({ I }) => {
//   I.amOnPage('/');
//   I.click('Select', locators.selectScoreModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Christian Prein');
//   I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
//   I.click('clear');
//   I.waitForElement('//h6[contains(text(), "50 results")]', secondsToWait);
// });

// Scenario('Adding multiple filters works as expected', ({ I }) => {
//   const screenshotPath = "score_modal_with_multiple_filters_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectScoreModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Christian Prein');
//   I.checkOption('Charles King');
//   I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
//   I.see('2 selected');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

/*
Below tests are commented out because score modal test data misses link to composer(=author) filter
*/

// Scenario('Filters results with composer filter within modal', ({ I }) => {
//   const screenshotPath = "score_modal_with_composer_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectScoreModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Francis Melville');
//   I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
//   I.see('1 selected');
//   I.see('A Cradle Song');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
//   const screenshotPath = "score_modal_with_score_searched_and_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectScoreModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Francis Melville');
//   I.fillField('search', 'Cradle');
//   I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
//   I.see('1 selected');
//   I.see('A Cradle Song');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Narrows down composer filters with filter search box within modal', ({ I }) => {
//   const screenshotPath = "score_modal_with_composer_filter_search_box_used.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectScoreModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.fillField('search-filter', 'Francis');
//   I.dontSee('Joachim Kelecom');
//   I.dontSee('Antonio Caldara');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

const searchQuery = `
query($filter: _DigitalDocumentFilter) {
  results: DigitalDocument(filter: $filter, first: 50) {
    __typename
    ... on DigitalDocument {
      identifier
      name
      title
      creator
      source
    }
  }
}
`;