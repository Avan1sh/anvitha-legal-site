const privacyReady =
  import.meta.env.PUBLIC_APPOINTMENT_PRIVACY_APPROVED === 'true' &&
  import.meta.env.PUBLIC_APPOINTMENT_RETENTION_POLICY === 'purpose';

export const localAppointmentPreviewReady =
  privacyReady && import.meta.env.DEV && import.meta.env.LOCAL_APPOINTMENT_DELIVERY === 'preview';

export const localAppointmentSmtpReady =
  privacyReady &&
  import.meta.env.DEV &&
  import.meta.env.LOCAL_APPOINTMENT_DELIVERY === 'smtp' &&
  Boolean(import.meta.env.LOCAL_SMTP_USER) &&
  Boolean(import.meta.env.LOCAL_SMTP_APP_PASSWORD);

export const appointmentFormEnabled =
  privacyReady &&
  (import.meta.env.DEV
    ? localAppointmentPreviewReady || localAppointmentSmtpReady
    : import.meta.env.PUBLIC_APPOINTMENTS_ENABLED === 'true');
