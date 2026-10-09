import nodemailer from 'nodemailer';

const recipient = 'anvithalegal@gmail.com';
const maxBodyBytes = 16_000;

function field(form, key) {
  return (form.get(key) ?? '').trim();
}

function isLoopback(address) {
  return ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address ?? '');
}

function respond(request, response, status, result, locale, errors = {}) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if ((request.headers.accept ?? '').includes('application/json')) {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=UTF-8' });
    response.end(JSON.stringify({ result, errors }));
    return;
  }
  const prefix = locale === 'hi' ? '/hi' : '';
  response.writeHead(303, { Location: `${prefix}/appointment-${result}` });
  response.end();
}

async function readForm(request) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBodyBytes) throw new Error('body-too-large');
    chunks.push(chunk);
  }
  return new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
}

export function validateAppointment(form) {
  const name = field(form, 'name');
  const rawPhone = field(form, 'phone');
  const email = field(form, 'email');
  const subject = field(form, 'subject');
  const query = field(form, 'query');
  const errors = {};

  if (!name || name.length > 100 || /[\x00-\x1f\x7f]/u.test(name)) errors.name = 'invalid';
  let phone = rawPhone.replace(/[\s().-]+/gu, '');
  if (phone.startsWith('+91')) phone = phone.slice(3);
  else if (phone.startsWith('91') && phone.length === 12) phone = phone.slice(2);
  if (rawPhone.length > 20 || !/^[6-9][0-9]{9}$/u.test(phone)) errors.phone = 'invalid';
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email))) {
    errors.email = 'invalid';
  }
  if (subject.length > 120 || /[\x00-\x1f\x7f]/u.test(subject)) errors.subject = 'invalid';
  if (!query || query.length > 3000) errors.query = 'invalid';

  const sourceValue = field(form, 'source');
  const source = /^\/[a-z0-9/-]{0,140}$/u.test(sourceValue) ? sourceValue : '/';
  return { errors, name, phone, email, subject, query, source };
}

function deliveryMode() {
  if (
    process.env.PUBLIC_APPOINTMENT_PRIVACY_APPROVED !== 'true' ||
    process.env.PUBLIC_APPOINTMENT_RETENTION_POLICY !== 'purpose'
  ) {
    return null;
  }
  if (process.env.LOCAL_APPOINTMENT_DELIVERY === 'preview') return 'preview';
  if (
    process.env.LOCAL_APPOINTMENT_DELIVERY === 'smtp' &&
    process.env.LOCAL_SMTP_USER &&
    process.env.LOCAL_SMTP_APP_PASSWORD
  ) {
    return 'smtp';
  }
  return null;
}

function mailText(appointment, locale) {
  return [
    'New appointment request — Anvitha Legal',
    '',
    `Name: ${appointment.name}`,
    `Mobile: +91${appointment.phone}`,
    `Email: ${appointment.email || 'Not provided'}`,
    `Subject: ${appointment.subject || 'Not provided'}`,
    `Page: ${appointment.source}`,
    `Language: ${locale === 'hi' ? 'Hindi' : 'English'}`,
    `Submitted at: ${new Date().toISOString()}`,
    '',
    'Query:',
    appointment.query
  ].join('\n');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/gu, (character) => {
    const replacements = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return replacements[character];
  });
}

