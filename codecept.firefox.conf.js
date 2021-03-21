const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests  : './automatic-tests/*_test.js',
  output : './automatic-tests/output/firefox',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : false,
      browser: 'firefox',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      baseFolder      : "./automatic-tests/output/firefox/screenshots/base",
      diffFolder      : "./automatic-tests/output/firefox/screenshots/diff",
      prepareBaseImage: false,
      waitForAction   : 2000,
      plugins         : {
        allure: {},
      },
    },
    GraphQL: {
      endpoint: 'https://api-test.trompamusic.eu',
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha    : {},
  name     : 'trompa-multimodal-component-auto-test',
  plugins  : {
    allure: {
      enabled                   : true,
      enableScreenshotDiffPlugin: true,
      outputDir                 : "./automatic-tests/output/firefox/allure-results",
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
