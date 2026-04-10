import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Elcardo-Website/',
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Skip compressed size reporting for faster builds
    reportCompressedSize: false,
    // Split heavy libraries into separate cached chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js + R3F ecosystem (~800KB) — cached separately
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          // Animation libraries (~200KB) — cached separately
          'vendor-motion': ['framer-motion'],
          // GSAP + Lenis (~100KB) — cached separately
          'vendor-scroll': ['gsap', 'lenis'],
          // React core (~140KB) — rarely changes, cached long-term
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
