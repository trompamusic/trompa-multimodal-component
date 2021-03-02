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

Scenario('Gives results that match the person query within modal', ({ I }) => {
  const screenshotPath = "modal_with_person_searched.png";

  I.amOnPage('/');
  I.click('Select', locatorSelectPersonModal);
  I.waitForElement(locatorHeaderFiftyResults, secondsToWait);

  I.fillField('search', 'Charles Steggall');
  I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
  I.waitForElement('//p[contains(text(), "Charles Steggal")]', secondsToWait);

  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, differenceOptions);
});
