<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-31 11:10:26
-->
🧊icegl-three-vue-tres是一款让你的三维可视化项目快速落地的开源开发框架

加入我们共同学习webGL：[ICE图形学社区](https://www.icegl.cn)

# 生态 `@ThreeJS-@Vue3.x-@TresJS`
> icegl出品，永久开源且免费商用

本项目融合于三大生态系统中：
- 🎲 ThreeJS * [点击详情](https://threejs.org)

ThreeJS大名鼎鼎的基于浏览器渲染，JavaScript语言的3D库。

- 🍀 Vue3.x * [点击详情](https://cn.vuejs.org)

易学易用，性能出色，适用场景丰富的 Web 前端框架。

- ⚡ TresJS * [点击详情](https://tresjs.org)

使用Vue3.x组件实现声明式的ThreeJS，做属于前端的三维项目。

# 优势
- 🌈 前端の基本素养 * FesJS [点击详情](https://fesjs.mumblefe.cn)

集成封装项目落地的常用库：图标、多语言、API接口调用、Vuex/Pinia、model数据封装、页面layout/权限access、路由管理等。

- 🌠 像写Vue3.x一样写三维可视化项目 * TresJS [点击详情](https://tresjs.org/guide)

```html
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
```
- 🧩 丰富的插件应用市场

插件中心包含各式各样的项目场景和功能。插件是ICE社区生态中重要的一环，在应用市场中完整应用和普通插件统一称为插件。

# 快速开始
1、git clone 或者 直接下载 本项目

2、cd 到项目根目录

3、yarn	//安装依赖

4、yarn dev	//调试模式

5、yarn build	//编译打包

# 问题反馈
在使用中有任何问题，请使用以下联系方式联系我们

- 问答社区: [图形学社区icegl.cn](https://www.icegl.cn/ask)
<p align = "left">   
<img src="https://icegl-1314935952.cos.ap-beijing.myqcloud.com/uploads/20230421/QQ20230421-121209.png" width="680" />
</p>

- 欢迎大家也加入微信群，已有几个群已满，一起学习讨论webgl。加微信我拉进群
<p align = "left">    
<img src="https://icegl-1314935952.cos.ap-beijing.myqcloud.com/uploads/20230731/17d59bab46815cce1f4f1e09dcbb6ccc.png" width="300" />
</p>

# 版权信息

本项目遵循Apache2开源协议发布，并提供永久免费使用以及商用。

本项目包含的第三方源码和二进制文件之版权信息另行标注。

版权所有Copyright © 2022-2025 by 🧊Ice.gl (https://www.icegl.cn)

All rights reserved。