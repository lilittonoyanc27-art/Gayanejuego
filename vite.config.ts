import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5187 },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    rollupOptions: { output: { manualChunks: { three: ['three'], fiber: ['@react-three/fiber'] } } },
  },
});
