# Anvitha Legal frontend

Astro and TypeScript frontend for the current areas of work supplied by the firm owner. The eight areas and their 39 bullet points are stored in [src/content/expertise.json](src/content/expertise.json), which also drives the homepage cards, menu dropdowns and individual area pages.

The listed areas are Criminal Law; Family & Matrimonial Law; Civil Law; Banking & Debt Recovery; Service & Education Law; Documentation & Advisory; Legal Aid Initiative (A S Godara Foundation Trust); and Marriage & Matrimonial Services. Earlier draft service lists have been retired.

This is a frontend preview. The appointment form supports localhost SMTP delivery or a local test inbox. The production form remains inactive until delivery is verified on the PHP host. Search indexing stays disabled until the domain and legal copy are reviewed.

## Local commands

- `npm ci` installs locked dependencies.
- `npm run dev` starts the local preview.
- `npm run check` checks Astro and TypeScript.
- `npm run lint` checks code style.
- `npm run build` creates the static site in `dist/`.
- `npm run test:e2e` runs desktop and mobile browser journeys.

See [DESIGN.md](DESIGN.md) for the visual system and [WEBSITE_PLAN.md](WEBSITE_PLAN.md) for content and launch constraints.

## Local appointment testing

Run `npm run dev` and open `/book-appointment`. To use the memory-only test inbox, set `LOCAL_APPOINTMENT_DELIVERY=preview` in the ignored `.env.local`; then open `/dev/appointments`. Submit dummy details: required name, Indian mobile number and query; optional email and subject. The browser shows a local success page, and the test inbox displays the request. No email is sent and nothing is written to disk. The inbox holds at most 20 requests and clears when the dev server restarts. Use test details only.

To send a real email from localhost, change `LOCAL_APPOINTMENT_DELIVERY` in `.env.local` to `smtp`, then set `LOCAL_SMTP_USER` to a Gmail sender address and `LOCAL_SMTP_APP_PASSWORD` to that account's Google App Password. Keep both values out of Git and restart `npm run dev`. The handler sends to `anvithalegal@gmail.com`; check that inbox after a dummy submission. Gmail App Passwords require 2-Step Verification. If SMTP fails, the form shows an unavailable result instead of a false success.

## Appointment delivery

The shared form is in `src/components/ContactForm.astro`. Name, mobile number and query are required; email and subject are optional. The same form appears on the homepage, appointment pages and practice pages. `public/api/appointment.php` is copied into `dist/` and is intended to run on the PHP-capable host currently serving anvithalegal.com. Astro's local server serves static files and does not execute PHP.

Production collection is off by default. The bilingual privacy draft states that appointment emails have no fixed deletion schedule: the firm retains them while needed for the enquiry or a resulting matter, subject to applicable law and valid deletion requests. After the firm reviews that wording and a real email delivery succeeds, build Astro with `PUBLIC_APPOINTMENTS_ENABLED=true`, `PUBLIC_APPOINTMENT_PRIVACY_APPROVED=true`, and `PUBLIC_APPOINTMENT_RETENTION_POLICY=purpose`. On the PHP host, configure `ANVITHA_APPOINTMENTS_ENABLED=true`, `ANVITHA_APPOINTMENT_PRIVACY_APPROVED=true`, `ANVITHA_APPOINTMENT_RETENTION_POLICY=purpose`, and a working domain sender in `ANVITHA_APPOINTMENT_FROM`. The handler sends plain-text notifications to `anvithalegal@gmail.com` through the host's mail transport. PHP accepting mail does not guarantee inbox delivery. The firm must handle valid deletion requests and any applicable retention duties. Never put visitor details or mail credentials in this repository.
