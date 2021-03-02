Feature('multimodal-component');

Scenario('Loads the home page', ({ I }) => {
  I.amOnPage('/');
  I.saveScreenshot("home_loaded.png");
  I.seeVisualDiff("home_loaded.png", { tolerance: 1, prepareBaseImage: true });
});
