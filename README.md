<p align="center">
    <br>
    <img width="100" src="https://cdn.nlark.com/yuque/0/2024/png/35402759/1720699360490-576ed677-8056-426d-ab06-f75b9519bf68.png" alt="LuaMaker-logo"/>
</p>


[![Netlify Status](https://api.netlify.com/api/v1/badges/10ba9049-03f9-4ac1-a8de-1b3d066f83a1/deploy-status)](https://app.netlify.com/sites/luamaker/deploys)    [![GitHub stars](https://img.shields.io/github/stars/TatsukiMengChen/LuaMaker.svg?style=social&label=Star&maxAge=2592000)](https://github.com/TatsukiMengChen/LuaMaker/stargazers)    [![GitHub forks](https://img.shields.io/github/forks/TatsukiMengChen/LuaMaker.svg)](https://github.com/TatsukiMengChen/LuaMaker/network/members)    ![Static Badge](https://img.shields.io/badge/Powered_By-Boxy-blue?labelColor=%23d1e0fd&color=%234062F6&link=https%3A%2F%2Fgitee.com%2Fcocotais%2Fboxy)

# LuaMaker

为创作者打造的便携式可视化脚本编辑器
<a name="Z4eMy"></a>

# 介绍

LuaMaker是一款专为迷你世界开发者量身打造的创新性工具，基于优秀开源项目[Boxy](https://github.com/cocotais/boxy)开发，旨在使开发者能够轻松地设计和编辑复杂的Lua脚本，从而制作出更精彩的玩法
<a name="jXSHA"></a>

# 开发

本项目基于[Boxy](https://github.com/cocotais/boxy)开发，为纯web端工具，使用`yarn`进行管理

```shell
yarn install
```

```shell
yarn dev
```

进入开发模式后，默认会在1234端口启动一个本地服务器运行项目。端口会持续监听代码变化，编译并进行热重载，若热重载后项目表现出一些异常，可刷新页面

```shell
yarn build
```

生产状态的项目会被打包至`./dist`目录下。在构建之前，我们建议您先运行以下指令审查代码

```shell
yarn lint
```

```shell
yarn style
```

```shell
yarn format
```

更多开发方法可查阅[Boxy手册](https://www.yuque.com/zaona/boxy)
<a name="q8A2K"></a>

# 贡献

欢迎您的贡献！请友善提issue和pr，在提pr时请先运行上述指令审查代码<br />若有本地化需求，欢迎将您的需求发送至shulin3712@163.com，我们会尽快联系您
