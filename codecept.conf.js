const { setHeadlessWhen, setWindowSize } = require('@codeceptjs/configure');

// turn on headless mode with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// set window size for any helper: Puppeteer, WebDriver, TestCafe
setWindowSize(1024, 768);

exports.config = {
  tests  : './*_test.js',
  output : './output',
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : true,
      browser: 'chromium',
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
