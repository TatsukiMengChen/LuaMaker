import '@arco-design/web-vue/dist/arco.css'
import 'highlight.js/styles/atom-one-dark.css'

import { Modal } from '@arco-design/web-vue'
import highlight from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import lua from 'highlight.js/lib/languages/lua'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'
import { createApp } from 'vue'

import App from './App.vue'

hljs.registerLanguage('lua', lua)

const app = createApp(App)
const pinia = createPinia()

sessionStorage.setItem('input_cache', 'cache')
if (!localStorage.getItem('name')) {
  localStorage.setItem('name', '新的项目')
}

app.use(highlight)
app.use(pinia)
app.mount('#app')

if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      Modal.confirm({
        title: '注意',
        content: '当前版本有更新，请问是否立即更新。',
        okText: '确认',
        onOk: () => {
          updateSW(true)
        },
        onCancel: false,
        hideCancel: false
      })
    }
  })
}
