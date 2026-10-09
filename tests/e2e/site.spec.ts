import { expect, test } from '@playwright/test';
import expertiseOutline from '../../src/content/expertise.json' with { type: 'json' };
import hindiOutline from '../../src/content/expertise.hi.json' with { type: 'json' };
import { practiceGroups, type PracticeGroup } from '../../src/lib/navigation';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('anvitha-entry-disclaimer-v1', 'agreed');
  });
});

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
  await expect(page.locator('.approach-section h2')).toHaveText('सलाह, दस्तावेज़ और कार्यवाही।');
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
  const expertiseIndex = sectionOrder.indexOf('expertise-section');
  expect(expertiseIndex).toBeGreaterThan(-1);
  expect(sectionOrder[expertiseIndex + 1]).toBe('approach-section');
  expect(sectionOrder).not.toContain('support-section');
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
  await expect(page.locator('.contact-information a[href="tel:7082325677"]')).toHaveText(
    '70823 25677'
  );
  await expect(
    page.locator('.contact-information a[href="mailto:anvithalegal@gmail.com"]')
  ).toHaveText('anvithalegal@gmail.com');
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
    ['/hi/privacy', 'गोपनीयता जानकारी'],
    ['/hi/disclaimer', 'कोई अधिवक्ता–मुवक्किल संबंध स्थापित नहीं होता'],
    ['/hi/book-appointment', 'अपॉइंटमेंट बुक करें'],
    ['/hi/contact', 'फोन या ईमेल से अन्विता लीगल से संपर्क करें']
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
test('contact and appointment routes reflect the configured delivery mode', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact us');
  await expect(page.locator('main a[href="tel:7082325677"] strong')).toHaveText('70823 25677');
  await expect(page.locator('main a[href="mailto:anvithalegal@gmail.com"] strong')).toHaveText(
    'anvithalegal@gmail.com'
  );
  await page.goto('/book-appointment');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Book an appointment');
  await expect(page.locator('.contact-form')).toHaveAttribute('action', '/api/appointment.php');
  for (const field of ['name', 'phone', 'query']) {
    await expect(page.locator(`.contact-form [name="${field}"]`)).toHaveAttribute('required', '');
  }
  if (await page.getByRole('button', { name: 'Save local test request' }).count()) {
    await expect(page.locator('form fieldset')).toBeEnabled();
    await expect(page.getByText('No email is sent.', { exact: false })).toBeVisible();
  } else if (await page.locator('.contact-form button[type="submit"]').isEnabled()) {
    await expect(page.locator('.contact-form fieldset')).toBeEnabled();
  } else {
    await expect(page.locator('form fieldset')).toHaveAttribute('disabled', '');
    await expect(page.getByLabel('Your name')).toBeDisabled();
  }
});

test('appointment errors identify fields without leaving the form', async ({ page }, testInfo) => {
  const hindi = testInfo.project.name === 'mobile';
  await page.goto(hindi ? '/hi/book-appointment' : '/book-appointment');
  const form = page.locator('.contact-form');
  test.skip(await form.locator('fieldset').isDisabled(), 'appointment form is not enabled');

  let requests = 0;
  await page.route('**/api/appointment.php', async (route) => {
    requests += 1;
    await route.abort();
  });
  const initialUrl = page.url();
  const submit = form.locator('button[type="submit"]');
  await submit.click();

  await expect(page).toHaveURL(initialUrl);
  await expect(form.locator('#appointment-name-error')).toContainText(
    hindi ? 'अपना नाम लिखें' : 'Enter your name'
  );
  await expect(form.locator('#appointment-phone-error')).toContainText(
    hindi ? 'अपना मोबाइल नंबर लिखें' : 'Enter your mobile number'
  );
  await expect(form.locator('#appointment-query-error')).toContainText(
    hindi ? 'अपना सवाल या संदेश लिखें' : 'Write your query or message'
  );
  await expect(form.locator('[name="name"]')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.locator('#appointment-name-error')).toBeVisible();
  await expect(form.locator('[name="name"]')).toBeFocused();
  expect(requests).toBe(0);

  await form.locator('[name="name"]').fill('Local Test');
  await form.locator('[name="phone"]').fill('12345');
  await form.locator('[name="query"]').fill('Local validation test only');
  await submit.click();

  await expect(page).toHaveURL(initialUrl);
  await expect(form.locator('#appointment-name-error')).toBeHidden();
  await expect(form.locator('#appointment-query-error')).toBeHidden();
  await expect(form.locator('#appointment-phone-error')).toContainText(
    hindi ? 'सही 10 अंकों' : 'valid 10-digit'
  );
  await expect(form.locator('#appointment-phone-error')).toBeVisible();
  await expect(form.locator('[name="phone"]')).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('appointment-inline-errors.png') });
  expect(requests).toBe(0);
});

