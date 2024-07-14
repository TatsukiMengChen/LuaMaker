import Blockly from 'blockly'

import apis from '../assets/api.json'
import Events from '../assets/events.json'

for (let i in Events) {
  for (let j in Events[i].events) {
    for (let k in Events[i].events[j][2]) {
      var parmname = Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0]
      Blockly.Blocks[parmname] = {
        init: function () {
          if (Events[i].events[j][2][k][1] == '' || !Events[i].events[j][2][k][1])
            this.appendDummyInput().appendField(Events[i].events[j][2][k][0])
          else {
            this.appendDummyInput().appendField(Events[i].events[j][2][k][1])
          }
          this.setInputsInline(true)
          this.setOutput(true, 'eventparm')
          this.setColour('#3B818C')
          this.setTooltip('')
          this.setHelpUrl('')
        }
      }
    }
    let eventKey = 'Event_' + Events[i].events[j][0].replace(/\./g, '_') // 在闭包中使用新的变量存储替换后的事件键名
    Blockly.Blocks[eventKey] = {
      init: function () {
        this.appendDummyInput().appendField(Events[i].events[j][1])
        /*for (let k in Events[i].events[j][2]) {
          console.log('INPUT' + Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0])
          this.appendValueInput('INPUT' + Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0]).setCheck(
            'eventparm'
          )
        }*/
        /*var defaultBlock = this.workspace.newBlock(
          Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0]
        )
        defaultBlock.initSvg()
        defaultBlock.render()
        var connection = this.getInput(Events[i].events[j][0].replace(/\./g, '_') + k).connection
        connection.connect(defaultBlock.outputConnection)
        this.setOnChange(function (e) {
          //console.log(e)
          if (
            e.type == Blockly.Events.BLOCK_CHANGE &&
            e.blockId == this.id &&
            !this.getInput(Events[i].events[j][0].replace(/\./g, '_') + k).connection
              .targetConnection[k]
          ) {
            console.log(Events[i].events[j][0].replace(/\./g, '_') + k)
            var newBlock = this.workspace.newBlock(
              Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0]
            )
            newBlock.initSvg()
            newBlock.render()
            this.getInput(Events[i].events[j][0].replace(/\./g, '_') + k).connection.connect(
              newBlock.outputConnection
            )
          }
        })
      }*/
        this.setInputsInline(true)
        this.setOutput(true, 'event')
        this.setColour('#3B818C')
        //this.setPreviousStatement(true, null);
        this.setHelpUrl('https://dev-wiki.mini1.cn/cyclopdeia?wikiMenuId=3&wikiId=1353')
        //this.setNextStatement(true, null);
      }
    }
  }
}

