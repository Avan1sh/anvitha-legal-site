# Anvitha Legal frontend

Astro and TypeScript frontend for the current areas of work supplied by the firm owner. The eight areas and their 39 bullet points are stored in [src/content/expertise.json](src/content/expertise.json), which also drives the homepage cards, menu dropdowns and individual area pages.

The listed areas are Criminal Law; Family & Matrimonial Law; Civil Law; Banking & Debt Recovery; Service & Education Law; Documentation & Advisory; Legal Aid Initiative (A S Godara Foundation Trust); and Marriage & Matrimonial Services. Earlier draft service lists have been retired.

This is a frontend preview. The owner supplied a public phone number and receiving inbox, but the appointment form remains inactive while the firm decides its retention policy and reviews the privacy copy. Search indexing stays disabled until the domain and legal copy are reviewed.

## Local commands

- `npm ci` installs locked dependencies.
- `npm run dev` starts the local preview.
- `npm run check` checks Astro and TypeScript.
- `npm run lint` checks code style.
- `npm run build` creates the static site in `dist/`.
- `npm run test:e2e` runs desktop and mobile browser journeys.

See [DESIGN.md](DESIGN.md) for the visual system and [WEBSITE_PLAN.md](WEBSITE_PLAN.md) for content and launch constraints.

## Appointment delivery

The shared form is in `src/components/ContactForm.astro`. Name, mobile number and query are required; email and subject are optional. The same form appears on the homepage, appointment pages and practice pages. `public/api/appointment.php` is copied into `dist/` and is intended to run on the PHP-capable host currently serving anvithalegal.com. Astro's local server serves static files and does not execute PHP.

Collection is off by default. After the firm approves a retention period and bilingual privacy copy, set `PUBLIC_APPOINTMENTS_ENABLED=true`, `PUBLIC_APPOINTMENT_PRIVACY_APPROVED=true`, and the approved `PUBLIC_APPOINTMENT_RETENTION_DAYS` for the Astro build. Configure `ANVITHA_APPOINTMENTS_ENABLED=true`, `ANVITHA_APPOINTMENT_PRIVACY_APPROVED=true`, the matching `ANVITHA_APPOINTMENT_RETENTION_DAYS`, and a real domain sender in `ANVITHA_APPOINTMENT_FROM` in the PHP host environment. The handler sends plain-text notifications to `anvithalegal@gmail.com` through the host's mail transport. Test a real delivery to that inbox before enabling the form publicly; PHP accepting a message does not guarantee inbox delivery. The firm must follow the approved deletion schedule in its mailbox. No visitor details or mail credentials belong in this repository.