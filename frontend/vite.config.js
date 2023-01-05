import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from "node:path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8830,
    host: "192.168.200.51",
    proxy: {
        "/api": {
            target: "http://192.168.200.51:8870/",
            changeOrigin: true,
            pathRewrite: {
                "^/": "/"
            }
        },
    }
  },
})


