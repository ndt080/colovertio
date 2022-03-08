import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa"
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    mode: "development",
    base: "/",
    srcDir: "src",
    filename: "sw.ts",
    includeAssets: ["/favicon.png"],
    strategies: "injectManifest",
    manifest: {
      name: "Colovertio",
      short_name: "Colovertio",
      theme_color: "#161719",
      start_url: "/",
      display: "standalone",
      background_color: "#161719",
    },
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/main";`
      }
    }
  }
})
