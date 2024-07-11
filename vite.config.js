import { vitePluginForArco } from '@arco-plugins/vite-vue'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import visualizer from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vitePluginForArco({ theme: '@arco-themes/vue-boxy', style: true }),
    copy({
      targets: [
        { src: './src/assets/mimeng.png', dest: './dist' },
        { src: './src/assets/favicon.ico', dest: './dist' },
        { src: './src/assets/mimeng.png', dest: './dist' },
        { src: './node_modules/blockly/media/*', dest: './dist/media' },
        { src: 'NOTICE', dest: './dist' }
      ],
      hook: 'writeBundle'
    }),
    VitePWA({
      mode: 'production',
      base: '/',
      registerType: 'prompt',
      injectRegister: 'auto',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'boxy-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'LuaMaker',
        short_name: 'LuaMaker',
        description: 'This program built on Boxy.',
        theme_color: '#4062f6',
        start_url: './',
        id: 'LuaMaker',
        icons: [
          {
            src: 'mimeng.png',
            sizes: '512x512',
            purpose: 'any maskable'
          },
          {
            src: 'favicon.ico',
            sizes: '256x256'
          }
        ]
      }
    }),
    viteCompression({
      threshold: 1024 * 1024
    }),
    visualizer()
  ]
})
