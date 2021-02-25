import { webkit as safari } from 'playwright';

describe("Person Modal (Safari)", () => {
  let browser, page, response;
  const localhostUrl    = 'http://localhost:5050/';
  const screenshotsPath = 'src/__e2e__/personModal/screenshots/safari';

  beforeAll(async () => {
    browser = await safari.launch();
    page    = await browser.newPage();

    await page.setViewportSize({
      width : 1024,
      height: 768,
    });

    response = await page.goto(localhostUrl);
  });

  afterAll(async () => {
    await browser.close();
  });

  it("loads the home page", async () => {
    await page.screenshot({ path: `${screenshotsPath}/home.png` });

    expect(response.status()).toBe(200);
  });
});
