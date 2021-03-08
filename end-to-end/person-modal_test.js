const { secondsToWait, visualDiffOptions, personModalLocators: locators } = require('./globals');

Feature('Person modal');

let currentBrowser;

Scenario('Loads home page', ({ I }) => {
  const screenshotPath = "home_loaded.png";

  I.usePlaywrightTo('Detect current browser', async ({ browser }) => {
    const browserObject = await browser;

    currentBrowser = browserObject._initializer.name;
    console.log('Current browser is:', currentBrowser);
  });

  I.amOnPage('/');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see('No selection');
});

Scenario('Language switcher initially loads English', ({ I }) => {
  const screenshotPath = "person_modal_language_switcher_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.see('English');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Language switcher can select Dutch language', ({ I }) => {
  const screenshotPath = "person_modal_language_switcher_dutch_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.click('English', { xpath: '//header//li[1]' });
  I.click('Dutch', { xpath: '//ul//li[2]' });
  I.see('Nederlands');

  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Opens person modal with expected content', ({ I }) => {
  const screenshotPath = "person_modal_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('50 results');
  I.see('Role');
  I.see('Composer');
  I.see('Pianist');
  I.see('Birthplace');
  I.see('Brugge');
  I.see('Linz');
  I.say('First result:');
  I.see('Person', locators.firstSearchResult);
  I.see('Unknown role', locators.firstSearchResult);
  I.see('Charles Steggall', locators.firstSearchResult);
  I.see('cpdl.org', locators.firstSearchResult);
});

Scenario('Selects person from modal', ({ I }) => {
  const screenshotPath = "home_person_modal_selected_.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('Charles Steggall', locators.firstSearchResult);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see('Charles Steggall');
});

Scenario('Opens person source link from modal', ({ I }) => {
  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('cpdl.org', locators.firstSearchResult);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl('https://cpdl.org/wiki/index.php/Charles_Steggall');
});

Scenario('Gives results that match query within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_person_searched.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', 'Prein');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('Christian Prein');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', ({ I }) => {
  const screenshotPath = "person_modal_with_multiple_source_links.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see('viaf.org');
  I.fillField('search', 'Giache');
  I.waitForElement('//h6[contains(text(), "7 results")]', secondsToWait);
  I.see('cpdl.org');
  I.see('musicbrainz.org');
  I.see('imslp.org');
  I.see('isni.org');
  I.see('id.loc.gov');
  I.fillField('search', 'Beatles');
  I.waitForElement('//h6[contains(text(), "9 results")]', secondsToWait);
  I.see('wikidata.org');
  I.see('en.wikipedia.org');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with composer filter within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_composer_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Composer');
  I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
  I.see('Tod B. Galloway', locators.firstSearchResult);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with pianist filter within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_pianist_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_person_searched_and_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Composer');
  I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
  I.see('Tod B. Galloway', locators.firstSearchResult);

  I.fillField('search', 'Galloway');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('Tod B. Galloway');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Removing multiple filters works as expected', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', 'Piotr');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
  I.checkOption('Composer');
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
  I.click('clear');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
});

Scenario('Adding multiple filters works as expected', ({ I }) => {
  const screenshotPath = "person_modal_with_multiple_filters_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);

  I.fillField('search', 'Piotr');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
  I.checkOption('Composer');
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
  I.see('Piotr Anderszewski');
  I.see('Pyotr Ilyich Tchaikovsky');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with birthplace filter within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_birthplace_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('Brugge');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.see('Arnold von Bruck');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Narrows down birthplace filters with filter search box within modal', ({ I }) => {
  const screenshotPath = "person_modal_with_birthplace_filter_search_box_used.png";

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search-filter', 'Brugge');
  I.dontSee('Linz');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});