function showPreviewInbox(response, inbox) {
  const entries = inbox
    .map(
      (entry) => `<article>
        <h2>${escapeHtml(entry.name)} · ${escapeHtml(entry.submittedAt)}</h2>
        <dl>
          <dt>Mobile</dt><dd>+91${escapeHtml(entry.phone)}</dd>
          <dt>Email</dt><dd>${escapeHtml(entry.email || 'Not provided')}</dd>
          <dt>Subject</dt><dd>${escapeHtml(entry.subject || 'Not provided')}</dd>
          <dt>Page</dt><dd>${escapeHtml(entry.source)}</dd>
          <dt>Language</dt><dd>${escapeHtml(entry.locale)}</dd>
        </dl>
        <h3>Query</h3><pre>${escapeHtml(entry.query)}</pre>
      </article>`
    )
    .join('');
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'"
  });
  response.end(
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local appointment test inbox</title><style>body{max-width:760px;margin:3rem auto;padding:0 1.25rem;font:16px/1.5 system-ui;color:#271b1c}article{border-top:1px solid #aaa;padding:1.5rem 0}dl{display:grid;grid-template-columns:7rem 1fr;gap:.25rem}dt{font-weight:700}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f5f1ed;padding:1rem}a{color:#5d292b}</style><main><h1>Local appointment test inbox</h1><p>Test requests stay in this dev server's memory. No email is sent. Restarting the server clears them. Use test details only.</p><p><a href="/book-appointment">Back to appointment form</a></p>${entries || '<p>No test requests yet.</p>'}</main></html>`
  );
}

export default function localAppointment() {
  return {
    name: 'anvitha-local-appointment',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        const inbox = [];
        server.middlewares.use('/dev/appointments', (request, response) => {
          if (!isLoopback(request.socket.remoteAddress) || deliveryMode() !== 'preview') {
            response.writeHead(404);
            response.end();
            return;
          }
          if (request.method !== 'GET') {
            response.writeHead(405, { Allow: 'GET' });
            response.end();
            return;
          }
          showPreviewInbox(response, inbox);
        });

        server.middlewares.use('/api/appointment.php', async (request, response) => {
          if (request.method !== 'POST') {
            response.writeHead(405, { Allow: 'POST' });
            response.end();
            return;
          }
          const mode = deliveryMode();
          if (!mode) {
            respond(request, response, 503, 'unavailable', 'en');
            return;
          }
          if (!isLoopback(request.socket.remoteAddress)) {
            respond(request, response, 403, 'invalid', 'en');
            return;
          }
          const origin = request.headers.origin;
          if (origin) {
            let sameOrigin = false;
            try {
              sameOrigin = new URL(origin).host === request.headers.host;
            } catch {
              // Reject malformed Origin headers like any other cross-origin submission.
            }
            if (!sameOrigin) {
              respond(request, response, 403, 'invalid', 'en');
              return;
            }
          }
          if (
            !(request.headers['content-type'] ?? '').startsWith('application/x-www-form-urlencoded')
          ) {
            respond(request, response, 422, 'invalid', 'en');
            return;
          }

          let form;
          try {
            form = await readForm(request);
          } catch {
            respond(request, response, 413, 'invalid', 'en');
            return;
          }
          const locale = field(form, 'locale') === 'hi' ? 'hi' : 'en';
          if (field(form, 'website')) {
            respond(request, response, 422, 'invalid', locale);
            return;
          }
          const appointment = validateAppointment(form);
          if (Object.keys(appointment.errors).length) {
            respond(request, response, 422, 'invalid', locale, appointment.errors);
            return;
          }
          if (mode === 'preview') {
            inbox.unshift({ ...appointment, locale, submittedAt: new Date().toISOString() });
            if (inbox.length > 20) inbox.length = 20;
            respond(request, response, 200, 'sent', locale);
            return;
          }

          const sender = process.env.LOCAL_SMTP_USER;
          const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: sender, pass: process.env.LOCAL_SMTP_APP_PASSWORD },
            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            socketTimeout: 20_000,
            disableFileAccess: true,
            disableUrlAccess: true
          });
          try {
            const info = await transport.sendMail({
              from: { name: 'Anvitha Legal', address: sender },
              to: recipient,
              replyTo: appointment.email || undefined,
              subject: 'New appointment request | Anvitha Legal',
              text: mailText(appointment, locale)
            });
            const accepted = info.accepted?.some((address) => address.toLowerCase() === recipient);
            respond(
              request,
              response,
              accepted ? 200 : 503,
              accepted ? 'sent' : 'unavailable',
              locale
            );
          } catch (error) {
            logger.error(`Local appointment email failed: ${error.code ?? 'SMTP_ERROR'}`);
            respond(request, response, 503, 'unavailable', locale);
          } finally {
            transport.close();
          }
        });
      }
    }
  };
}
