threshold
<template>
    <TresGroup :scale="curScale">
        <TresMesh :renderOrder="2200">
            <TresSphereGeometry :args="[props.radius, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]" />
            <TresMeshBasicMaterial :side="THREE.DoubleSide" transparent :map="pTexture[0]" :color="ballColor" :opacity="opacity" />
        </TresMesh>
        <TresMesh :renderOrder="2201" :position="[0, props.radius * 0.3, 0]">
            <TresCylinderGeometry :args="[props.radius * 1.02, props.radius * 1.02, props.radius * 0.6, 32, 1, true]" :openEnded="true" />
            <TresMeshBasicMaterial :side="THREE.DoubleSide" transparent :map="pTexture[1]" :color="wallColor" :opacity="opacity" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { useRenderLoop, useTexture } from '@tresjs/core'
import * as THREE from 'three'
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        radius?: number
        ballColor?: string
        wallColor?: string
        speed?: number
    }>(),
    {
        radius: 100,
        ballColor: '#ffff00',
        wallColor: '#ffffff',
        speed: 1,
    },
)

const pTexture = await useTexture(['./plugins/digitalCity/image/diffuseCircle1.png', './plugins/digitalCity/image/diffuseCircle2.png'])
pTexture[1].offset.set(0.5, 0.5)

const curScale = ref(0)
const opacity = ref(1)
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    if (curScale.value > 1) {
        curScale.value = 0
    }
    curScale.value += delta * props.speed
    opacity.value = 1.4 - curScale.value
})
</script>
