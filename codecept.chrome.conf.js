const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests  : './automatic-tests/*_test.js',
  output : './automatic-tests/output/chrome',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : true,
      browser: 'chromium',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      baseFolder      : "./automatic-tests/output/chrome/screenshots/base",
      diffFolder      : "./automatic-tests/output/chrome/screenshots/diff",
      prepareBaseImage: true,
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
      outputDir                 : "./automatic-tests/output/chrome/allure-results",
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
