const configuredRetention = Number(import.meta.env.PUBLIC_APPOINTMENT_RETENTION_DAYS);

export const appointmentRetentionDays =
  Number.isSafeInteger(configuredRetention) &&
  configuredRetention >= 1 &&
  configuredRetention <= 3650
    ? configuredRetention
    : null;

export const appointmentFormEnabled =
  import.meta.env.PUBLIC_APPOINTMENTS_ENABLED === 'true' &&
  import.meta.env.PUBLIC_APPOINTMENT_PRIVACY_APPROVED === 'true' &&
  appointmentRetentionDays !== null;
