<template>
  <a-layout>
    <a-layout-content>
      <Workspace />
      <Search />
      <Toolbox />
      <Zoombox />
    </a-layout-content>
    <a-layout-sider ref="layoutSider" :resize-directions="['left']" @moving="handleMoving" @moving-end="handleMoving">
      <Codespace />
    </a-layout-sider>
  </a-layout>
  <Navigator />
  <Trashcan />
  <Screenshot />
  <Dialog />
</template>

<script setup>
import './assets/categories'
import './blocks/boxy'
import './blocks/patch'
import './theme/codemao.theme'
import './theme/codemao.renderer'
import './generators/lua'

import { Message, Modal, Notification } from '@arco-design/web-vue'
import Blockly from 'blockly'
import cookie from 'cookiejs'
import { onMounted, ref, watch } from 'vue'

import tools from './assets/tools'
import Codespace from './components/Codespace.vue'
import Dialog from './components/Dialog.vue'
import Navigator from './components/Navigator.vue'
import Screenshot from './components/Screenshot.vue'
import Search from './components/Search.vue'
import Toolbox from './components/Toolbox.vue'
import Trashcan from './components/Trashcan.vue'
import Workspace from './components/Workspace.vue'
import Zoombox from './components/Zoombox.vue'
import { useStore } from './store/store'

let usedLayoutSider = void 0
const layoutSider = ref()
const store = useStore()

function handleMoving() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      Blockly.svgResize(store.workspaceSvg)
    }, 100 * i)
  }
}

function setLayoutSider(isOpen = false) {
  layoutSider.value.$el.style.display = isOpen ? 'block' : 'none'
  handleMoving()
}

onMounted(() => {
  if (!localStorage.getItem('now')) {
    try {
      Blockly.serialization.workspaces.load(
        JSON.parse(localStorage.getItem('now')),
        store.workspaceSvg
      )
    } catch (e) {
      if (localStorage.getItem('now') != '{}') {
        localStorage.setItem(new Date().getTime(), localStorage.getItem('now'))
        Notification.error('加载本地缓存工程失败，数据已自动备份')
      }
    }
  }
  const tool = new tools()
  if (!tool.ifStorage) {
    Notification.error('当前环境不支持HTML5 web 存储（Storage）服务，项目的本地缓存功能将会受限')
  }
  window.addEventListener('beforeunload', (e) => {
    if (
      JSON.stringify(Blockly.serialization.workspaces.save(store.workspaceSvg)) !=
      localStorage.getItem('now')
    ) {
      const message = '离开页面后未保存的更改将丢失，确定继续？'
      e.returnValue = message
      return message
    }
  })
  watch(
    store.$state,
    (state) => {
      if (state.hasLayoutSider !== usedLayoutSider) {
        setLayoutSider(state.hasLayoutSider)
        usedLayoutSider = state.hasLayoutSider
      }
    },
    { deep: true }
  )
  handleMoving()
  setLayoutSider()
})
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  background: var(--color-bg-1);
  border: 0;
}

::selection {
  background: #1ba2e333;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
