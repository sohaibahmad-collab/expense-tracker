import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/api"),
      "@api": path.resolve(__dirname, "src/api"),
       "@store": path.resolve(__dirname, "src/store"),
       "@Types": path.resolve(__dirname, "src/Types"),
    },
  },
})