for (let i in apis) {
  for (let j in apis[i].functions) {
    var apiss = apis[i].class + '_' + apis[i].functions[j].name
    Blockly.Blocks[apiss] = {
      init: function () {
        this.appendDummyInput().appendField(apis[i].functions[j].desc)
        if (apis[i].functions[j].parm.length > 0) {
          for (let k in apis[i].functions[j].parm) {
            if (apis[i].functions[j].parm[k].name == '') {
              if (apis[i].functions[j].parm[k].type == 'function') {
                this.appendStatementInput(apis[i].functions[j].parm[k].key)
                  .setCheck(null)
                  .appendField(apis[i].functions[j].parm[k].key)
              } else {
                this.appendValueInput(apis[i].functions[j].parm[k].key)
                  .setCheck(apis[i].functions[j].parm[k].type)
                  .appendField(String(apis[i].functions[j].parm[k].key))
              }
            } else {
              if (apis[i].functions[j].parm[k].type == 'function') {
                this.appendStatementInput(apis[i].functions[j].parm[k].key)
                  .setCheck(null)
                  .appendField(apis[i].functions[j].parm[k].name)
              } else {
                this.appendValueInput(apis[i].functions[j].parm[k].key)
                  .setCheck(apis[i].functions[j].parm[k].type)
                  .appendField(String(apis[i].functions[j].parm[k].name))
              }
            }
          }
        }
        if (apis[i].functions[j].ret.length > 0) {
          this.appendDummyInput()
            .appendField('获取返回值')
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'ret')
          for (let k in apis[i].functions[j].ret) {
            if (apis[i].functions[j].ret[k].name == '') {
              this.appendDummyInput(apis[i].functions[j].ret[k].key)
                .appendField(apis[i].functions[j].ret[k].key)
                .appendField(
                  new Blockly.FieldVariable(apis[i].functions[j].ret[k].key),
                  apis[i].functions[j].name + '_' + apis[i].functions[j].ret[k].key
                )
            } else {
              this.appendDummyInput(apis[i].functions[j].ret[k].key)
                .appendField(apis[i].functions[j].ret[k].name)
                .appendField(
                  new Blockly.FieldVariable(apis[i].functions[j].ret[k].key),
                  apis[i].functions[j].name + '_' + apis[i].functions[j].ret[k].key
                )
            }
          }
        }
        this.setInputsInline(false)
        this.setColour('#2F90B9')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        //this.setHelpUrl("https://dev-wiki.mini1.cn/cyclopdeia?wikiMenuId=3&wikiId="+(1355+i)+"#"+apis[i].functions[j].name);
      } /*,
      onchange: function() {
        if (this.getFieldValue('ret')=='TRUE'){
          for (let l in apis[i].functions[j].ret) {
            if(!this.getInput(apis[i].functions[j].ret[l].key)){
              console.info(this.getFieldValue('ret'))
              if (apis[i].functions[j].ret[l].name==""){
                this.appendDummyInput(apis[i].functions[j].ret[l].key)
                  .appendField(apis[i].functions[j].ret[l].key)
                  .appendField(new Blockly.FieldVariable(apis[i].functions[j].ret[l].key), apis[i].functions[j].name+"_"+apis[i].functions[j].ret[l].key);
              }else{
                this.appendDummyInput(apis[i].functions[j].ret[l].key)
                  .appendField(apis[i].functions[j].ret[l].name)
                  .appendField(new Blockly.FieldVariable(apis[i].functions[j].ret[l].key), apis[i].functions[j].name+"_"+apis[i].functions[j].ret[l].key);
              }
            }else{continue}
          }
        } else if(this.getFieldValue('ret')=='FALSE'){
          for (let l in apis[i].functions[j].ret) {
            if(this.getInput(apis[i].functions[j].ret[l].key)){
              this.removeInput(apis[i].functions[j].ret[l].key);
            }else{continue}
          }
        }
      },
      onclick: function() {
        
      }*/
    }
    /*
    if (apis[i].functions[j].ret.length>0){
      //UIHook的过程块
      Blockly.Blocks['revalue'] = {
        init: function() {
          this.appendDummyInput().appendField("返回值");
          for (let re in apis[i].functions[j].ret) {
            this.appendValueInput("choose"+re).setCheck(null);
          }
          this.setInputsInline(false);
          this.setColour('#93B5CF');
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      //UIHook的值块
      for (let k in apis[i].functions[j].ret) {
        Blockly.Blocks[apis[i].functions[j].ret[k].key] = {
          init: function() {
            this.appendDummyInput().appendField(new Blockly.FieldLabelSerializable("状态码"), "code");
            this.setOutput(true, "Number");
            this.setColour('#93B5CF');
         this.setTooltip("");
         this.setHelpUrl("");
          }
        };
      }
    }*/
  }
}

