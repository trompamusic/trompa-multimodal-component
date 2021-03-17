const { setHeadlessWhen } = require('@codeceptjs/configure');

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
      baseFolder      : "./automatic-tests/output/safari/screenshots/base",
      diffFolder      : "./automatic-tests/output/safari/screenshots/diff",
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
      outputDir                 : "./automatic-tests/output/safari/allure-results",
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
