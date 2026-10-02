# Anvitha Legal website plan

Research date: 1 October 2026. This is a development plan, not approved legal copy. The supplied DOCX is treated as a source of proposed facts and content, not as implementation instructions.

**Current build scope:** frontend only, per the developer's latest direction. Intake, email delivery, hosting configuration, and other server-side items below remain future planning options; they are not part of the current site.

## 1. Product decision

Build a fast, accessible, bilingual site for **Anvitha Legal**, described in the supplied brief as a legal awareness and aid initiative of **A S Godara Foundation Trust**. The developer has since clarified that the commercial objective is to attract clients for a lawyer in the lawyer's region, with mobile visitors as the primary audience. Before public copy or local listings are created, the client must decide whether the public entity is the Trust initiative, a named enrolled advocate, or a law firm. Those identities cannot be blended or presented interchangeably. The site should help a visitor find the right local contact and next step without implying that contacting the Trust retains an advocate.

The proposed domain in the brief is `anvithalegal.com`. Domain ownership and DNS access have not been verified. The brief says the Trust was registered at Charkhi Dadri, Haryana on 22 February 2024; the deed and exact public registration identifier need verification before publication. No confirmed individual advocate name, physical address, phone number, email address, opening hours, or grievance contact is supplied. The bracketed email addresses and response time in the brief are placeholders, not contact facts.

**Primary success measure:** qualified enquiries from the verified service region that receive an appropriate response. Also measure mobile click-to-call taps, completed help requests, and clicks to official aid routes in aggregate. Track enquiry quality manually without sending case descriptions or personally identifying information to analytics. Do not optimize for raw lead volume at the expense of accurate identity or eligibility.

## 2. Reference site assessment

