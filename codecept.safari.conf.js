const { setHeadlessWhen } = require('@codeceptjs/configure');

/*
Turn on headless mode with HEADLESS=true environment variable.
export HEADLESS=true && npx codeceptjs run
*/
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests  : './automatic-tests/*_test.js',
  output : './automatic-tests/output/safari',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : false,
      browser: 'webkit',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      screenshotFolder: "./automatic-tests/output/safari/screenshots",
      baseFolder      : "./automatic-tests/output/safari/screenshots/base",
      diffFolder      : "./automatic-tests/output/safari/screenshots/diff",
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
      outputDir: "./automatic-tests/output/safari/allure-results",
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
