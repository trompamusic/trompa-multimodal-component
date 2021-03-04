const { secondsToWait, visualDiffOptions, scoreModalLocators: locators } = require('./globals');

Feature('Score modal');

Scenario('Opens score modal with expected content', ({ I }) => {
  const screenshotPath = "score_modal_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('50 results');
  I.see('Composer');
  I.see('Henry Purcell');
  I.see('Score', locators.firstSearchResult);
  I.see('Edmund Gooch', locators.firstSearchResult);
  I.see('Tis by thy strength the mountains stand', locators.firstSearchResult);
  I.see('cpdl.org', locators.firstSearchResult);
});

Scenario('Selects score from modal', ({ I }) => {
  const screenshotPath = "home_score_modal_selected_.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('Tis by thy strength the mountains stand', locators.firstSearchResult);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see('Tis by thy strength the mountains stand');
});

Scenario('Opens and closes source image link from modal', async ({ I }) => {
  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('cpdl.org', locators.firstSearchResult);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl('about:blank');
});

Scenario('Gives results that match query within modal', ({ I }) => {
  const screenshotPath = "score_modal_with_score_searched.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', 'Adieu');
  I.waitForElement('//h6[contains(text(), "32 results")]', secondsToWait);
  I.see('Adieu! sweet love, adieu');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see('cpdl.org');
});

Scenario('Removing filters works as expected', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Henry Purcell');
  I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
  I.click('clear');
  I.waitForElement('//h6[contains(text(), "50 results")]', secondsToWait);
});

Scenario('Adding multiple filters works as expected', ({ I }) => {
  const screenshotPath = "score_modal_with_multiple_filters_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectScoreModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);

  I.checkOption('Henry Purcell');
  I.checkOption('Antonio Caldara');
  I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
  I.see('2 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

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
