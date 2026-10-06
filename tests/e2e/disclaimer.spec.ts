import { expect, test } from '@playwright/test';

test('first visit shows the bilingual entry disclaimer until agreement', async ({
  page
}, testInfo) => {
  await page.goto('/');

  const dialog = page.getByRole('dialog');
  const english = dialog.locator('[lang="en"]');
  const hindi = dialog.locator('[lang="hi"].entry-disclaimer-hindi');
  const agree = dialog.getByRole('button', { name: /I Agree.*मैं सहमत हूँ/ });

  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.evaluate((element) => element.scrollTop)).toBe(0);
  await expect(english.getByRole('heading', { name: 'Disclaimer' })).toBeVisible();
  await expect(hindi.getByRole('heading', { name: 'अस्वीकरण (डिस्क्लेमर)' })).toBeVisible();
  await expect(english.locator('li')).toHaveCount(4);
  await expect(hindi.locator('li')).toHaveCount(4);
  await expect(dialog).toContainText('no advocate client relationship is created');
  await expect(dialog).toContainText('कोई अधिवक्ता–मुवक्किल संबंध स्थापित नहीं होता');

  const englishBox = await english.boundingBox();
  const hindiBox = await hindi.boundingBox();
  expect(englishBox).not.toBeNull();
  expect(hindiBox).not.toBeNull();
  if (testInfo.project.name === 'mobile') {
    expect(hindiBox!.y).toBeGreaterThan(englishBox!.y);
  } else {
    expect(hindiBox!.x).toBeGreaterThan(englishBox!.x);
  }

  await page.screenshot({ path: testInfo.outputPath('entry-disclaimer.png') });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeVisible();

  await agree.click();
  await expect(dialog).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('anvitha-entry-disclaimer-v1'))).toBe(
    'agreed'
  );

  await page.goto('/hi');
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('अगले कदम से पहले');
});

test('website remains available when JavaScript is disabled', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one no-script check is sufficient');
  const page = await browser.newPage({
    javaScriptEnabled: false,
    baseURL: 'http://localhost:4321'
  });
  try {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Find clarity');
  } finally {
    await page.close();
  }
});

test('permanent disclaimer pages use the same supplied text', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one copy audit is sufficient');
  await page.addInitScript(() => localStorage.setItem('anvitha-entry-disclaimer-v1', 'agreed'));

  await page.goto('/disclaimer');
  await expect(page.locator('main')).toContainText(
    'The Bar Council of India does not permit advocates to solicit work or advertise.'
  );
  await expect(page.locator('.legal-grid section')).toHaveCount(4);
  await expect(page.locator('main')).toContainText(
    'no advocate client relationship is created by accessing this website'
  );

  await page.goto('/hi/disclaimer');
  await expect(page.locator('main')).toContainText(
    'भारतीय विधिज्ञ परिषद (बार काउंसिल ऑफ इंडिया) अधिवक्ताओं को विज्ञापन अथवा कार्य याचना की अनुमति नहीं देती।'
  );
  await expect(page.locator('.legal-grid section')).toHaveCount(4);
  await expect(page.locator('main')).toContainText('कोई अधिवक्ता–मुवक्किल संबंध स्थापित नहीं होता');
});
