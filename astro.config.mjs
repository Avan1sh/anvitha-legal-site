import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false }
  }
});
