import { expect, test } from '@playwright/test';
import expertiseOutline from '../../src/content/expertise.json' with { type: 'json' };
import { practiceGroups, type PracticeGroup } from '../../src/lib/navigation';

test('home is readable and stays within the viewport', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Find clarity');
  await expect(page.locator('.hero-actions .phosphor-icon svg').first()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('home-viewport.png') });
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
});

test('Hindi home stays within the viewport', async ({ page }, testInfo) => {
  await page.goto('/hi');
  await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('अगला कदम');
  await expect(page.getByRole('heading', { name: 'हमारी विशेषज्ञता' })).toBeVisible();
  await expect(page.locator('.expertise-card').first()).toHaveAttribute(
    'href',
    '#expertise-matrimonial-family-disputes'
  );
  await page.locator('.expertise-card').first().click();
  await expect(page.locator('#expertise-matrimonial-family-disputes')).toBeVisible();
  await expect(
    page
      .locator('#expertise-matrimonial-family-disputes')
      .getByText('विस्तृत विषय अभी अंग्रेज़ी में उपलब्ध हैं।')
  ).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('hindi-home-viewport.png') });
});

test('expertise cards precede support and reveal the supplied topic lists', async ({
  page
}, testInfo) => {
  await page.goto('/');
  const section = page.locator('.expertise-section');
  const cards = section.locator('.expertise-card');
  await expect(section.getByRole('heading', { name: 'Our expertise' })).toBeVisible();
  await expect(cards).toHaveCount(7);
  await expect(cards.locator('img')).toHaveCount(7);
  const sectionOrder = await page
    .locator('main > section')
    .evaluateAll((sections) => sections.map((element) => element.classList[0]));
  expect(sectionOrder.indexOf('expertise-section')).toBeLessThan(
    sectionOrder.indexOf('support-section')
  );
  for (const card of await cards.all()) {
    const photo = card.locator('img');
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() => photo.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBeGreaterThan(0);
  }
  await section.screenshot({ path: testInfo.outputPath('expertise-section.png') });
  for (const [index, item] of expertiseOutline.entries()) {
    await cards.nth(index).click();
    const panel = page.locator(`#expertise-${item.slug}`);
    await expect(panel).toBeVisible();
    await expect(panel.locator('.expertise-topic-list li')).toHaveCount(item.topics.length);
    await expect(panel.getByRole('heading', { name: item.title })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(
      false
    );
  }
  const lastPanel = page.locator('#expertise-legal-documentation');
  await lastPanel.screenshot({ path: testInfo.outputPath('expertise-open-panel.png') });
  await lastPanel.getByRole('link', { name: 'Next' }).click();
  await expect(page.locator('#expertise-matrimonial-family-disputes')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Divorce Lawyer' }).last()).toBeVisible();
  await page.getByRole('link', { name: 'Close topics' }).click();
  await expect(page.locator('.expertise-panel:visible')).toHaveCount(0);
});

test('language switch keeps the page context', async ({ page }) => {
  await page.goto('/our-work');
  await page.getByRole('link', { name: 'हिंदी में पढ़ें' }).click();
  await expect(page).toHaveURL(/\/hi\/our-work\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('पहला कदम');
});

test('about page presents the supplied purpose, values, and Trust registration facts', async ({
  page
}, testInfo) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'Who we are' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our mission' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our vision' })).toBeVisible();
  await expect(page.locator('.values-grid > div')).toHaveCount(5);
  await expect(page.getByText('Charkhi Dadri, Haryana', { exact: true })).toBeVisible();
  await expect(page.locator('time[datetime="2024-02-22"]')).toHaveText('22.02.2024');
  await expect(page.getByText('X0U2024B34')).toHaveCount(0);
  await expect(page.getByText('113172533')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(
    false
  );
  await page.screenshot({ path: testInfo.outputPath('about.png'), fullPage: true });

  await page.goto('/hi/about');
  await expect(page.getByRole('heading', { name: 'हम कौन हैं' })).toBeVisible();
  await expect(page.locator('.values-grid > div')).toHaveCount(5);
  await expect(page.locator('time[datetime="2024-02-22"]')).toHaveText('22.02.2024');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(
    false
  );
});

