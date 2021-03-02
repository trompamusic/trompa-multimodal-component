Feature('multimodal-component');

Scenario('Loads the home page', ({ I }) => {
  I.amOnPage('/');
  I.saveScreenshot("home_loaded.png");
});
