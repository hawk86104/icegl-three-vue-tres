<template>
    <TresGroup :rotateX="-Math.PI / 2" ref="coneGroup" :renderOrder="10000">
        <TresMesh :rotateX="Math.PI / 2" :position="[0, 0, height * 1.25]" :scale-y="0.5">
            <TresConeGeometry :args="[15, height, 4, 1, true]" />
            <TresMeshLambertMaterial :map="pTexture" :transparent="true" :depthTest="occlusion" :side="THREE.DoubleSide" :color="color" :depthWrite="true" />
        </TresMesh>
        <TresMesh :rotateX="-Math.PI / 2" :position="[0, 0, height / 2]">
            <TresConeGeometry :args="[15, height, 4, 1, true]" />
            <TresMeshLambertMaterial :map="pTexture" :transparent="true" :depthTest="occlusion" :side="THREE.DoubleSide" :color="color" :depthWrite="true" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useTexture, useRenderLoop } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        height?: Number
        color?: string
        occlusion?: boolean
        speed?: number
    }>(),
    {
        height: 40,
        color: '#b0ffff',
        occlusion: true,
        speed: 0.05,
    },
)

const { map: pTexture } = await useTexture({
    map: './plugins/digitalCity/image/midGradient.png',
})
const coneGroup = ref<THREE.Group>()
const { onLoop } = useRenderLoop()
onLoop(() => {
    coneGroup.value?.rotateZ(props.speed)
})
</script>
