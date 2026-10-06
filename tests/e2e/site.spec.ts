import { expect, test } from '@playwright/test';
import expertiseOutline from '../../src/content/expertise.json' with { type: 'json' };
import hindiOutline from '../../src/content/expertise.hi.json' with { type: 'json' };
import { practiceGroups, type PracticeGroup } from '../../src/lib/navigation';

test('home is readable and stays within the viewport', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Find clarity');
  await expect(page.locator('.hero-actions .phosphor-icon svg').first()).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('home-viewport.png') });
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
});

test('Hindi button translates the full homepage', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'हिंदी में पढ़ें' }).click();
  await expect(page).toHaveURL(/\/hi\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('अगले कदम से पहले');
  await expect(page.getByRole('heading', { name: 'हमारी विशेषज्ञता' })).toBeVisible();
  await expect(page.locator('.expertise-card h3').first()).toHaveText('आपराधिक कानून');
  await expect(page.locator('.support-card h3').first()).toHaveText('आपराधिक कानून');
  await expect(page.locator('.faq-teaser summary').first()).toContainText('आपराधिक कानून');
  await expect(page.locator('.appointment-section h2')).toHaveText('अपॉइंटमेंट बुक करें');

  await page.locator('.expertise-card').first().click();
  const panel = page.locator('#expertise-criminal-law');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('heading', { name: 'आपराधिक कानून' })).toBeVisible();
  await expect(panel.locator('.expertise-topic-list li').first()).toContainText(
    hindiOutline[0].items[0]
  );
  await expect(panel.getByText('विस्तृत विषय अभी अंग्रेज़ी में उपलब्ध हैं।')).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('hindi-home-viewport.png') });
});
test('eight expertise cards reveal all firm-owner bullet lists', async ({ page }, testInfo) => {
  await page.goto('/');
  const section = page.locator('.expertise-section');
  const cards = section.locator('.expertise-card');
  await expect(section.getByRole('heading', { name: 'Our expertise' })).toBeVisible();
  await expect(cards).toHaveCount(8);
  await expect(cards.locator('img')).toHaveCount(8);
  expect(expertiseOutline.reduce((total, item) => total + item.items.length, 0)).toBe(39);
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
    await expect(panel.locator('.expertise-topic-list li')).toHaveCount(item.items.length);
    await expect(panel.getByRole('heading', { name: item.title })).toBeVisible();
    await expect(panel.locator('.expertise-topic-list li')).toHaveText(item.items);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      )
    ).toBe(false);
  }
  const lastPanel = page.locator('#expertise-marriage-matrimonial-services');
  await lastPanel.screenshot({ path: testInfo.outputPath('expertise-open-panel.png') });
  await lastPanel.getByRole('link', { name: 'Next' }).click();
  await expect(page.locator('#expertise-criminal-law')).toBeVisible();
  await page.getByRole('link', { name: 'Close topics' }).click();
  await expect(page.locator('.expertise-panel:visible')).toHaveCount(0);
});

test('language switch keeps page context', async ({ page }) => {
  await page.goto('/our-work');
  await page.getByRole('link', { name: 'हिंदी में पढ़ें' }).click();
  await expect(page).toHaveURL(/\/hi\/our-work\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('कार्य');
});

test('about page uses current areas and legal aid bullets only', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'Who we are' })).toBeVisible();
  await expect(page.locator('.values-grid > div')).toHaveCount(5);
  await expect(page.locator('.registration-details dd')).toHaveCount(3);
  await expect(
    page.getByText('Free or concessional legal guidance for eligible persons')
  ).toBeVisible();
  await expect(page.getByText('22.02.2024')).toHaveCount(0);
  await expect(page.getByText('Consumer Disputes')).toHaveCount(0);
  await page.goto('/hi/about');
  await expect(page.getByRole('heading', { name: 'हम कौन हैं' })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
});

test('legal aid page lists only the supplied aid and documentation services', async ({ page }) => {
  await page.goto('/get-help');
  await expect(page.locator('.urgent-panel .practice-list li')).toHaveCount(3);
  await expect(page.locator('.preparation-panel .prepare-list li')).toHaveCount(4);
  await expect(
    page.getByText('Direct public contact details have not been provided yet.')
  ).toBeVisible();
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});

test('preview blocks indexing until domain and copy are verified', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  const response = await page.request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('Disallow: /');
});

