import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/': {
        target: 'https://f80595a281a1.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
