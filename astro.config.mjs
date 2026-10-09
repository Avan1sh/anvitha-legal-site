import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import localAppointment from './src/server/localAppointment.mjs';

const localEnvFile = fileURLToPath(new URL('./.env.local', import.meta.url));
if (existsSync(localEnvFile)) process.loadEnvFile(localEnvFile);

export default defineConfig({
  integrations: [react(), localAppointment()],
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false }
  }
});