test('areas, work and legal aid pages fit the viewport', async ({ page }, testInfo) => {
  for (const route of ['how-we-help', 'our-work', 'get-help']) {
    await page.goto(`/${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      )
    ).toBe(false);
    await page.screenshot({ path: testInfo.outputPath(`${route}.png`), fullPage: true });
  }
});

test('desktop dropdowns contain only current areas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop dropdown check');
  await page.goto('/');
  const expertise = page.locator('.nav-dropdown-expertise');
  await expertise.locator('summary').click();
  await expect(expertise.locator('.nav-dropdown-panel a')).toHaveCount(5);
  await expect(expertise.getByRole('link', { name: 'Criminal Law' })).toHaveAttribute(
    'href',
    '/expertise/criminal-law'
  );
  await page.screenshot({ path: testInfo.outputPath('desktop-expertise.png') });
  await page.keyboard.press('Escape');
  await expect(expertise).not.toHaveAttribute('open', '');

  const services = page.locator('.nav-dropdown-services');
  await services.locator('summary').click();
  await expect(services.locator('.nav-dropdown-panel a')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('desktop-services.png') });
  await services.getByRole('link', { name: 'Marriage & Matrimonial Services' }).click();
  await expect(page).toHaveURL(/\/services\/marriage-matrimonial-services\/?$/);
  await expect(page.locator('.practice-list li')).toHaveCount(9);
});

test('mobile dropdown reaches the new criminal law page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile navigation check');
  await page.goto('/');
  await page.locator('.mobile-menu > summary').click();
  const expertise = page.locator('.mobile-dropdown').first();
  await expertise.locator('summary').click();
  await expect(expertise.locator('.mobile-dropdown-panel a')).toHaveCount(5);
  await page.screenshot({ path: testInfo.outputPath('mobile-expertise.png') });
  await expertise.getByRole('link', { name: 'Criminal Law' }).click();
  await expect(page).toHaveURL(/\/expertise\/criminal-law\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Criminal Law');
  await expect(page.locator('.practice-list li')).toHaveCount(5);
});

test('header fits a mid-sized desktop viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop breakpoint check');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.locator('.nav-dropdown-services summary').click();
  await expect(page.locator('.nav-dropdown-services .nav-dropdown-panel')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('desktop-1024-services.png') });
});

test('all practice translations preserve the owner-supplied scope', async ({
  request
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one route audit is sufficient');
  expect(hindiOutline).toHaveLength(expertiseOutline.length);

  for (const group of ['expertise', 'services'] as PracticeGroup[]) {
    for (const item of practiceGroups[group]) {
      const translated = hindiOutline.find((area) => area.slug === item.slug);
      expect(translated, item.slug).toBeDefined();
      expect(translated!.group).toBe(item.group);
      expect(translated!.title).not.toBe(item.title);
      expect(translated!.items).toHaveLength(item.items.length);

      const englishResponse = await request.get(`/${group}/${item.slug}`);
      expect(englishResponse.ok()).toBe(true);
      const englishHtml = await englishResponse.text();
      expect(englishHtml).toContain(`<h1>${item.title.replaceAll('&', '&amp;')}</h1>`);
      expect(englishHtml).toContain(item.items[0]);

      const hindiResponse = await request.get(`/hi/${group}/${item.slug}`);
      expect(hindiResponse.ok()).toBe(true);
      const hindiHtml = await hindiResponse.text();
      expect(hindiHtml).toContain('<html id="page-scroll-root" lang="hi">');
      expect(hindiHtml).toContain(`<h1>${translated!.title}</h1>`);
      for (const [index, bullet] of translated!.items.entries()) {
        expect(bullet).not.toBe(item.items[index]);
        expect(hindiHtml).toContain(bullet);
      }
      expect(hindiHtml).not.toContain('विस्तृत विषय अभी अंग्रेज़ी में उपलब्ध हैं।');
      expect(hindiHtml).toContain('noindex,nofollow');
    }
  }

  for (const oldPath of ['/expertise/supreme-court-lawyer', '/services/consumer-disputes-lawyer']) {
    expect((await request.get(oldPath)).status()).toBe(404);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/expertise/criminal-law');
  expect(sitemap).toContain('/services/marriage-matrimonial-services');
  expect(sitemap).not.toContain('/expertise/supreme-court-lawyer');
});

test('Hindi navigation opens translated detail pages and switches back to English', async ({
  page
}, testInfo) => {
  await page.goto('/hi');
  if (testInfo.project.name === 'mobile') {
    await page.locator('.mobile-menu > summary').click();
    await page.locator('.mobile-dropdown').first().locator('summary').click();
    await page
      .locator('.mobile-dropdown')
      .first()
      .getByRole('link', { name: 'आपराधिक कानून' })
      .click();
  } else {
    await page.locator('.nav-dropdown-expertise summary').click();
    await page
      .locator('.nav-dropdown-expertise')
      .getByRole('link', { name: 'आपराधिक कानून' })
      .click();
  }
  await expect(page).toHaveURL(/\/hi\/expertise\/criminal-law\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('आपराधिक कानून');
  await expect(page.locator('.practice-list li')).toHaveCount(5);
  await expect(page.locator('.practice-list li').first()).toContainText(hindiOutline[0].items[0]);

  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/expertise\/criminal-law\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Criminal Law');
});

test('Hindi informational routes render translated copy', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one content audit is sufficient');
  const routes = [
    ['/hi/about', 'हम कौन हैं'],
    ['/hi/how-we-help', 'वर्तमान कार्य क्षेत्र'],
    ['/hi/our-work', 'सूचीबद्ध कार्य का स्पष्ट परिचय'],
    ['/hi/get-help', 'पात्र व्यक्तियों को निःशुल्क'],
    ['/hi/faq', 'कौन-से आपराधिक कानून संबंधी कार्य'],
    ['/hi/privacy', 'पूछताछ की जानकारी एकत्र नहीं की जाती'],
    ['/hi/disclaimer', 'परिणाम का वादा नहीं'],
    ['/hi/book-appointment', 'यह केवल डिज़ाइन पूर्वावलोकन है'],
    ['/hi/contact', 'सीधे सार्वजनिक फोन']
  ] as const;

  for (const [route, phrase] of routes) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.locator('main')).toContainText(phrase);
    await expect(page.locator('main')).not.toContainText('Free or concessional legal guidance');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      )
    ).toBe(false);
  }
});
test('contact and appointment routes state their preview status', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact us');
  await page.goto('/book-appointment');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Book an appointment');
  await expect(
    page.getByText(
      'Design preview only. Messages cannot be sent yet, and no information is collected.'
    )
  ).toBeVisible();
  await expect(page.locator('form fieldset')).toHaveAttribute('disabled', '');
  await expect(page.getByLabel('Your name')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeDisabled();
});

test('homepage support heading reveals on scroll and remains readable without JavaScript', async ({
  page,
  browser
}, testInfo) => {
  await page.goto('/');
  const reveal = page.locator('.support-section [data-scroll-reveal]');
  const firstLine = reveal.locator(':scope > div').first();
  await expect(reveal).toBeAttached();
  await expect
    .poll(() => firstLine.evaluate((element) => getComputedStyle(element).opacity))
    .toBe('0');

  await reveal.scrollIntoViewIfNeeded();
  await expect
    .poll(() => firstLine.evaluate((element) => getComputedStyle(element).opacity))
    .toBe('1');
  await expect(reveal.getByRole('heading', { level: 2 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('support-reveal.png') });

  if (testInfo.project.name === 'desktop') {
    const noScriptPage = await browser.newPage({
      javaScriptEnabled: false,
      baseURL: 'http://localhost:4321'
    });
    try {
      await noScriptPage.goto('/');
      const staticLine = noScriptPage
        .locator('.support-section [data-scroll-reveal]')
        .locator(':scope > div')
        .first();
      await expect
        .poll(() => staticLine.evaluate((element) => getComputedStyle(element).opacity))
        .toBe('1');
    } finally {
      await noScriptPage.close();
    }
  }
});

test('scroll progress rail fills through the page and supports pointer and keyboard', async ({
  page,
  browser
}, testInfo) => {
  await page.goto('/');
  const rail = page.locator('[data-scroll-progress]');
  await expect(rail).toBeVisible();
  await expect(rail).toHaveAttribute('aria-valuenow', '0');
  await expect(page.locator('html')).toHaveClass(/has-scroll-progress/);

  const railBox = await rail.boundingBox();
  expect(railBox).not.toBeNull();
  await rail.click({ position: { x: 12, y: railBox!.height / 2 } });
  await expect
    .poll(async () => Number(await rail.getAttribute('aria-valuenow')))
    .toBeGreaterThan(45);
  await expect.poll(async () => Number(await rail.getAttribute('aria-valuenow'))).toBeLessThan(55);

  await page.screenshot({ path: testInfo.outputPath('scroll-progress.png') });
  await rail.focus();
  await page.keyboard.press('End');
  await expect(rail).toHaveAttribute('aria-valuenow', '100');
  await page.keyboard.press('Home');
  await expect(rail).toHaveAttribute('aria-valuenow', '0');
  await page.evaluate(() =>
    window.scrollTo({
      top: (document.scrollingElement!.scrollHeight - document.scrollingElement!.clientHeight) / 4,
      behavior: 'instant'
    })
  );
  await expect
    .poll(async () => Number(await rail.getAttribute('aria-valuenow')))
    .toBeGreaterThan(20);

  if (testInfo.project.name === 'desktop') {
    const noScriptPage = await browser.newPage({
      javaScriptEnabled: false,
      baseURL: 'http://localhost:4321'
    });
    try {
      await noScriptPage.goto('/');
      await expect(noScriptPage.locator('[data-scroll-progress]')).toBeHidden();
      await expect(noScriptPage.locator('html')).not.toHaveClass(/has-scroll-progress/);
      expect(
        await noScriptPage.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)
      ).not.toBe('none');
    } finally {
      await noScriptPage.close();
    }
  }
});
