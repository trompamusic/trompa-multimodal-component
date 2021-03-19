const { secondsToWait, visualDiffOptions, personModalLocators: locators, byRole, getUrlHostName } = require('./config/globals');

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

Scenario('Opens person modal with expected content', async ({ I }) => {
  const screenshotPath = "person_modal_loaded.png";

  const response                            = await I.sendQuery(searchQuery);
  const { title, name, __typename, source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  within(byRole('listitem'), () => {
    I.see(title);
    I.see(name);
    I.see(__typename);
    I.see(getUrlHostName(source));
    I.seeElementInDOM(locate('a')
      .withAttr({ href: source }));
  });
});

Scenario('Selects person from modal', async ({ I }) => {
  const screenshotPath = "home_person_modal_selected_.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(locate({ css: '[role=listitem]' }).withText(title));
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see(name);
});

Scenario('Opens person source link from modal',async  ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(getUrlHostName(source));
  I.wait(2);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl(source);
});

Scenario('Gives results that match query within modal', async ({ I }) => {
  const screenshotPath = "person_modal_with_person_searched.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', name);
  I.see(title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', async ({ I }) => {
  const screenshotPath = "person_modal_with_multiple_source_links.png";

  const response        = await I.sendQuery(searchQuery);
  const [first, second] = response.data.data.results;

  I.amOnPage('/');
  I.click('Select', locators.selectPersonModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', first.name);
  I.see(first.title);

  I.fillField('search', second.name);
  I.see(second.title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

// Scenario('Filters results with composer filter within modal', ({ I }) => {
//   const screenshotPath = "person_modal_with_composer_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Composer');
//   I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
//   I.see('Tod B. Galloway', locators.firstSearchResult);
//   I.see('1 selected');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Filters results with pianist filter within modal', ({ I }) => {
//   const screenshotPath = "person_modal_with_pianist_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Pianist');
//   I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
//   I.see('1 selected');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
//   const screenshotPath = "person_modal_with_person_searched_and_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Composer');
//   I.waitForElement('//p[contains(text(), "Franz")]', secondsToWait);
//   I.see('Tod B. Galloway', locators.firstSearchResult);

//   I.fillField('search', 'Galloway');
//   I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
//   I.see('Tod B. Galloway');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Removing multiple filters works as expected', ({ I }) => {
//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.fillField('search', 'Piotr');
//   I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
//   I.checkOption('Composer');
//   I.checkOption('Pianist');
//   I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
//   I.click('clear');
//   I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
// });

// Scenario('Adding multiple filters works as expected', ({ I }) => {
//   const screenshotPath = "person_modal_with_multiple_filters_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);

//   I.fillField('search', 'Piotr');
//   I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
//   I.checkOption('Composer');
//   I.checkOption('Pianist');
//   I.waitForElement('//h6[contains(text(), "2 results")]', secondsToWait);
//   I.see('Piotr Anderszewski');
//   I.see('Pyotr Ilyich Tchaikovsky');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Filters results with birthplace filter within modal', ({ I }) => {
//   const screenshotPath = "person_modal_with_birthplace_filter_selected.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.checkOption('Brugge');
//   I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
//   I.see('1 selected');
//   I.see('Arnold von Bruck');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

// Scenario('Narrows down birthplace filters with filter search box within modal', ({ I }) => {
//   const screenshotPath = "person_modal_with_birthplace_filter_search_box_used.png";

//   I.amOnPage('/');
//   I.click('Select', locators.selectPersonModal);
//   I.waitForElement(locators.headerInitialResults, secondsToWait);
//   I.fillField('search-filter', 'Brugge');
//   I.dontSee('Linz');
//   I.saveScreenshot(screenshotPath);
//   I.seeVisualDiff(screenshotPath, visualDiffOptions);
// });

const searchQuery = `
query($filter: _PersonFilter) {
  results: Person(filter: $filter, first: 50) {
    __typename
    ... on Person {
      identifier
      name
      title
      subject
      creator
      source
      jobTitle
    }
  }
}
`;