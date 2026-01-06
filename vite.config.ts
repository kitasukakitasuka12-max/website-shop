
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Jika nama repo Anda bukan username.github.io, ganti '/' dengan '/nama-repo/'
  base: '/', 
  build: {
    outDir: 'dist',
  }
});