The supplied [Sandhya Gupta reference site](https://www.advocatesandhyagupta.com/) has a clear top navigation, an overview of services, a process section, articles, and multiple ways to contact the organization. These are useful information architecture cues. Its long lawyer-keyword menu, repeated hero panels, client testimonials, success ratio, and appointment sales framing do not fit Anvitha Legal's described charitable model. The reference also uses an entry disclaimer; its presence does not establish that such a gate is legally required or sufficient. Build an original design and content system, not a copy of that site's branding or claims.

## 3. Audience, journeys, and information architecture

Audience: mobile searchers in the verified service city and nearby region who need a lawyer or a clear legal-aid route; Hindi-first readers; users on low-end phones or slow connections; secondarily, volunteers and partner organizations. The primary journey is **local search → relevant page → verified identity and location → tap to call or send a short enquiry**. Emergency and urgent-deadline routes should be visible before the help form.

| Page | Purpose and core content | Launch priority |
| --- | --- | --- |
| Home | Identity, four kinds of support, audience pathways, process, aid route, restrained calls to action | 1 |
| About | Trust relationship, verified registration facts, mission, what staff and enrolled advocates each do | 1 |
| How we help | Guidance, documentation support, awareness, referrals; concise categories rather than the whole DOCX list | 1 |
| Topic pages | Family and safety, police and criminal process, property and civil issues, consumer and money issues, work and welfare, documents and public authorities; publish only reviewed claims | 1 for verified core areas; expand later |
| Get legal help | Emergency routing, eligibility guidance, NALSA/DLSA links, mobile call button, contact options, minimal form | 1 |
| Our work | Verified community programmes, legal literacy events, guides, partnerships, and their factual reach; client matters only after counsel and consent review | 1 |
| Resources | Short guides and FAQs with reviewer, sources, jurisdiction, reviewed date | 2 |
| Get involved | Volunteer, partnership, internship, and donations only after operating details and tax wording are verified | 2 |
| Contact | Verified address, hours, phone, email, accessible directions | 1 |
| Disclaimer and privacy | Clear, reviewed policies in English and Hindi | 1 |

Use `/` for English and `/hi/` for Hindi, with equivalent routes where a genuine translation exists. Place an explicit language switcher in the header and preserve the current page when the counterpart exists. Do not publish machine translated legal guidance without human review. Each page has one clear H1, descriptive links, and an obvious next step. Google recommends separate URLs and `hreflang` for language versions [S5].

## 4. Design direction

Use a calm civic-service visual language: warm off-white background, dark ink text, restrained deep blue or green accent, and generous spacing. Avoid gavels, scales, court stock photography, animated carousels, and conversion pop-ups. A real approved photograph of the organization or its awareness work is better than generic lawyer imagery; obtain consent before showing identifiable people. Make Hindi typography as carefully designed as English. Start with system font stacks that render Devanagari well; add a hosted font only if testing shows a material improvement. Keep content in HTML, not text baked into images.

Mobile first: design at 360–390 px before desktop, with a compact header, clear language switch, large tap targets, visible click-to-call and aid options, and a short single-column form. Put the city, actual public identity, service area, and contact route above the first scroll. Use a sticky call/contact action only if it does not cover text or controls. Test tap-to-call with the final verified number. Aim for WCAG 2.2 AA, including keyboard operation, visible focus, labelled fields, error messages, sufficient contrast, and status announcements [S6]. Do not make critical help depend on JavaScript, animations, or a modal. Google uses the mobile version for indexing and recommends responsive design [S15].

## 5. Recommended stack

| Layer | Choice | Why it fits | Boundary |
| --- | --- | --- | --- |
| Site framework | Astro with TypeScript, prerendered pages | Content dominates the site; Astro supports static pages, typed content collections, and locale routing [S1] | Add runtime rendering only when a real feature needs it |
| UI and styling | Astro components, semantic HTML, scoped CSS with design tokens | Small client bundle and direct control of accessible markup | No full SPA framework for ordinary pages |
| Content | Git tracked Markdown/MDX content collections with a schema | Reviewable diffs, version history, required metadata such as reviewer and last review date [S1] | Add a CMS only if nontechnical editors need direct publishing every week |
| Hosting | Cloudflare Pages, custom domain, Git based previews | Static edge delivery, HTTPS, preview deployments, and a nearby Functions option [S2] | Confirm vendor terms, billing, and data handling before collecting requests |
| Intake endpoint | One Cloudflare Pages Function at `/api/help` | Server side validation and submission without a persistent app server [S2] | Do not store requests in site analytics or build logs |
| Abuse controls | Server verified Turnstile, rate limit, honeypot | Reduces automated submissions; token validation belongs on server [S3] | Provide a phone or email route if the challenge fails |
| Delivery | Organization controlled inbox through a vetted transactional email provider | No public admin dashboard or database in phase one | The inbox and provider still process personal data; assess access, retention, and location |
| Tooling | npm lockfile, ESLint, Prettier, TypeScript check, targeted Playwright flows, Lighthouse and axe checks | Reproducible builds and checks of critical visitor journeys | Add tests for behavior, not every text block |

Proposed repo layout: `src/pages`, `src/components`, `src/styles`, `src/content/guides/{en,hi}`, `src/lib`, `public`, `functions/api/help.ts`, `tests/e2e`, and `docs`. Keep secrets in deployment environment variables; never commit them.

**Why this stack over alternatives:** Next.js is capable, including static export, but its broader server and React model brings more concepts than these mostly static pages require; if this becomes a client portal with accounts, case status, or frequent personalized data, reassess Next.js [S7]. WordPress gives nontechnical editing immediately, but plugins, themes, updates, backup, and security operations add an ongoing maintenance surface [S8]. Webflow can accelerate a visual brochure site, but a bilingual reviewed-content workflow and a carefully controlled sensitive intake endpoint would need additional integrations and provider review. Hand coded HTML is viable for five pages, but the planned bilingual guides and required review metadata make structured content and reusable templates more reliable. Tailwind and a component library are optional, not necessary for this limited design system. Do not add a database, auth system, chat widget, CRM, donation gateway, or AI legal chatbot for launch without a demonstrated need.

## 6. Intake and privacy design

The help form should ask only for name, one contact method, district, preferred language, issue category, and a short summary (at most 500 characters). The DOCX proposes phone as required and email as optional; confirm that contact policy with the Trust. Show a plain warning before the text area: no Aadhaar, financial details, original documents, detailed evidence, or urgent requests. Do not allow uploads. Require an unticked, explicit consent checkbox beside links to the privacy policy and disclaimer. Preserve form inputs when validation fails and provide a non-JavaScript submission path.

On the server: validate field types and lengths, reject unexpected fields, check origin and content type, verify Turnstile, apply rate limiting, send through the approved provider, and return a reference number without echoing the case summary. Do not log bodies, email full narratives to personal accounts, or include PII in error tracking. Use least privilege and two factor authentication for the receiving inbox. Document who may read requests, a response process, a deletion schedule, and a way to handle access/erasure requests. A tentative retention period must be approved by the Trust and counsel; it is not established by the source document.

The supplied privacy policy is a draft. Government notifications issued in November 2025 phased commencement of the DPDP Act and Rules; most substantive obligations in the cited schedules are set to begin eighteen months after publication, around May 2027 [S9]. Design for clear notice, consent records, withdrawal, grievance contact, minimization, breach response, and provider contracts now. Have Indian counsel review the final policy and actual data flow before launch. Do not assert that hosting or email data remains in India without a vendor commitment.

## 7. Legal and editorial controls

Rule 36 of the Bar Council of India Rules restricts advocates' advertising and solicitation; the official rules allow only prescribed website information for advocates [S10]. The Trust's exact position and any associated advocates' pages should be reviewed by qualified Indian counsel. Do not import the reference site's claims about expertise, success rates, testimonials, fees, or guaranteed outcomes. A disclaimer modal is not a substitute for compliant content. The DOCX requests a first-visit modal, but that is a proposed content instruction, not an independently verified legal requirement. Default to a visible, linked disclaimer and explicit form consent; if counsel requires a gate, make it keyboard accessible and avoid blocking emergency and legal-aid information.

Editorial workflow for every legal guide: author → source check against official law/authority → legal reviewer approval → Hindi translation review → publication → scheduled recheck. Store `locale`, `jurisdiction`, `sourceUrls`, `reviewedBy`, `reviewedAt`, and `nextReviewAt` with each guide. Add a visible reviewed date and short information-only note. Remove or flag pages when legal review expires. The brief contains numerous detailed legal claims and statute mappings; none should be pasted wholesale without checking current law and scope of service.

NALSA currently lists 15100 as a legal aid helpline and explains routes to DLSA and other authorities [S11]. Link directly to official services. Emergency wording and any promise of a response within a set number of days require an actual staffed process.

## 8. Search, measurement, and performance

Create crawlable HTML pages, unique titles and descriptions, XML sitemap, robots.txt, canonical URLs, localized `hreflang`, and descriptive internal links. Add truthful `Organization` structured data for the Trust after its public details are verified; do not mark it as a law firm or invent reviews [S12]. Use a focused set of useful guides such as “How to approach the DLSA in Charkhi Dadri,” each with source links and a review date. Avoid mass production of keyword pages; Google's guidance favors useful people-first content [S13].

Target field Core Web Vitals at the 75th percentile: LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1 [S14]. Also set a project budget: no essential page should require client JavaScript, minimal third-party scripts, responsive AVIF/WebP images, explicit image dimensions, and no autoplay media. Test on a low-end Android profile and slow mobile connection. Use privacy-respecting aggregate analytics only after the privacy policy accurately describes it; a zero-analytics launch is acceptable.

### Local search plan for client enquiries

No developer can promise first place for “lawyer in [city]”. Google says local results mainly reflect **relevance, distance, and prominence**, and that a business cannot request or pay for a better local ranking [S16]. Separate the two outcomes: Google Maps/local pack visibility through an eligible, accurate Business Profile, and ordinary website rankings through relevant, useful pages. Decide the real city and public legal entity before researching actual queries.

1. **Establish the real-world entity.** Verify the advocate's enrolment details or firm identity, genuine staffed address, direct phone, hours, and actual service area. Keep those facts consistent on the site and authorized listings. A Google Business Profile is available only to eligible in-person businesses or practitioners; online-only organizations and lead-generation agents are ineligible [S17]. Google has separate individual-practitioner guidance. Do not create a listing for a virtual office, a borrowed court address, or a city where nobody works [S18]. Decide with counsel whether an advocate's profile and any client-acquisition language comply with professional rules.
2. **Research search intent by city and language.** Start with the verified city, nearby places actually served, and real areas of practice. Build a spreadsheet of English and Hindi queries such as `[practice area] lawyer [city]`, `[city] advocate`, and help-oriented Hindi equivalents. Validate demand and wording with Google Search Console after launch, local search results, and Keyword Planner when an eligible account is available; do not invent search volumes [S19]. Classify branded, general local, practice-specific, and legal-aid intent separately.
3. **Build useful landing pages.** The home page states the real identity and location. Contact and About pages show verified local facts. Each approved practice or help page explains who it serves, the process, documents often needed, jurisdiction, and how to contact the correct entity. A page for another city requires genuine local information or a real location; duplicating one template with city names can be doorway abuse under Google's spam policy [S20]. If the public identity remains the Trust, target legal-awareness and aid searches, not misleading “best lawyer” searches.
4. **Improve discoverability.** Publish crawlable mobile HTML; descriptive titles and headings; internal links from the home page and relevant guides; sitemap; Search Console; separate Hindi URLs with `hreflang`; and factual structured data matching the real entity. Use `LocalBusiness` markup only when the entity and location actually fit, and validate it [S21]. Obtain relevant editorial mentions and links from genuine local partners or event organizers. Do not buy links or publish keyword-stuffed directory entries.
5. **Measure and iterate.** Establish a baseline for mobile impressions, clicks, query groups, local profile actions, calls, and qualified enquiries. Review after 30, 60, and 90 days, then monthly. Track whether calls are answered and whether a visitor reached the intended lawyer or aid route. Ranking for one broad term is less useful than qualified local enquiries. Local results vary with the searcher's location, so report a set of queries and locations rather than a single claimed rank.

### Our Work page

Launch with **public, verifiable work**: awareness camps, workshops, legal-literacy guides, partnerships, and access-to-aid activities. Each item can show date, location, purpose, the organization's actual role, approved photographs, and a link to any public partner or event record. Use numbers only when documented, for example the count of camps conducted, with a defined period and source. Obtain permission before identifying participants; avoid personal legal details in photographs and captions.

If the public site is for an enrolled advocate or law firm, a case-results portfolio, client testimonials, named clients, victory claims, and before/after stories should be held for specific Indian counsel review. Rule 36's website schedule is narrow [S10]. The safest initial version shows educational or community work and factual areas of practice. Anonymizing a case removes some privacy risk but does not by itself solve advertising and solicitation concerns. The brief's disclaimer gate does not make a promotional work page compliant.

## 9. Delivery plan and acceptance gates

1. **Discovery and facts, 3–5 working days:** confirm the city/cities and public entity; verify advocate or Trust details, domain ownership, real contact details, service coverage, emergency policy, named content approver, Hindi reviewer, form recipient, response capacity, Google Business Profile eligibility, and 80G/12A status if donations will be shown.
2. **Content and UX, 5–7 days:** map the DOCX into concise pages, write both languages, research actual local queries, collect approved Our Work evidence, decide which topic pages are genuinely supported, create mobile wireframes and a small design system, and obtain legal review of claims and policies.
3. **Build, 7–10 days:** Astro templates, locale routes, guide schema, navigation, contact flow, form endpoint, security headers, SEO metadata, and preview deployment.
4. **Quality and review, 3–5 days:** test Hindi and English journeys, keyboard and screen reader basics, narrow screens, form abuse and error states, 404/500 pages, email delivery, and privacy behavior. Run automated accessibility and performance checks plus human review.
5. **Launch, 1–2 days:** connect verified domain, configure DNS and HTTPS, verify sitemap and Search Console, test production form with a controlled request, check monitoring and rollback, and hand over operating instructions.

These are planning ranges for one developer with timely client and counsel feedback, not a promise of delivery time. The critical path is verified contact information and legal/content approval. Do not publish placeholder details.

**Launch acceptance:** public entity and city verified; all visible contact and trust facts verified; no unreviewed legal or work claims; English/Hindi navigation and critical pages complete; mobile call and form routes work; help form works without data in analytics/logs; policies match actual providers and retention; accessible forms and disclaimer treatment; no broken official links; acceptable mobile performance; Search Console configured; eligible local profile verified or explicitly deferred; rollback and content owner identified.

## 10. Decisions to obtain from the client

| Decision | Needed before |
| --- | --- |
| Confirm whether the public identity is the Trust initiative only, and whether any individual advocate is to appear | Final content and design |
| Name the primary city and any nearby cities actually served | Local search research and page copy |
| Provide deed/registration details, address, phone, real email, hours, domain access, and Trust background | Launch |
| Confirm service geography and which listed matters the team can actually support | Topic pages |
| Nominate legal reviewer, Hindi reviewer, grievance contact, and form response owner | Policies and intake launch |
| Decide whether staff can maintain content through Git review or require a CMS | Implementation of editing workflow |
| Approve mail provider, privacy/retention policy, and donation eligibility if applicable | Help form and donations |
| Supply dates, locations, records, images, and publication permissions for Our Work | Our Work page |

## 11. Operations, costs, and change triggers

Budget for the domain and DNS, hosting and function usage, transactional mail, a shared mailbox, optional analytics, and developer time for review and maintenance. Check current vendor quotes and terms before purchase; traffic and mail volume are not known, so a precise monthly figure would be invented. The main recurring human cost is keeping legal content current, answering requests, and maintaining the inbox.

Run a monthly link and form check; review access permissions and provider invoices quarterly; review legal guides on their scheduled dates and immediately after relevant legal changes. Keep the site in Git with protected review before production deployment, a documented rollback to a prior build, and an export of all published content. Monitor uptime and form failures without recording visitor narratives. Rotate API credentials when personnel change.

Add a headless CMS when several nontechnical editors need routine direct edits with an approval workflow. Add a database only when the Trust needs a real request lifecycle with assigned owners, consent history, and retention automation. Add accounts or a client portal only after a separate security and privacy design. Reassess hosting if the Trust has a verified India-only data residency requirement that the selected providers cannot contractually meet.

## Sources

- [S1] Astro [content collections](https://docs.astro.build/en/guides/content-collections/) and [internationalization](https://docs.astro.build/en/guides/internationalization/).
- [S2] Cloudflare [Pages Functions](https://developers.cloudflare.com/pages/functions/) and Astro [Cloudflare Pages deployment](https://docs.astro.build/en/guides/deploy/cloudflare/).
- [S3] Cloudflare [Turnstile form guidance](https://developers.cloudflare.com/turnstile/tutorials/login-pages/).
- [S5] Google Search Central [multilingual sites](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites).
- [S6] W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [S7] Next.js [App Router](https://nextjs.org/docs/app) and [static export](https://nextjs.org/docs/app/guides/single-page-applications).
- [S8] WordPress [plugin and theme updates](https://wordpress.org/documentation/article/plugins-themes-auto-updates/).
- [S9] MeitY [DPDP Act commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf) and [DPDP Rules 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf).
- [S10] [Bar Council of India Rules, official copy](https://cdnbbsr.s3waas.gov.in/s3ec0490f1f4972d133619a60c30f3559e/documents/aorexam/18052023_051925.pdf), Part VI, Chapter II, Rule 36.
- [S11] NALSA [FAQs](https://nalsa.gov.in/faqs/).
- [S12] Google Search Central [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization).
- [S13] Google Search Central [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- [S14] web.dev [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).
- [S15] Google Search Central [mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).
- [S16] Google Business Profile [local ranking factors](https://support.google.com/business/answer/7091).
- [S17] Google Business Profile [eligibility](https://support.google.com/business/answer/13763036).
- [S18] Google Business Profile [representation and individual practitioner guidelines](https://support.google.com/business/answer/3038177).
- [S19] Google Ads [Keyword Planner location and language research](https://support.google.com/google-ads/answer/6325025).
- [S20] Google Search Central [spam policies, including doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies).
- [S21] Google Search Central [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).
