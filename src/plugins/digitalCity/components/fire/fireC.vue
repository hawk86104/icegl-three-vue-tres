<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 15:53:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-13 18:38:44
-->
<template>
    <primitive :object="FlameSpriteAnimator.group" :renderOrder="9999" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { SpriteAnimator } from '@pmndrs/vanilla'
import { useRenderLoop } from '@tresjs/core'

const FlameSpriteAnimator = SpriteAnimator({
    startFrame: 0,
    fps: 40,
    autoPlay: true,
    loop: true,
    textureImageURL: './plugins/digitalCity/image/spriteAnimator/flame.png',
    textureDataURL: './plugins/digitalCity/image/spriteAnimator/flame.json',
    alphaTest: 0.101,
    asSprite: true,
})
await FlameSpriteAnimator.init()

FlameSpriteAnimator.group.children[0].material.map.colorSpace = THREE.SRGBColorSpace
// FlameSpriteAnimator.group.children[0].material.depthTest = true
// FlameSpriteAnimator.group.children[0].material.depthWrite = false
// FlameSpriteAnimator.group.children[0].material.blending = THREE.NormalBlending
// FlameSpriteAnimator.group.children[0].material.color.setHex(0xff0000)
FlameSpriteAnimator.group.children[0].geometry.translate(0, 0.344, 0) // 偏移
const { onLoop } = useRenderLoop()
onLoop(() => {
    FlameSpriteAnimator.update()
})
</script>