test('appointment inputs remain aligned beside a field error', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'two-column form check');
  await page.setViewportSize({ width: 760, height: 850 });
  await page.goto('/book-appointment');
  const form = page.locator('.contact-form');
  test.skip(await form.locator('fieldset').isDisabled(), 'appointment form is not enabled');

  const phone = form.locator('[name="phone"]');
  const subject = form.locator('[name="subject"]');
  const position = (element: Element) => {
    const box = element.getBoundingClientRect();
    return { top: box.top + window.scrollY, height: box.height };
  };
  const phoneBefore = await phone.evaluate(position);
  const subjectBefore = await subject.evaluate(position);
  expect(Math.abs(phoneBefore.top - subjectBefore.top)).toBeLessThanOrEqual(1);

  await form.locator('[name="name"]').fill('Local Test');
  await phone.fill('9887');
  await subject.fill('n');
  await form.locator('button[type="submit"]').click();

  await expect(form.locator('#appointment-phone-error')).toBeVisible();
  const phoneAfter = await phone.evaluate(position);
  const subjectAfter = await subject.evaluate(position);
  expect(Math.abs(phoneAfter.top - subjectAfter.top)).toBeLessThanOrEqual(1);
  expect(subjectAfter.top).toBeCloseTo(subjectBefore.top, 0);
  expect(subjectAfter.height).toBeCloseTo(subjectBefore.height, 0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('aligned-appointment-errors.png') });
});
test('server validation marks its field and keeps the visitor on the form', async ({ page }) => {
  await page.goto('/book-appointment');
  const form = page.locator('.contact-form');
  test.skip(await form.locator('fieldset').isDisabled(), 'appointment form is not enabled');

  await page.route('**/api/appointment.php', (route) =>
    route.fulfill({
      status: 422,
      contentType: 'application/json',
      body: JSON.stringify({ result: 'invalid', errors: { subject: 'invalid' } })
    })
  );
  await form.locator('[name="name"]').fill('Local Test');
  await form.locator('[name="phone"]').fill('9876543210');
  await form.locator('[name="subject"]').fill('A valid subject');
  await form.locator('[name="query"]').fill('Local validation test only');
  const initialUrl = page.url();
  await form.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(initialUrl);
  await expect(form.locator('#appointment-subject-error')).toHaveText('Please check the subject.');
  await expect(form.locator('[name="subject"]')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.locator('[name="query"]')).toHaveValue('Local validation test only');
});

test('valid appointment response still reaches confirmation', async ({ page }) => {
  await page.goto('/book-appointment');
  const form = page.locator('.contact-form');
  test.skip(await form.locator('fieldset').isDisabled(), 'appointment form is not enabled');

  await page.route('**/api/appointment.php', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ result: 'sent', errors: {} })
    })
  );
  await form.locator('[name="name"]').fill('Local Test');
  await form.locator('[name="phone"]').fill('9876543210');
  await form.locator('[name="query"]').fill('Local confirmation test only');
  await form.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/appointment-sent\/?$/);
});
test('localhost appointment request reaches the local test inbox', async ({ page }, testInfo) => {
  await page.goto('/book-appointment');
  test.skip(
    (await page.getByRole('button', { name: 'Save local test request' }).count()) === 0,
    'localhost test inbox is not configured'
  );
  const name = `Playwright ${testInfo.project.name} ${Date.now()}`;
  await page.getByLabel('Your name').fill(name);
  await page.getByLabel('Your phone number').fill('9876543210');
  await page.getByLabel('Query / message').fill('Dummy request for local form verification');
  await page.getByRole('button', { name: 'Save local test request' }).click();
  await expect(page).toHaveURL(/\/appointment-sent\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Local test request saved');
  await page.getByRole('link', { name: 'View local test inbox' }).click();
  await expect(page.getByRole('heading', { name: 'Local appointment test inbox' })).toBeVisible();
  await expect(page.getByText(name)).toBeVisible();
  await expect(
    page
      .getByRole('article')
      .filter({ hasText: name })
      .getByText('Dummy request for local form verification')
  ).toBeVisible();
});

test('homepage removes the extra cards and highlights the advice section', async ({
  page
}, testInfo) => {
  for (const [path, heading] of [
    ['/', 'Advice, documents and proceedings.'],
    ['/hi', 'सलाह, दस्तावेज़ और कार्यवाही।']
  ]) {
    await page.goto(path);
    await expect(page.locator('.hero-signature')).toHaveCount(0);
    await expect(page.locator('.support-section')).toHaveCount(0);
    const advice = page.locator('.approach-section');
    await expect(advice.getByRole('heading', { level: 2 })).toHaveText(heading);
    expect(await advice.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
      'rgb(60, 21, 24)'
    );
    expect(await advice.evaluate((element) => getComputedStyle(element).color)).toBe(
      'rgb(245, 240, 232)'
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      )
    ).toBe(false);
  }
  await page.screenshot({ path: testInfo.outputPath('advice-highlight.png') });
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

test('home footer shows clickable public contact details', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.locator('a[href="tel:7082325677"]')).toHaveText('70823 25677');
  await expect(footer.locator('a[href="mailto:anvithalegal@gmail.com"]')).toHaveText(
    'anvithalegal@gmail.com'
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
  ).toBe(false);
});

test('transparent header mark and full brand logo load without a background box', async ({
  page
}) => {
  await page.goto('/');
  const headerLogo = page.locator('.wordmark-mark img');
  await expect(headerLogo).toHaveAttribute('src', /anvitha-legal-mark-exact/);
  await expect
    .poll(() => headerLogo.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  expect(
    await headerLogo.evaluate((image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, 1, 1).data[3];
    })
  ).toBe(0);
  expect(
    await page
      .locator('.wordmark-mark')
      .evaluate((element) => getComputedStyle(element).backgroundColor)
  ).toBe('rgba(0, 0, 0, 0)');

  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute('type', 'image/png');
  const faviconHref = await favicon.getAttribute('href');
  expect(faviconHref).toBeTruthy();
  expect((await page.request.get(faviconHref!)).ok()).toBe(true);

  const brandPanel = page.locator('.work-visual img');
  await brandPanel.scrollIntoViewIfNeeded();
  await expect(brandPanel).toHaveAttribute('src', /anvitha-legal-logo/);
  await expect
    .poll(() => brandPanel.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
});
