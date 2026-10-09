import { appointmentLimits } from '../lib/appointment';

const fieldNames = ['name', 'email', 'phone', 'subject', 'query'] as const;
type FieldName = (typeof fieldNames)[number];
type Locale = 'en' | 'hi';
type FieldControl = HTMLInputElement | HTMLTextAreaElement;

const messages = {
  en: {
    nameRequired: 'Enter your name.',
    nameInvalid: 'Enter a valid name of 100 characters or fewer.',
    phoneRequired: 'Enter your mobile number.',
    phoneInvalid: 'Enter a valid 10-digit Indian mobile number. You can include +91.',
    emailInvalid: 'Enter a valid email address or leave this field blank.',
    subjectInvalid: 'Keep the subject within 120 characters.',
    queryRequired: 'Write your query or message.',
    queryInvalid: 'Keep your query within 3,000 characters.',
    review: 'Please correct the highlighted fields.',
    invalid: 'Please review your details and try again.',
    unavailable:
      'We could not send your request right now. Please try again or contact us by phone.',
    connection: 'Connection problem. Your request was not sent. Please try again.'
  },
  hi: {
    nameRequired: 'अपना नाम लिखें।',
    nameInvalid: 'सही नाम लिखें (अधिकतम 100 अक्षर)।',
    phoneRequired: 'अपना मोबाइल नंबर लिखें।',
    phoneInvalid: 'सही 10 अंकों का भारतीय मोबाइल नंबर लिखें। +91 भी लिख सकते हैं।',
    emailInvalid: 'सही ईमेल लिखें या यह स्थान खाली छोड़ दें।',
    subjectInvalid: 'विषय 120 अक्षरों से अधिक न हो।',
    queryRequired: 'अपना सवाल या संदेश लिखें।',
    queryInvalid: 'सवाल या संदेश 3,000 अक्षरों से अधिक न हो।',
    review: 'चिह्नित स्थानों में गलती ठीक करें।',
    invalid: 'अपनी जानकारी जाँचकर फिर कोशिश करें।',
    unavailable: 'अभी अनुरोध नहीं भेजा जा सका। फिर कोशिश करें या फ़ोन से संपर्क करें।',
    connection: 'कनेक्शन में समस्या है। आपका अनुरोध नहीं भेजा गया। फिर कोशिश करें।'
  }
} as const;

const serverFieldMessages: Record<Locale, Record<FieldName, string>> = {
  en: {
    name: 'Please check your name.',
    email: 'Please check your email address.',
    phone: 'Please check your mobile number.',
    subject: 'Please check the subject.',
    query: 'Please check your query or message.'
  },
  hi: {
    name: 'अपना नाम जाँचें।',
    email: 'अपना ईमेल पता जाँचें।',
    phone: 'अपना मोबाइल नंबर जाँचें।',
    subject: 'विषय जाँचें।',
    query: 'अपना सवाल या संदेश जाँचें।'
  }
};

function controlFor(form: HTMLFormElement, name: FieldName): FieldControl | null {
  const control = form.elements.namedItem(name);
  return control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement
    ? control
    : null;
}

function fieldError(name: FieldName, control: FieldControl, locale: Locale): string | null {
  const value = control.value.trim();
  const t = messages[locale];

  switch (name) {
    case 'name':
      if (!value) return t.nameRequired;
      return value.length > appointmentLimits.name || /[\x00-\x1f\x7f]/u.test(value)
        ? t.nameInvalid
        : null;
    case 'phone': {
      if (!value) return t.phoneRequired;
      let phone = value.replace(/[\s().-]+/gu, '');
      if (phone.startsWith('+91')) phone = phone.slice(3);
      else if (phone.startsWith('91') && phone.length === 12) phone = phone.slice(2);
      return value.length > appointmentLimits.phone || !/^[6-9][0-9]{9}$/u.test(phone)
        ? t.phoneInvalid
        : null;
    }
    case 'email':
      return value &&
        (value.length > appointmentLimits.email ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) ||
          control.validity.typeMismatch)
        ? t.emailInvalid
        : null;
    case 'subject':
      return value.length > appointmentLimits.subject || /[\x00-\x1f\x7f]/u.test(value)
        ? t.subjectInvalid
        : null;
    case 'query':
      if (!value) return t.queryRequired;
      return value.length > appointmentLimits.query ? t.queryInvalid : null;
  }
}

function showFieldError(control: FieldControl, message: string | null): void {
  const error = control
    .closest('.contact-field')
    ?.querySelector<HTMLElement>('.contact-field-error');
  if (!error) return;
  error.textContent = message ?? '';
  error.hidden = !message;
  if (message) control.setAttribute('aria-invalid', 'true');
  else control.removeAttribute('aria-invalid');
}

function showStatus(form: HTMLFormElement, message: string | null): void {
  const status = form.querySelector<HTMLElement>('.contact-form-status');
  if (!status) return;
  status.textContent = message ?? '';
  status.hidden = !message;
}

function validateForm(form: HTMLFormElement, locale: Locale): FieldControl | null {
  let firstInvalid: FieldControl | null = null;
  for (const name of fieldNames) {
    const control = controlFor(form, name);
    if (!control) continue;
    const error = fieldError(name, control, locale);
    showFieldError(control, error);
    if (error && !firstInvalid) firstInvalid = control;
  }
  return firstInvalid;
}

interface AppointmentResponse {
  result?: 'sent' | 'invalid' | 'unavailable';
  errors?: Record<string, string>;
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-appointment-form]')) {
  if (form.querySelector<HTMLFieldSetElement>('fieldset')?.disabled) continue;
  const locale: Locale = form.dataset.locale === 'hi' ? 'hi' : 'en';
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  let sending = false;

  // Native constraints remain available if JavaScript fails or is disabled.
  form.noValidate = true;

  form.addEventListener('input', (event) => {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;
    if (!control.hasAttribute('aria-invalid')) return;
    const name = fieldNames.find((field) => field === control.name);
    if (name) showFieldError(control, fieldError(name, control, locale));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    showStatus(form, null);
    const firstInvalid = validateForm(form, locale);
    if (firstInvalid) {
      showStatus(form, messages[locale].review);
      firstInvalid.focus();
      return;
    }

    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) {
      if (typeof value === 'string') body.append(key, value);
    }

    sending = true;
    if (submit) submit.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
        body
      });
      const data = (await response.json()) as AppointmentResponse;

      if (response.ok && data.result === 'sent') {
        window.location.assign(locale === 'hi' ? '/hi/appointment-sent' : '/appointment-sent');
        return;
      }

      if (response.status === 422 && data.result === 'invalid') {
        let firstServerInvalid: FieldControl | null = null;
        for (const name of fieldNames) {
          if (!data.errors?.[name]) continue;
          const control = controlFor(form, name);
          if (!control) continue;
          const message = fieldError(name, control, locale) ?? serverFieldMessages[locale][name];
          showFieldError(control, message);
          if (!firstServerInvalid) firstServerInvalid = control;
        }
        showStatus(form, firstServerInvalid ? messages[locale].review : messages[locale].invalid);
        firstServerInvalid?.focus();
        return;
      }

      showStatus(form, messages[locale].unavailable);
    } catch {
      showStatus(form, messages[locale].connection);
    } finally {
      sending = false;
      if (submit) submit.disabled = false;
    }
  });
}
