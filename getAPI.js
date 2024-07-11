/* eslint-disable */

//解析table标签
function tableToJson(table) {
  var data = []
  // 遍历表格的每一行
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i]
    // 创建一个数组来保存该行的数据
    var rowData = []
    // 遍历该行的每一列
    for (var j = 0; j < row.cells.length; j++) {
      console.warn(i + '列长度：' + row.cells.length)
      // 获取单元格的文本值
      if (j == 1) {
        if (row.cells[j].outerHTML.split('>')[1].split('<')[0] == '——') {
          continue
        } else if (row.cells[j].getElementsByTagName('span')[0].textContent == '——') {
          continue
        } else {
          var cellText = row.cells[j]
            .getElementsByTagName('a')[0]
            .attributes.href.textContent.split('#')[1]
        }
      } else if (j == 0) {
        console.warn(i + row.cells[1].textContent)
        if (row.cells[1].textContent == '——') {
          continue
        }
        //var cellText = row.cells[1].textContent;
      } else {
        var cellText = row.cells[j].textContent
        //console.error("文本值无匹配方案，序列"+i)
      }
      // 将文本值添加到数组中
      rowData.push(cellText)
    }
    // 将保存了该行数据的数组添加到数组中
    data.push(rowData)
  }
  return data
}

//解析参数值
function parse(input) {
  var regex1 = /[^,]+/g
  var result = []

  var matches1
  console.log('parse：' + regex1.exec(input))
  while ((matches1 = regex1.exec(input)) !== null) {
    var part = matches1[0].trim()
    if (part == 'ErrorCode.OK') {
      result.push({
        key: 'code',
        type: 'number',
        name: ''
      })
    } else {
      var regex2 = /([^:]+):([^|\s]+)(?:\s*(.*))?/

      var matches2 = regex2.exec(part)

      if (matches2 !== null) {
        var type = ''
        var name = ''

        var typeRegex = /\b([a-zA-Z]+)\b/
        var typeMatches = typeRegex.exec(matches2[2])

        if (typeMatches !== null) {
          type = typeMatches[1]
          name = matches2[2].substr(type.length).trim() // 从第二个部分中提取名称
        }

        var subparts = matches2[1].split('|')

        for (var i = 0; i < subparts.length; i++) {
          var key = subparts[i].trim()

          var obj = {
            key: key,
            type: type,
            name: name
          }
          result.push(obj)
        }
      }
    }
  }
  return result
}

//获取类名
var ClassText = document.getElementsByClassName('wiki-title-wrap')[0].children[0].textContent
var parts = ClassText.split('：')
// 获取冒号前后的内容
var classType = parts[0]
var className = parts[1]
const API = []

//提取函数列表
var table = document.querySelector('table')
var APIList = tableToJson(table)
console.log(APIList)
for (var i in APIList) {
  API.push({
    id: APIList[i][1],
    name: APIList[i][0].split('(')[0],
    desc: APIList[i][2]
  })
}
console.log(API)

//获取wiki内的顶级父元素
function getRealParent(e) {
  if (e.parentElement.className == 'wiki-content') {
    return e
  } else {
    return getRealParent(e.parentElement)
  }
}

var typeinstr = ['nil', 'boolean', 'number', 'string', 'table', 'function', 'userdata', 'thread']
function typename(num, str, mod) {
  for (const i in typeinstr) {
    try {
      if (str.includes(typeinstr[i])) {
        if (mod == 1) {
          return str.split(typeinstr[i])[1]
        } else if (mod == 2) {
          return typeinstr[i]
        } else {
          throw '参数解析模式选择错误，无法识别'
        }
      }
    } catch (err) {
      throw '无法识别第' + num + '处的' + str
    }
  }
  return str
}

//var parmarr = []//new Array()//创建一个数组存放多个参数
//var parmObj = {}//new Object()//创建一个对象存放参数信息
for (i in API) {
  var parmarr = []
  var parmObj = {}
  //函数基本信息
  ul = getRealParent(document.getElementById(API[i].id)).nextElementSibling
  //参数
  var parmLi = ul.children[0].outerHTML.toString().split('<li>')
  if (parmLi.length > 2) {
    console.log('找到了这些参数：\n' + parmLi)
    for (let j in parmLi) {
      //遍历参数的DOM元素列表
      console.warn(parmLi[j])
      //console.warn(j)
      if (j > 1) {
        //返回参数对象
        parmObj.name = parmLi[j].split('</li>')[0].split(':')[0]
        parmObj.type = typename(i, parmLi[j].split('</li>')[0].split(':')[1], 2)
        parmObj.describe = typename(i, parmLi[j].split('</li>')[0].split(':')[1], 1)
        parmarr.push(parmObj)
        console.error(parmarr)
        continue
      }
    }
    console.log(parmarr)
    API[i].parm = parmarr
  } else {
    API[i].parm = null
  }

  /*
  if (parmLi.children.length == 2) {
    //console.log("Error："+parmLi)
    var parmText = parmLi.children[1].textContent
    parmText = parmText.substring(1, parmText.length - 1).replaceAll(",", "|").replace(/\n/g, ",")
    API[i].parm = parse(parmText)
  } else {
    API[i].parm = null
  }
  */
  //返回值
  var retLi = ul.children[1]
  if (retLi.children.length == 2) {
    var retText = retLi.children[1].textContent
    retText = retText
      .substring(1, retText.length - 1)
      .replaceAll(',', '|')
      .replace(/\n/g, ',')
    API[i].ret = parse(retText)
  } else {
    API[i].ret = null
  }
  //例子
  code = getRealParent(document.getElementById(API[i].id)).nextElementSibling.nextElementSibling
    .children[0].children[0].textContent
  API[i].example = code
  //console.log("API："+API[i].id)
  delete API[i].id
}

console.log({
  class: classType,
  name: className,
  functions: API
})
