import Blockly from 'blockly'

import toolboxConfig from '../assets/toolbox.json'

/**
 * 给积木重写默认样式。
 * @param name 积木名称。
 * @param style 想要改成的样式。
 */
export function block_style(name, style) {
  // https://groups.google.com/g/blockly/c/byDoKnftEcc/m/qbaF9M8vBAAJ
  const savedIfInit = Blockly.Blocks[name].init
  Blockly.Blocks[name].init = function () {
    savedIfInit.bind(this)()
    this.setStyle(style)
    this.inputsInline = true
  }
}

// 摘取积木栏配置信息，自动生成补丁。
toolboxConfig['contents'].forEach(function (category) {
  if ('contents' in category) {
    let style = category['categorystyle']
    category['contents'].forEach(function (element) {
      if (element['kind'] === 'block') {
        block_style(element.type, style)
      }
    })
  } else {
    console.warn(
      '积木栏里面有的分类下是空的。',
      '如果你使用的是自定义积木块, ',
      '请给所有分类下都定义积木块以便统一格式。'
    )
  }
})
