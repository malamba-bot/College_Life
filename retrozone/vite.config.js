import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RetroZone',
      fileName: 'retrozone',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['phaser'],
    },
  },
});
