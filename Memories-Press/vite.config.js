import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Memories-Press-React/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // Proxy WP REST API calls to avoid CORS
      '/wp-json': {
        target: 'https://ttr.laz.mybluehost.me/website_f71474e4',
        changeOrigin: true,
        secure: false,
      },
      // Proxy uploads folder (media files)
      '/wp-content/uploads': {
        target: 'https://ttr.laz.mybluehost.me/website_f71474e4',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/wp-content\/uploads/, '/wp-content/uploads')
      }
    }
  }
})
