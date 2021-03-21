const { secondsToWait, visualDiffOptions, compositionModalLocators: locators, byRole, getUrlHostName } = require('./config/globals');

Feature('Composition modal');

let currentBrowser;

Scenario('Opens composition modal with expected content', async ({ I }) => {
  const screenshotPath = "composition_modal_loaded.png";

  I.usePlaywrightTo('Detect current browser', async ({ browser }) => {
    const browserObject = await browser;

    currentBrowser = browserObject._initializer.name;
    console.log('Current browser is:', currentBrowser);
  });

  const response                                     = await I.sendQuery(searchQuery);
  const { title, name, __typename, creator, source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
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
  const screenshotPath = "composition_modal_language_switcher_loaded.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.see('English');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Language switcher can select Dutch language', ({ I }) => {
  const screenshotPath = "composition_modal_language_switcher_dutch_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.click('English', { xpath: '//header//li[1]' });
  I.click('Dutch', { xpath: '//ul//li[2]' });
  I.wait(2);
  I.see('Nederlands');

  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Selects composition from modal', async ({ I }) => {
  const screenshotPath = "composition_modal_selected_.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(locate({ css: '[role=listitem]' }).withText(title));
  I.wait(1);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see(name);
});

Scenario('Opens composition source link from modal', async ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click(getUrlHostName(source));
  I.wait(2);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl(source);
});

Scenario('Gives results that match query within modal', async ({ I }) => {
  const screenshotPath = "composition_modal_with_composition_searched.png";

  const response        = await I.sendQuery(searchQuery);
  const { title, name } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', name);
  I.wait(1);
  I.see(title);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', async ({ I }) => {
  const response   = await I.sendQuery(searchQuery);
  const { source } = response.data.data.results[0];

  I.amOnPage('/');
  I.click('Select', locators.selectCompositionModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see(getUrlHostName(source));
});

const searchQuery = `
    query($filter: _MusicCompositionFilter) {
      results: MusicComposition(filter: $filter, first: 50) {
        __typename
        ... on MusicComposition {
          identifier
          name
          title
          creator
          source
        }
      }
    }
  `;
