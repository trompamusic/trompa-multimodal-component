Feature('multimodal-component');

const secondsToWait     = 10;
const differenceOptions = { tolerance: 1, prepareBaseImage: true };

const locatorSelectPersonModal  = 'button[data-test-id=select-person-modal]';
const locatorFirstSearchResult  = 'div[data-test-id=first-search-result]';
const locatorHeaderFiftyResults = '//h6[contains(text(), "50 results")]';

Scenario('Loads home page', ({ I }) => {
  const screenshotPath = "home_loaded.png";

  I.amOnPage('/');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
  I.see('No selection');
});

Scenario('Opens person modal with expected content', ({ I }) => {
  const screenshotPath = "person_modal_loaded.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);

  I.see('50 results');
  I.see('Role');
  I.see('Composer');
  I.see('Pianist');
  I.see('Birthplace');
  I.see('Bologna');
  I.see('Palermo');
  I.say('First result:');
  I.see('Person', locatorFirstSearchResult);
  I.see('Unknown role', locatorFirstSearchResult);
  I.see('Charles Steggall', locatorFirstSearchResult);
  I.see('cpdl.org', locatorFirstSearchResult);
});

Scenario('Selects person from modal', ({ I }) => {
  const screenshotPath = "home_with_selected_result.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.click('Charles Steggall', locatorFirstSearchResult);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
  I.see('Charles Steggall');
});

Scenario('Opens person source link from modal', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.click('cpdl.org', locatorFirstSearchResult);
  I.amOnPage('https://cpdl.org/wiki/index.php/Charles_Steggall');
});

Scenario('Gives results that match query within modal', ({ I }) => {
  const screenshotPath = "modal_with_person_searched.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.fillField('search', 'Prein');
  I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
  I.see('Christian Prein');
  I.see('Josef Preindl');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('All relevant source links display in modal', ({ I }) => {
  const screenshotPath = "modal_with_multiple_source_links.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.fillField('search', 'Giache');
  I.waitForElement('//h6[contains(text(), "7 results")]', secondsToWait);
  I.see('cpdl.org');
  I.see('musicbrainz.org');
  I.see('imslp.org');
  I.see('isni.org');
  I.see('id.loc.gov');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Filters results with composer filter within modal', ({ I }) => {
  const screenshotPath = "modal_with_composer_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.checkOption('Composer');
  I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
  I.see('Tod B. Galloway', locatorFirstSearchResult);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Filters results with pianist filter within modal', ({ I }) => {
  const screenshotPath = "modal_with_pianist_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
  const screenshotPath = "modal_with_person_searched_and_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.checkOption('Composer');
  I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
  I.see('Tod B. Galloway', locatorFirstSearchResult);

  I.fillField('search', 'Galloway');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('Tod B. Galloway');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Removing multiple filters works as expected', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.fillField('search', 'Piotr');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
  I.checkOption('Composer');
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
  I.click('clear');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
});

Scenario('Adding multiple filters works as expected', ({ I }) => {
  const screenshotPath = "modal_with_multiple_filters_selected.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);

  I.fillField('search', 'Piotr');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
  I.checkOption('Composer');
  I.checkOption('Pianist');
  I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
  I.see('Piotr Anderszewski');
  I.see('Pyotr Ilyich Tchaikovsky');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Filters results with birthplace filter within modal', ({ I }) => {
  const screenshotPath = "modal_with_birthplace_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.checkOption('Palermo');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('1 selected');
  I.see('Alessandro Scarlatti');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});

Scenario('Narrows down birthplace filters with filter search box within modal', ({ I }) => {
  const screenshotPath = "modal_with_birthplace_filter_search_box_used.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);
  I.fillField('search-filter', 'Bologna');
  I.dontSee('Palermo');
  I.dontSee('Napoli');
  I.dontSee('Roeselare');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});
