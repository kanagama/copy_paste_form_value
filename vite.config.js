import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    root: './',
    build: {
      outDir: './js',
      emptyOutDir: false,
      rollupOptions: {
        input: {
          content: resolve(__dirname, './js/content/content.js'),
        },
        output: {
          entryFileNames: '[name].js',
          inlineDynamicImports: true,
          format: 'iife',
        },
      },
    },
  };
});
