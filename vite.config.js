import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    maxHeaderSize: 8192, // or your preferred value
  },
  plugins: [react()],
});
