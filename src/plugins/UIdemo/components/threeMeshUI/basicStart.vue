<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-31 09:24:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-31 12:50:33
-->
<template></template>

<script setup lang="ts">
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import * as ThreeMeshUI from '../../lib/three-mesh-ui.module.js'

const rootBlock = new ThreeMeshUI.Block({
    name: 'rootBlock',
    width: 1.2,
    height: 'auto',
    padding: 0.05,
    boxSizing: 'border-box',
    justifyContent: 'center',
    textAlign: 'left',
    borderRadius: 0.015,
    backgroundColor: 0x000000,
    backgroundOpacity: 0.5,
    fontSize: 0.055,
    fontFamily: './plugins/UIdemo/fonts/msdf/regular.json',
    fontTexture: './plugins/UIdemo/fonts/msdf/regular.png',
    backgroundSide: THREE.DoubleSide,
})
rootBlock.position.set(0, 0.6, 0.5)
rootBlock.rotation.x = -0.55

// 实现 文字和背景同时双面显示
rootBlock.backgroundMaterial.depthWrite = false

const textContent = 'This is a basic example of ThreeMeshUI.\n It shows a simple text block with a background and some inline text.'
const inline = new ThreeMeshUI.Text({
    textContent: textContent,
    fontSide: THREE.DoubleSide,
    // fontOpacity: 0.3,
})
rootBlock.add(inline)

const { scene } = useTresContext()
scene.value.add(rootBlock)

const { onLoop } = useRenderLoop()
onLoop(() => {
    inline.set({ textContent: textContent + '\n' + Math.random() })
    ThreeMeshUI.update()
})
</script>
