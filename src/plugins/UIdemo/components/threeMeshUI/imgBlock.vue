<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-31 14:34:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-31 15:00:33
-->
<template></template>

<script setup lang="ts">
import * as THREE from 'three'
import { useTresContext, useRenderLoop, useTexture } from '@tresjs/core'
import * as ThreeMeshUI from '../../lib/three-mesh-ui.module.js'

const rootBlock = new ThreeMeshUI.Block({
    width: 0.6 * 2,
    height: 0.399 * 2,
    margin: 0.025,
    padding: 0,
    textAlign: 'left',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    backgroundSide: THREE.DoubleSide,
})
rootBlock.position.set(0, -0.5 + 0.4, 1)
rootBlock.rotation.x = -0.33

const texture = await useTexture(['./plugins/industry4/preview/showLambo.png'])
rootBlock.set({
    backgroundColor: new THREE.Color(0xffffff),
    backgroundOpacity: 1,
    backgroundImage: texture,
})

// 实现 文字和背景同时双面显示
rootBlock.backgroundMaterial.depthWrite = false

const caption = new ThreeMeshUI.Text({
    padding: 0.025,
    textAlign: 'center',
    textContent: 'Lambo Car',
    backgroundColor: 0x000000,
    backgroundOpacity: 0.5,
    fontSize: 0.04,
    fontFamily: './plugins/UIdemo/fonts/msdf/regular.json',
    fontTexture: './plugins/UIdemo/fonts/msdf/regular.png',
    fontSide: THREE.DoubleSide,
})
rootBlock.add(caption)

const { scene } = useTresContext()
scene.value.add(rootBlock)

const { onLoop } = useRenderLoop()
onLoop(() => {
    ThreeMeshUI.update()
})
</script>
