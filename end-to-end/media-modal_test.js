const { secondsToWait, visualDiffOptions, mediaModalLocators: locators } = require('./globals');

Feature('Media modal');

let currentBrowser;

Scenario('Opens media modal with expected content', ({ I }) => {
  const screenshotPath = "media_modal_loaded.png";

  I.usePlaywrightTo('Detect current browser', async ({ browser }) => {
    const browserObject = await browser;

    currentBrowser = browserObject._initializer.name;
    console.log('Current browser is:', currentBrowser);
  });

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);

  I.see('18 results');
  I.see('Type');
  I.see('AudioObject');
  I.see('VideoObject');
  I.see('Score');
  I.see('10 catches');
  I.say('audio/wav');
  I.say('audio/aac');
  I.say('xml');
  I.say('mp4');
  I.see('Audio', locators.firstSearchResult);
  I.see('JK196103-0002', locators.firstSearchResult);
  I.see('muziekweb.nl', locators.firstSearchResult);
});

Scenario('Selects media from modal', ({ I }) => {
  const screenshotPath = "home_media_modal_selected_.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('JK196103-0002', locators.firstSearchResult);
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
  I.see('JK196103-0002');
});

Scenario('Opens media source link from modal', ({ I }) => {
  I.closeOtherTabs();
  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.click('muziekweb.nl', locators.firstSearchResult);
  I.switchToNextTab();
  I.grabCurrentUrl();
  I.seeInCurrentUrl('https://www.muziekweb.nl/Embed/JK196103-0002');
});

Scenario('Gives results that match query within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_media_searched.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search', 'Soprano');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('El Rossinyol - Soprano voice');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('All relevant source links display in modal', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.see('muziekweb.nl');
  I.see('youtube.com');
});

Scenario('Filters results with audio object filter within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_audio_object_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('AudioObject');
  I.waitForElement('//h6[contains(text(), "13 results")]', secondsToWait);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with video object filter within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_video_object_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('VideoObject');
  I.waitForElement('//h6[contains(text(), "5 results")]', secondsToWait);
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Gives results that match query and applied filter within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_media_searched_and_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('AudioObject');
  I.fillField('search', 'Rossinyol');
  I.waitForElement('//h6[contains(text(), "4 results")]', secondsToWait);
  I.see('El Rossinyol - Soprano voice');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Removing filters works as expected', ({ I }) => {
  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('VideoObject');
  I.waitForElement('//h6[contains(text(), "5 results")]', secondsToWait);
  I.click('clear');
  I.waitForElement('//h6[contains(text(), "18 results")]', secondsToWait);
});

Scenario('Adding multiple filters works as expected', ({ I }) => {
  const screenshotPath = "media_modal_with_multiple_filters_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);

  I.checkOption('AudioObject');
  I.checkOption('VideoObject');
  I.waitForElement('//h6[contains(text(), "18 results")]', secondsToWait);
  I.see('2 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with score filter gives no result within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_score_filter_no_result_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('10 catches');
  I.waitForElement('//p[contains(text(), "sorry")]', secondsToWait);
  I.see('Search tips');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Narrows down score filters with filter search box within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_score_filter_search_box_used.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.fillField('search-filter', 'liederen');
  I.dontSee('10 catches');
  I.dontSee('18 Canons');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});

Scenario('Filters results with format xml filter within modal', ({ I }) => {
  const screenshotPath = "media_modal_with_format_xml_filter_selected.png";

  I.amOnPage('/');
  I.click('Select', locators.selectMediaModal);
  I.waitForElement(locators.headerInitialResults, secondsToWait);
  I.checkOption('xml');
  I.waitForElement('//h6[contains(text(), "1 result")]', secondsToWait);
  I.see('ballroom');
  I.see('1 selected');
  I.saveScreenshot(screenshotPath);
  I.seeVisualDiff(screenshotPath, visualDiffOptions);
});
