// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@stacks/network'], // Add other @stacks packages you're using
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});