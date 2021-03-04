const { secondsToWait, visualDiffOptions, compositionModalLocators: locators } = require('./globals');

Feature('Composition modal');

Scenario('Opens composition modal with expected content', ({ I }) => {
  const screenshotPath = "composition_modal_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('50 results');
  I.see('Composer');
  I.see('Henry Purcell');
  I.see('Composition', locators.firstSearchResult);
  I.see('Thomas Clark', locators.firstSearchResult);
  I.see('Tis by thy strength the mountains stand', locators.firstSearchResult);
  I.see('cpdl.org', locators.firstSearchResult);
});

Scenario('Selects composition from modal', ({ I }) => {
  const screenshotPath = "home_composition_modal_selected_.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('Tis by thy strength the mountains stand', locators.firstSearchResult);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see('Tis by thy strength the mountains stand');
});

Scenario('Opens composition source link from modal', ({ I }) => {
  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('cpdl.org', locators.firstSearchResult);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl('http://www.cpdl.org/wiki/index.php/%27Tis_by_thy_strength_the_mountains_stand_(Thomas_Clark)');
});

Scenario('Gives results that match query within modal', ({ I }) => {
  const screenshotPath = "composition_modal_with_composition_searched.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', 'Adieu');
  I.waitForElement('//h6[contains(text(), "42 results")]', secondsToWait);
  I.see('Adieu! sweet love, adieu');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see('cpdl.org');
  I.see('en.wikipedia.org');
});

Scenario('Filters results with composer filter within modal', ({ I }) => {
  const screenshotPath = "composition_modal_with_composer_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Francis Melville');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.see('A Cradle Song');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
  const screenshotPath = "composition_modal_with_composition_searched_and_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Francis Melville');
  I.fillField('search', 'Cradle');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.see('A Cradle Song');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Removing filters works as expected', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Francis Melville');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.click('clear');
  I.waitForElement('//h6[contains(text(), "50 results")]', secondsToWait);
});

Scenario('Adding multiple filters works as expected', ({ I }) => {
  const screenshotPath = "composition_modal_with_multiple_filters_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);

  I.checkOption('Francis Melville');
  I.checkOption('Pierre de Manchicourt');
  I.waitForElement('//h6[contains(text(), "38 results")]', secondsToWait);
  I.see('2 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Narrows down composer filters with filter search box within modal', ({ I }) => {
  const screenshotPath = "composition_modal_with_composer_filter_search_box_used.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search-filter', 'Francis');
  I.dontSee('Joachim Kelecom');
  I.dontSee('Antonio Caldara');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});
