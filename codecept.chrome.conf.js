const { setHeadlessWhen } = require('@codeceptjs/configure');

/*
Turn on headless mode with HEADLESS=true environment variable.
export HEADLESS=true && npx codeceptjs run
*/
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests  : './end-to-end/*_test.js',
  output : './end-to-end/screenshots/output/chrome',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : false,
      browser: 'chromium',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      screenshotFolder: "./end-to-end/screenshots/output/chrome",
      baseFolder      : "./end-to-end/screenshots/base/chrome",
      diffFolder      : "./end-to-end/screenshots/diff/chrome",
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha    : {},
  name     : 'trompa-multimodal-component-auto-test',
  plugins  : {
    pauseOnFail    : {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
