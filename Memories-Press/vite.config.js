import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/memories-press/',
  // base: 'https://demo.meza.design/memories-press/', // Try this one if the line above does not work.
  plugins: [react()],
})
