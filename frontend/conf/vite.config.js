// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: {
      key: '/localhost-key.pem',
      cert: '/localhost.pem',
    },
  },
});

