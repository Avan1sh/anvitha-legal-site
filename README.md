# Anvitha Legal website

Mobile-first, bilingual Astro frontend for the legal awareness and aid initiative described in the supplied project brief. The current build is a reviewable preview. It does not present the initiative as an individual lawyer or law firm, because the brief does not verify that identity. There is no backend, enquiry submission, or visitor data collection in this phase.

## Run locally

Use Node 22.19 or newer and npm. Run `npm ci`, then `npm run dev` and open `http://localhost:4321/`. Run `npm run check`, `npm run lint`, `npm run build`, and `npm run test:e2e` before release. Playwright uses an installed Chrome browser. `npm run format` applies Prettier formatting.

Astro pages are in `src/pages/`; Hindi routes are under `src/pages/hi/`. Edit bilingual copy and verified public details in `src/lib/site.ts`. The Our Work page currently describes categories of work; add dated, evidenced activities only after the Trust approves them. Follow [DESIGN.md](DESIGN.md) for visual styling. The UI is in `src/components/` and `src/styles/global.css`; Phosphor SVG icons are rendered by `src/components/PhosphorIcon.astro`.

Header dropdown labels and slugs are maintained in `src/lib/navigation.ts`. Their expertise and service routes currently show titles only and are individually marked `noindex` until approved content is supplied. The Contact Us and Book an Appointment routes are frontend previews; they do not accept enquiries or bookings.

## Preview and production configuration

Copy `.env.example` to `.env` for local development. Set `PUBLIC_SITE_URL` to the final HTTPS origin before launch. `PUBLIC_ENABLE_INDEXING=false` keeps preview pages out of search; the site also emits a restrictive `robots.txt`. Enable indexing only after the public entity, location, contact details, content, and domain are verified. The build then provides canonical and English/Hindi alternate links plus `/sitemap.xml`. Submit the sitemap in Google Search Console after launch.

The Get Help page shows official emergency and legal-aid routes plus preparation guidance. It intentionally has no submission form until a real public contact route and a separately approved intake process exist. The site contains no server function or mail integration.

## Launch facts to confirm

Confirm whether an individual advocate or law firm should appear, and obtain enrolment details and counsel review before changing that identity. Obtain the actual service city, staffed address, phone, email, hours, approved service scope, legal/Hindi reviewers, and public records or permissions for Our Work items. Only then create factual local pages and an eligible Google Business Profile. The [research and implementation plan](WEBSITE_PLAN.md) explains the stack, local search strategy, and legal review decisions.
