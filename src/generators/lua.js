/* eslint-disable */

import { luaGenerator, Order } from 'blockly/lua'
import apis from '../assets/api.json'
import Events from '../assets/events.json'

function isInteger(str) {
  return /^\d+$/.test(str)
}

luaGenerator.forBlock['controls_forever'] = function (block, generator) {
  const branch = generator.statementToCode(block, 'DO')
  return 'while true do\n' + branch + 'end\n'
}

luaGenerator.forBlock['math_evenly_divisible'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'DIVIDEND', Order.MODULUS) || '0'
  const argument2 = generator.valueToCode(block, 'DIVISOR', Order.MODULUS) || '0'
  return [argument1 + ' % ' + argument2 + ' === 0', Order.NONE]
}

luaGenerator.forBlock['text_charAt'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || "''"
  let argument2, code
  argument2 = generator.valueToCode(block, 'INDEX', Order.FUNCTION_CALL) || '1'
  if (block.getFieldValue('WHERE') === 'FROM_START') {
    argument2 = isInteger(argument2) ? String(Number(argument2) - 1) : argument2 + ' - 1'
    code = argument1 + '.charAt(' + argument2 + ')'
  } else if (block.getFieldValue('WHERE') === 'FROM_END') {
    code = argument1 + '.slice(-' + argument2 + ').charAt(0)'
  }
  return [code, Order.NONE]
}

luaGenerator.forBlock['text_getSubstring'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || "''"
  let argument2, argument3
  argument2 = generator.valueToCode(block, 'INDEX1', Order.FUNCTION_CALL) || '1'
  argument3 = generator.valueToCode(block, 'INDEX2', Order.FUNCTION_CALL) || '1'
  if (block.getFieldValue('WHERE1') === 'FROM_START') {
    argument2 = isInteger(argument2) ? String(Number(argument2) - 1) : argument2 + ' - 1'
  } else if (block.getFieldValue('WHERE1') === 'FROM_END') {
    argument2 = argument1 + '.length - ' + argument2
  }
  if (block.getFieldValue('WHERE2') === 'FROM_END') {
    argument3 = isInteger(argument3) ? String(Number(argument3) - 1) : '(' + argument3 + ' - 1)'
    argument3 = argument1 + '.length - ' + argument3
  }
  return [argument1 + '.slice(' + argument2 + ' ,' + argument3 + ')', Order.NONE]
}

luaGenerator.forBlock['math_types'] = function (block, generator) {
  const map = {
    STRING: 'String',
    NUMBER: 'Number',
    BOOLEAN: 'Boolean'
  }
  const argument1 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || ''
  return [map[block.getFieldValue('TYPE')] + '(' + argument1 + ')', Order.NONE]
}

luaGenerator.forBlock['lists_push'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || ''
  const argument2 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  return argument2 + '.push(' + argument1 + ')'
}

luaGenerator.forBlock['lists_insert'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || 'null'
  const argument2 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  let argument3 = generator.valueToCode(block, 'INDEX', Order.ADDITION) || '1'
  if (block.getFieldValue('WHERE') === 'FROM_START') {
    argument3 = isInteger(argument3) ? String(Number(argument3) - 1) : argument3 + '- 1'
  } else if (block.getFieldValue('WHERE') === 'FROM_END') {
    argument3 = argument2 + '.length - ' + argument3
  }
  return argument2 + '.splice(' + argument3 + ', 0, ' + argument1 + ')'
}

luaGenerator.forBlock['lists_delete'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  let argument2 = generator.valueToCode(block, 'INDEX', Order.ADDITION) || '1'
  if (generator.valueToCode(block, 'WHERE', Order.ADDITION) === 'FROM_START') {
    argument2 = isInteger(argument2) ? String(Number(argument2) - 1) : argument2 + ' - 1'
  } else if (generator.valueToCode(block, 'WHERE', Order.ADDITION) === 'FROM_END') {
    argument2 = argument1 + '.length - ' + argument2
  }
  return argument1 + '.splice(' + argument2 + ', 1)'
}

luaGenerator.forBlock['lists_set'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  const argument3 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || 'null'
  let argument2 = generator.valueToCode(block, 'INDEX', Order.ADDITION) || '1'
  if (block.getFieldValue('WHERE') === 'FROM_START') {
    argument2 = isInteger(argument2) ? String(Number(argument2) - 1) : argument2 + ' - 1'
  } else if (block.getFieldValue('WHERE') === 'FROM_END') {
    argument2 = argument1 + '.length - ' + argument2
  }
  return argument1 + '[' + argument2 + '] = ' + argument3
}

luaGenerator.forBlock['lists_get'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  let argument2 = generator.valueToCode(block, 'INDEX', Order.ADDITION) || '1'
  if (block.getFieldValue('WHERE') === 'FROM_START') {
    argument2 = isInteger(argument2) ? String(Number(argument2) - 1) : argument2 + ' - 1'
  } else if (block.getFieldValue('WHERE') === 'FROM_END') {
    argument2 = argument1 + '.length - ' + argument2
  }
  return [argument1 + '[' + argument2 + ']', Order.NONE]
}

luaGenerator.forBlock['lists_index'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  const argument2 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || "''"
  let code
  if (block.getFieldValue('WHICH') === 'FIRST') {
    code = argument1 + '.indexOf(' + argument2 + ') + 1'
  } else if (block.getFieldValue('WHICH') === 'LAST') {
    code = argument1 + '.lastIndexOf(' + argument2 + ') + 1'
  }
  return [code, Order.NONE]
}

