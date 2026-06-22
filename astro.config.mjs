import { defineConfig } from 'astro/config';
import process from 'node:process';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  build: {
    inlineStylesheets: 'auto',
  },
});
