import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0',
    port: 5173, // 可調整 port
     allowedHosts: [
      '9b7e-111-250-32-88.ngrok-free.app', // ✅ 把你的 ngrok 網址加進來
    ],
  }
})
