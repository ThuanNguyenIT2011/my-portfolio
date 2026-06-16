import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Thay '<REPO_NAME>' bằng tên repository GitHub của bạn trước khi deploy
// Ví dụ: REPO_NAME = 'my-portfolio' → base: '/my-portfolio/'
const REPO_NAME = 'my-portfolio'

export default defineConfig({
  plugins: [react()],
  // Khi build production dùng sub-path của GitHub Pages
  // Khi dev local dùng '/' để fetch JSON hoạt động đúng
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
})