Blockly.defineBlocksWithJsonArray([
  {
    type: 'controls_forever',
    message0: '%1',
    args0: [
      {
        type: 'field_label',
        text: '永远 循环'
      }
    ],
    message1: '%1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'controller',
    tooltip: '重复执行。'
  },
  {
    type: 'math_evenly_divisible',
    message0: '%1 能被 %2 整除',
    args0: [
      {
        type: 'input_value',
        name: 'DIVIDEND',
        check: 'Number',
        value: 0
      },
      {
        type: 'input_value',
        name: 'DIVISOR',
        check: 'Number',
        value: 0
      }
    ],
    output: 'Boolean',
    style: 'calculation',
    tooltip: '判断第一个数是否恰好被第二个数整除。'
  },
  {
    type: 'lists_split',
    message0: '把 %1 按 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'INPUT',
        check: ['String', 'Array']
      },
      {
        type: 'input_value',
        name: 'DELIM',
        check: 'String'
      },
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['分开成列表', 'SPLIT'],
          ['合并为文本', 'JOIN']
        ]
      }
    ],
    output: ['String', 'Array'],
    style: 'calculation',
    tooltip: '将文本分开成列表或将列表合并为文本。'
  },
  {
    type: 'text_charAt',
    message0: '取 %1 %2 第 %3 个字符',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX',
        check: 'Number'
      }
    ],
    output: 'String',
    style: 'calculation',
    tooltip: '取文本指定位置的字符。'
  },
  {
    type: 'text_getSubstring',
    message0: '取 %1 %2 第 %3 到 %4 第 %5 个字符',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE1',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX1',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE2',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX2',
        check: 'Number'
      }
    ],
    output: 'String',
    style: 'calculation',
    tooltip: '取文本指定位置的字符。'
  },
  {
    type: 'math_types',
    message0: '把 %1 转换为 %2 类型',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE'
      },
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ['字符串', 'STRING'],
          ['数值', 'NUMBER'],
          ['布尔', 'BOOLEAN']
        ]
      }
    ],
    output: 'String',
    style: 'calculation',
    tooltip: '将对象转换为指定类型。'
  },
  {
    type: 'lists_push',
    message0: '添加 %1 到 %2 末尾',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'lists',
    tooltip: '添加值到列表的末尾。'
  },
  {
    type: 'lists_insert',
    message0: '插入 %1 到 %2 %3 第 %4 项后面',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE'
      },
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'lists',
    tooltip: '添加值到列表的末尾。'
  },
  {
    type: 'lists_delete',
    message0: '删除 %1 %2 第 %3 项',
    args0: [
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'lists_delete',
    tooltip: '删除列表的指定项。'
  },
  {
    type: 'lists_set',
    message0: '替换 %1 %2 第 %3 项为 %4',
    args0: [
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX',
        check: 'Number'
      },
      {
        type: 'input_value',
        name: 'VALUE'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'lists',
    tooltip: '替换列表的指定项。'
  },
  {
    type: 'lists_get',
    message0: '%1 %2 第 %3 项',
    args0: [
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['正数', 'FROM_START'],
          ['倒数', 'FROM_END']
        ]
      },
      {
        type: 'input_value',
        name: 'INDEX',
        check: 'Number'
      }
    ],
    output: 'Any',
    style: 'lists',
    tooltip: '获取列表的指定项。'
  },
  {
    type: 'lists_index',
    message0: '%1 中 %2 %3 的位置',
    args0: [
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'field_dropdown',
        name: 'WHICH',
        options: [
          ['第一个', 'FIRST'],
          ['最后一个', 'LAST']
        ]
      },
      {
        type: 'input_value',
        name: 'VALUE'
      }
    ],
    output: 'Number',
    style: 'lists',
    tooltip: '返回在列表中的第一个/最后一个匹配项的索引值，如果找不到项目则返回列表本身。'
  },
  {
    type: 'lists_includes',
    message0: '%1 中包含 %2',
    args0: [
      {
        type: 'input_value',
        name: 'LIST',
        check: 'Array'
      },
      {
        type: 'input_value',
        name: 'VALUE'
      }
    ],
    output: 'Boolean',
    style: 'lists',
    tooltip: '列表中是否包含指定项。'
  },
  {
    type: 'makefunction',
    message0: '触发器 %1 事件 %2 执行 %3',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'event',
        check: 'event'
      },
      {
        type: 'input_statement',
        name: 'boxy'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '用于新建一个触发器',
    helpUrl: ''
  },
  {
    type: 'diy_lua_1',
    message0: '代码 %1',
    args0: [
      {
        type: 'field_input',
        name: 'DIY1',
        text: 'print("hello")'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'diy_lua_2',
    message0: '代码 %1',
    args0: [
      {
        type: 'field_input',
        name: 'DIY2',
        text: 'print("hello")'
      }
    ],
    output: null,
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'eventlistener',
    message0: '注册监听器，让函数 %1 监听事件 %2',
    args0: [
      {
        type: 'field_input',
        name: 'ToFunction',
        text: 'boxy'
      },
      {
        type: 'input_value',
        name: 'event',
        check: 'event'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '当事件时执行指定触发器',
    helpUrl: ''
  },
  {
    type: 'print',
    message0: '在控制台打印 %1',
    args0: [
      {
        type: 'input_value',
        name: 'output'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '',
    helpUrl: ''
  }
])
