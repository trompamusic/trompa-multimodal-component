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
  I.wait(2);
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
  I.wait(2);
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
  I.wait(1);
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
  I.wait(1);
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
  I.wait(1);
  I.see(first.title);

  I.fillField('search', second.name);
  I.wait(1);
  I.see(second.title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

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