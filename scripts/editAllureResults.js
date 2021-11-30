const fs     = require('fs');
const path   = require('path');
const xml2js = require('xml2js');

function run() {
  const os        = process.env.OS;
  const browser   = process.env.BROWSER;
  const resultDir = path.join(process.cwd(), 'automatic-tests/output', os + '-' + browser, 'allure-results');

  const files    = fs.readdirSync(resultDir);
  const xmlFiles = files.filter(file => file.endsWith('.xml'));

  const prefix = '(' + os + ' ' + browser + ')';

  for(let i = 0; i < xmlFiles.length; i++) {
    const xmlContents = fs.readFileSync(path.join(resultDir, xmlFiles[i]), { encoding: 'utf-8' });

    xml2js.parseString(xmlContents, function(err, result) {
      result['ns2:test-suite']['test-cases'] = result['ns2:test-suite']['test-cases'].map(function(testCases) {
        testCases['test-case'] = testCases['test-case'].map(testCase => {
          if (!testCase.name[0].startsWith(prefix)) {
            testCase.name[0]  = prefix + ' | ' + testCase.name[0];
            testCase.title[0] = prefix + ' | ' + testCase.title[0];
          }

          return testCase;
        });

        return testCases;
      });

      var builder = new xml2js.Builder();
      var xml     = builder.buildObject(result);

      fs.writeFileSync(path.join(resultDir, xmlFiles[i]), xml, { encoding: 'utf-8' });
      // console.log(result);
    });
  }
}

run();
