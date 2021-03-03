const { setHeadlessWhen, setWindowSize } = require('@codeceptjs/configure');

// turn on headless mode with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// set window size for any helper: Puppeteer, WebDriver, TestCafe
setWindowSize(1024, 768);

exports.config = {
  tests  : './end-to-end/*_test.js',
  output : './end-to-end/screenshots/output',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : false,
      browser: 'chromium',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      screenshotFolder: "./end-to-end/screenshots/output/",
      baseFolder      : "./end-to-end/screenshots/base/",
      diffFolder      : "./end-to-end/screenshots/diff/",
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