luaGenerator.forBlock['lists_includes'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'LIST', Order.ADDITION) || '[]'
  const argument2 = generator.valueToCode(block, 'VALUE', Order.ADDITION) || "''"
  return [argument1 + '.contains(' + +argument2 + ')', Order.NONE]
}

luaGenerator.forBlock['makefunction'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'event', Order.ATOMIC)
  const argument2 = generator.statementToCode(block, 'boxy', Order.ATOMIC)
  return [
    'ScriptSupportEvent:registerEvent(' + argument1 + ',function(e)\n' + argument2 + 'end)\n'
  ].join('')
}

luaGenerator.forBlock['print'] = function (block, generator) {
  const argument1 = generator.valueToCode(block, 'output', Order.ATOMIC)
  return ['print(' + argument1 + ')\n'].join('')
}

//事件遍历
for (let i in Events) {
  for (let j in Events[i].events) {
    for (let k in Events[i].events[j][2]) {
      luaGenerator.forBlock[
        Events[i].events[j][0].replace(/\./g, '_') + '_' + Events[i].events[j][2][k][0]
      ] = function (block) {
        //事件参数积木
        const argument1 = Events[i].events[j][2][k][0]
        var code = `"e.${argument1}"`
        return [code, Order.ATOMIC]
      }
    }
    luaGenerator.forBlock['Event_' + Events[i].events[j][0].replace(/\./g, '_')] = function (
      block
    ) {
      const argument1 = block.type.substring(block.type.indexOf('_') + 1).replace(/_/g, '.')
      var code = `"${argument1}"`
      return [code, Order.ATOMIC]
    }
  }
}

//接口遍历
for (let i in apis) {
  for (let j in apis[i].functions) {
    luaGenerator.forBlock[apis[i].class + '_' + apis[i].functions[j].name] = function (
      block,
      generator
    ) {
      const argument1 = block.getFieldValue('ret')
      if (apis[i].functions[j].parm.length > 0) {
        var b = []
        for (let k in apis[i].functions[j].parm) {
          if (apis[i].functions[j].parm[k].type == 'function') {
            var d =
              generator.statementToCode(block, apis[i].functions[j].parm[k].key, Order.ATOMIC) ||
              'nil'
            b.push(`(function(code)\n${d}end)`)
          } else {
            var d =
              generator.valueToCode(block, apis[i].functions[j].parm[k].key, Order.ATOMIC) || 'nil'
            b.push(d)
          }
        }
        if (argument1 == 'TRUE') {
          var ret = []
          for (let k in apis[i].functions[j].ret) {
            var name = apis[i].functions[j].name + '_' + apis[i].functions[j].ret[k].key
            ret.push(generator.getVariableName(block.getFieldValue(name)))
          }
          return (
            'local ' +
            (ret.length > 1 ? ret.join(',') : ret[0]) +
            ' = ' +
            apis[i].class +
            ':' +
            apis[i].functions[j].name +
            '(' +
            (b.length > 1 ? b.join(',') : b[0]) +
            ')\n'
          )
        } else if (argument1 == 'FALSE') {
          return (
            apis[i].class +
            ':' +
            apis[i].functions[j].name +
            '(' +
            (b.length > 1 ? b.join(',') : b[0]) +
            ')\n'
          )
        }
      } else {
        if (argument1 == 'TRUE') {
          var ret = []
          for (let k in apis[i].functions[j].ret) {
            var name = apis[i].functions[j].name + '_' + apis[i].functions[j].ret[k].key
            ret.push(generator.getVariableName(block.getFieldValue(name)))
          }
          return (
            'local ' +
            (ret.length > 1 ? ret.join(',') : ret[0]) +
            ' = ' +
            apis[i].class +
            ':' +
            apis[i].functions[j].name +
            '()\n'
          )
        } else if (argument1 == 'FALSE') {
          return apis[i].class + ':' + apis[i].functions[j].name + '()\n'
        }
      }
    }
  }
}
/*
if (mod==1) {
  for (let i in apis) {
    if (apis[i].Type!="类型备注") {
      console.log(apis[i].FunctionName)
      luaGenerator.forBlock[apis[i].Type+"_" + apis[i].FunctionName] = function(block, generator) {
        return apis[i].Type+":" + apis[i].FunctionName + "()\n";
      }
    }
  }
} else if(mod==2){
  
}*/

luaGenerator.forBlock['eventlistener'] = function (block, generator) {
  const argument1 = block.getFieldValue('ToFunction') || 'boxy'
  const argument2 = generator.valueToCode(block, 'event', Order.ATOMIC)
  return ['ScriptSupportEvent:registerEvent(' + argument2 + ',' + argument1 + ')\n'].join('')
}

//自定义代码
luaGenerator.forBlock['diy_lua_1'] = function (block, generator) {
  return block.getFieldValue('DIY1')
}
luaGenerator.forBlock['diy_lua_2'] = function (block, generator) {
  return block.getFieldValue('DIY2')
}
/*
luaGenerator.forBlock['setorderdatabykey'] = function(block, generator) {
  const argument1 = generator.valueToCode(block, 'libvarname', Order.ATOMIC)
  const argument2 = generator.valueToCode(block, 'key', Order.ATOMIC)
  const argument3 = generator.valueToCode(block, 'value', Order.ATOMIC)
  return ['CloudSever:setOrderDataBykey(' + argument1 + ',' + argument2 + ',' + argument3 + ')\n'].join("");
}

luaGenerator.forBlock['removeorderdatabykey'] = function(block, generator) {
  const argument1 = generator.valueToCode(block, 'libvarname', Order.ATOMIC)
  const argument2 = generator.valueToCode(block, 'key', Order.ATOMIC)
  return ['CloudSever:removeorderdatabykey(' + argument1 + ',' + argument2 + ')\n'].join("");
}*/
