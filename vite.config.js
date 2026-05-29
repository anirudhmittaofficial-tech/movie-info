import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect all 404s back to index.html so React Router
    // can handle client-side routes on page refresh.
    historyApiFallback: true,
  },
})
