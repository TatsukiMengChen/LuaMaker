<p align="center">
<br>
<img width="100" src="https://cdn.nlark.com/yuque/0/2024/png/35402759/1720699360490-576ed677-8056-426d-ab06-f75b9519bf68.png" alt="LuaMaker-logo"/>

</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/10ba9049-03f9-4ac1-a8de-1b3d066f83a1/deploy-status)](https://app.netlify.com/sites/luamaker/deploys)[![GitHub stars](https://img.shields.io/github/stars/TatsukiMengChen/LuaMaker.svg?style=social&label=Star&maxAge=2592000)](https://github.com/TatsukiMengChen/LuaMaker/stargazers)    [![GitHub forks](https://img.shields.io/github/forks/TatsukiMengChen/LuaMaker.svg)](https://github.com/TatsukiMengChen/LuaMaker/network/members)  ![Static Badge](https://img.shields.io/badge/Powered_By-Boxy-blue?labelColor=%23d1e0fd&color=%234062F6&link=https%3A%2F%2Fgitee.com%2Fcocotais%2Fboxy)

# LuaMaker

Portable visual script editor for creators.

# Introduce

LuaMaker is an innovative tool specially designed for MiniWorld developers. Based on the excellent open source project [Boxy](https://github.com/cocotais/boxy), LuaMaker aims to enable developers to easily design and edit complex Lua scripts, thus making more exciting games.

# Develop

This project is developed based on [Boxy](https://github.com/cocotais/boxy), which is a pure web-side tool and managed by `yarn`.

```
yarn install
```
```
yarn dev
```

After entering the development mode, a local server will be started to run the project at port 1234 by default. The port will keep listening for changes of code, compile and perform hot reloading. If the project shows some problems after hot reloading, you can refresh the page.

```
yarn build
```

Projects in production status will be packaged into the `./dist`. Before building, we recommend that you run the following instructions to review the code.

```
yarn lint
```
```
yarn style
```
```
yarn format
```

For more information, you can read [The Guidance of Boxy](https://www.yuque.com/zaona/boxy).

# Contribution

Welcome your contribution! Please kindly submit issue and pull request, and please run the above instructions to review the code before submit pull request.If you have localization requirements, please send an email to [shulin3712@163.com](mailto:shulin3712@163.com) and we will contact you as soon as possible.

