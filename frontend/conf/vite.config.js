// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: {
      key: '/ssl-keys-shared/localhost-key.pem',
      cert: '/ssl-keys-shared/localhost.pem',
    },
  },
});

