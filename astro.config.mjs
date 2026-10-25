import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://villacarissa-samanah.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  redirects: {
    '/voyage-golfique-maroc': '/voyage-golfique-a-marrakech/',
    '/villa-carissa-a-samanah': '/',
  },
});
