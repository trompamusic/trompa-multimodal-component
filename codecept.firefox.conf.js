const { setHeadlessWhen } = require('@codeceptjs/configure');

/*
Turn on headless mode with HEADLESS=true environment variable.
export HEADLESS=true && npx codeceptjs run
*/
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
      screenshotFolder: "./automatic-tests/output/firefox/screenshots",
      baseFolder      : "./automatic-tests/output/firefox/screenshots/base",
      diffFolder      : "./automatic-tests/output/firefox/screenshots/diff",
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
      enabled  : true,
      outputDir: "./automatic-tests/output/firefox/allure-results",
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
