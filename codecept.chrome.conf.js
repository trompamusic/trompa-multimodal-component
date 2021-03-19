const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

const os      = process.env.OS || 'macos';
const browser = process.env.BROWSER || 'chrome';

exports.config = {
  tests  : './automatic-tests/*_test.js',
  output : `./automatic-tests/output/${os}-${browser}`,
  helpers: {
    Playwright: {
      url    : 'http://localhost:5050',
      show   : false,
      browser: 'chromium',
    },
    ResembleHelper: {
      require         : "codeceptjs-resemblehelper",
      baseFolder      : `./automatic-tests/output/${os}-${browser}/screenshots/base`,
      diffFolder      : `./automatic-tests/output/${os}-${browser}/screenshots/diff`,
      prepareBaseImage: true,
      plugins         : {
        allure: {},
      },
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
      outputDir                 : `./automatic-tests/output/${os}-${browser}/allure-results`,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
