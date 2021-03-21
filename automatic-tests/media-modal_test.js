const { secondsToWait, visualDiffOptions, mediaModalLocators: locators, getUrlHostName } = require('./config/globals');

Feature('Media modal');

let currentBrowser;

Scenario('Opens media modal with expected content', async ({ I }) => {
  const screenshotPath = "media_modal_loaded.png";

  I.usePlaywrightTo('Detect current browser', async ({ browser }) => {
    const browserObject = await browser;

    currentBrowser = browserObject._initializer.name;
    console.log('Current browser is:', currentBrowser);
  });

  const response  = await I.sendQuery(searchQuery);
  const { title } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('AudioObject');
  I.see('VideoObject');
  I.see(title);
  I.say('audio/wav');
  I.say('audio/aac');
  I.say('xml');
  I.say('mp4');
  I.see('Audio', locators.firstSearchResult);
  I.see('muziekweb.nl', locators.firstSearchResult);
});

Scenario('Language switcher initially loads English', ({ I }) => {
  const screenshotPath = "media_modal_language_switcher_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.wait(2);
  I.see('English');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Language switcher can select Dutch language', ({ I }) => {
  const screenshotPath = "media_modal_language_switcher_dutch_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.click('English', { xpath: '//header//li[1]' });
  I.click('Dutch', { xpath: '//ul//li[2]' });
  I.wait(2);
  I.see('Nederlands');

  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Selects media from modal', async ({ I }) => {
  const screenshotPath = "home_media_modal_selected_.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(locate({ css: '[role=listitem]' }).withText(title));
  I.wait(1);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see(name);
});

Scenario('Opens media source link from modal',async  ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(getUrlHostName(source));
  I.wait(2);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl(source);
});

Scenario('Gives results that match query within modal', async ({ I }) => {
  const screenshotPath = "media_modal_with_media_searched.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', title);
  I.wait(2);
  I.see(title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', async ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see(getUrlHostName(source));
});

const searchQuery = `
query($filter: _AudioObjectFilter) {
  results: AudioObject(filter: $filter, first: 50) {
    __typename
    ... on AudioObject {
      identifier
      name
      title
      creator
      source
    }
  }
}
`;