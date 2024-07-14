<template>
  <a-trigger :trigger="['hover', 'click']" position="rt" v-model:popup-visible="visible">
    <div id="logo" @click="handleIconClick">
      <img alt="Logo" src="../assets/mimeng.png" width="36" height="36" />
    </div>
    <template #content>
      <div class="navigatorMenu">
        <a-doption @click="handleSaveClick">下载工程文件</a-doption>
        <a-doption @click="handleOpenClick">打开工程文件</a-doption>
        <a-doption @click="handleOutputClick">导出lua</a-doption>
        <a-divider margin="1px" />
        <a-doption @click="handleSearchClick">查找</a-doption>
        <a-divider margin="1px" />
        <a-doption @click="handleOptionsClick">设置</a-doption>
        <a-doption @click="handleGuideClick">手册</a-doption>
      </div>
    </template>
  </a-trigger>
  <Settings ref="modal1" />
  <!--<a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="Confirm" cancelText="Exit" unmountOnClose>
    <template #title>
      创建新项目
    </template>
    <a-input :style="{width:'320px'}" placeholder="起个名字吧~" allow-clear />
  </a-modal>-->
</template>

<script setup>
import { Message, Notification } from '@arco-design/web-vue'
import Blockly from 'blockly'
import LZString from 'lz-string'
import { ref } from 'vue'

import { useStore } from '../store/store'
import Settings from './Settings.vue'

const visible = ref()
const modal1 = ref()
const store = useStore()

function handleIconClick() {
  Blockly.hideChaff()
}

function handleSaveClick() {
  if (store.workspaceSvg.getAllBlocks().length === 0) {
    Notification.warning('工作区空空如也，没有工程进行中哦，尝试拼几块积木吧！')
    return
  }
  try {
    const json = Blockly.serialization.workspaces.save(store.workspaceSvg)
    const text = LZString.compressToUTF16(JSON.stringify(json))
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = localStorage.getItem('name') + '.luamaker'
    anchor.click()
  } catch (err) {
    Notification.error('导出工程文件时发生错误：' + err)
  } finally {
    visible.value = false
  }
}

function handleOutputClick() {
  if (store.workspaceSvg.getAllBlocks().length === 0) {
    Notification.warning('工作区空空如也，没有东西可以导出为Lua，尝试拼几块积木吧！')
    return
  }
  try {
    const json = Blockly.serialization.workspaces.save(store.workspaceSvg)
    const text = JSON.stringify(json)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = localStorage.getItem('name') + '.lua'
    anchor.click()
  } catch (err) {
    Notification.error('导出Lua文件时发生错误：' + err)
  } finally {
    visible.value = false
  }
}

function handleOpenClick() {
  try {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('name', 'file')
    input.setAttribute('visibility', 'hidden')
    input.setAttribute('accept', '.luamaker')
    input.addEventListener('change', function () {
      const file = this.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', function () {
        const json = JSON.parse(LZString.decompressFromUTF16(this.result))
        //const json = JSON.parse(this.result)
        Blockly.serialization.workspaces.load(json, store.workspaceSvg)
        localStorage.setItem('now', JSON.stringify(json))
      })
      reader.readAsText(file)
    })
    input.click()
  } catch (err) {
    Notification.error('打开本地工程文件时发生错误：' + err)
  } finally {
    visible.value = false
  }
}

function handleSearchClick() {
  store.searchOpen = true
  visible.value = false
}

function handleOptionsClick() {
  modal1.value.handleClick()
  visible.value = false
}
function handleGuideClick() {
  //window.open('https://www.yuque.com/shulinnn/luamaker')
  Message.warning('手册编写中，敬请期待~')
  visible.value = false
}
</script>

<style>
#logo {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;

  width: 36px;
  height: 36px;
  padding: 17px;

  background-color: var(--color-bg-2);
}

.navigatorMenu {
  overflow: hidden;

  box-sizing: border-box;
  padding: 12px 16px;

  font-size: 14px;
  line-height: 1.5715;
  color: var(--color-text-2);

  background-color: var(--color-bg-popup);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 -2px 5px rgb(0 0 0 / 10%);

  animation: show-dropdown cubic-bezier(0.3, 1.3, 0.3, 1) 500ms forwards !important;

  > li {
    -webkit-tap-highlight-color: transparent;
  }
}

@keyframes show-dropdown {
  0% {
    width: 0;
    height: 0;
  }

  100% {
    width: 150px;
    height: 245px;
  }
}
</style>
