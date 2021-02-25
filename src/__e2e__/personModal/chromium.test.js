import { chromium } from 'playwright';

describe("Person Modal (Chromium)", () => {
  let browser, page, context, response;
  const localhostUrl    = 'http://localhost:5050';
  const screenshotsPath = 'src/__e2e__/personModal/screenshots/chromium';

  beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page    = await context.newPage();

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
    await page.screenshot({ path: `${screenshotsPath}/0-home-initial-state.png` });

    expect(response.status()).toBe(200);
  });

  it("opens the person modal and verifies that 50 results exist", async () => {
    await page.click('data-test-id=select-person-modal');
    await page.waitForSelector('text=/50 results/i');
    await page.screenshot({ path: `${screenshotsPath}/1-person-modal-initial-state.png` });

    expect(await page.textContent('text=/50 results/i')).toBeTruthy();
  });

  it("verifies that filter role and categories composer and pianist exist.", async () => {
    expect(await page.textContent('text=/role/i')).toBeTruthy();
    expect(await page.textContent('text=/composer/i')).toBeTruthy();
    expect(await page.textContent('text=/pianist/i')).toBeTruthy();
  });

  it("verifies that filter birthplace and categories bologna and palermo exist.", async () => {
    expect(await page.textContent('text=/birthplace/i')).toBeTruthy();
    expect(await page.textContent('text=/bologna/i')).toBeTruthy();
    expect(await page.textContent('text=/palermo/i')).toBeTruthy();
  });

  it("verifies first search result to be complete and to be Charles Steggall.", async () => {
    const firstSearchResult = await page.innerText('data-test-id=first-search-result');

    expect(firstSearchResult).toMatch(/person/i);
    expect(firstSearchResult).toMatch(/unknown role/i);
    expect(firstSearchResult).toMatch(/charles Steggall/i);
    expect(firstSearchResult).toMatch(/cpdl.org/i);
  });

  it("selects Charles Steggall and verifies that selection succeeds and modal closes", async () => {
    await page.click('text=/charles steggall/i');
    await page.waitForSelector('text=/charles steggall/i');
    await page.screenshot({ path: `${screenshotsPath}/2-home-selected-charles-steggall.png` });

    expect(await page.textContent('text=/select/i')).toBeTruthy();
    expect(await page.textContent('text=/charles steggall/i')).toBeTruthy();
  });

  it("reloads person modal and verifies that the cpdl.org source link works", async () => {
    await page.click('data-test-id=select-person-modal');
    await page.waitForSelector('text=/50 results/i');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=/cpdl/i'),
    ]);

    expect(await newPage.url()).toMatch('https://cpdl.org/wiki/index.php/Charles_Steggall');
  });
});
