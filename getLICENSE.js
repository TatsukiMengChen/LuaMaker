//该脚本不可用
/*
const { exec } = require('child_process');
const fs = require('fs');

// 执行yarn list命令并获取依赖信息
exec('yarn list --json', (error, stdout) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }

  const data = Array(JSON.stringify(stdout))
  //console.log(data)
  let csvContent = '"module name","license","repository"\n';

  // 确保data是一个数组
  if (Array.isArray(data)) {
    data.forEach((dep) => {
      const moduleName = dep.name;
      const license = dep.license || 'UNKNOWN';
      const repository = dep.resolved || 'UNKNOWN';
      csvContent += `"${moduleName}","${license}","${repository}"\n`;
    });
  } else {
    console.error('数据格式错误，无法解析依赖信息。');
    return;
  }

  // 读取NOTICE文件并删除从第13行开始的所有内容
  fs.readFile('NOTICE', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.split('\n');
    const header = lines.slice(0, 11).join('\n') + '\n'; // 保留前12行

    // 更新NOTICE文件内容
    const newData = header + csvContent;
    fs.writeFile('NOTICE', newData, (err) => {
      if (err) throw err;
      console.log('依赖信息已更新到 NOTICE 文件中。');
    });
  });
});
*/