test('help page shows verified official routes and preparation guidance', async ({ page }) => {
  await page.goto('/get-help');
  await expect(page.getByRole('link', { name: /112/ })).toHaveAttribute('href', 'tel:112');
  await expect(page.getByRole('link', { name: /15100/ })).toHaveAttribute('href', 'tel:15100');
  await expect(page.getByRole('heading', { name: 'Before you seek help' })).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});

test('preview blocks indexing until the domain is verified', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  const response = await page.request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('Disallow: /');
});

test('work and help pages fit the viewport', async ({ page }, testInfo) => {
  for (const route of ['our-work', 'get-help']) {
    await page.goto(`/${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1
    );
    expect(overflow).toBe(false);
    await page.screenshot({ path: testInfo.outputPath(`${route}.png`), fullPage: true });
  }
});

test('desktop dropdowns show every requested option', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop dropdown check');
  await page.goto('/');
  const expertise = page.locator('.nav-dropdown-expertise');
  await expertise.locator('summary').click();
  await expect(expertise.locator('.nav-dropdown-panel a')).toHaveCount(10);
  await expect(expertise.getByRole('link', { name: 'Bail Matters Lawyer' })).toHaveAttribute(
    'href',
    '/expertise/bail-matters-lawyer'
  );
  await page.screenshot({ path: testInfo.outputPath('desktop-expertise.png') });
  await page.keyboard.press('Escape');
  await expect(expertise).not.toHaveAttribute('open', '');

  const services = page.locator('.nav-dropdown-services');
  await services.locator('summary').click();
  await expect(services.locator('.nav-dropdown-panel a')).toHaveCount(10);
  await page.screenshot({ path: testInfo.outputPath('desktop-services.png') });
  await services.getByRole('link', { name: 'Court Marriage Registration' }).click();
  await expect(page).toHaveURL(/\/services\/court-marriage-registration\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Court Marriage Registration');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
});

test('mobile dropdown reaches an expertise page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile navigation check');
  await page.goto('/');
  await page.locator('.mobile-menu > summary').click();
  const expertise = page.locator('.mobile-dropdown').first();
  await expertise.locator('summary').click();
  await expect(expertise.locator('.mobile-dropdown-panel a')).toHaveCount(10);
  await page.screenshot({ path: testInfo.outputPath('mobile-expertise.png') });
  await expertise.getByRole('link', { name: 'Divorce Lawyer' }).click();
  await expect(page).toHaveURL(/\/expertise\/divorce-lawyer\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Divorce Lawyer');
});

test('header fits a mid-sized desktop viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop breakpoint check');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(
    false
  );
  await page.locator('.nav-dropdown-services summary').click();
  await expect(page.locator('.nav-dropdown-services .nav-dropdown-panel')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('desktop-1024-services.png') });
});

test('all expertise and service pages are available in both languages', async ({
  request
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one route audit is sufficient');
  for (const group of ['expertise', 'services'] as PracticeGroup[]) {
    for (const item of practiceGroups[group]) {
      for (const prefix of ['', '/hi']) {
        const response = await request.get(`${prefix}/${group}/${item.slug}`);
        expect(response.ok(), `${prefix}/${group}/${item.slug}`).toBe(true);
        const html = await response.text();
        expect(html).toContain(`<h1 lang="en">${item.title}</h1>`);
        expect(html).toContain('noindex,nofollow');
      }
    }
  }
});

test('contact and appointment links state their preview status', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact us');
  await page.goto('/book-appointment');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Book an appointment');
  await expect(page.getByText('Appointment booking is not available')).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});
