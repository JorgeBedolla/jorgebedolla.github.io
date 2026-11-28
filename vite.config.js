import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ruta base relativa para compatibilidad con subrutas de GitHub Pages (ej. /Portafolio/)
  base: './',
});

