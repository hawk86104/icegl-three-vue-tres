<script setup lang="ts">
import { watch } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import * as THREE from 'three'

const props = withDefaults(
    defineProps<{
        color?: string
        radius?: number
        speed?: number
        radialSegments?: number
        tubularSegments?: number
        closed?: boolean
        clockwise?: boolean
        fewNum?: number
        linesList?: number[][]
    }>(),
    {
        color: '#2bc4dc',
        radius: 0.2 /*管道的半径*/,
        speed: 1.0,
        tubularSegments: 64 /*管道路径平滑*/,
        radialSegments: 6 /*管道壁圆润*/,
        closed: false,
        clockwise: true,
        fewNum: 1,
        linesList: () => [
            [15, 0, 15],
            [15, 0, -15],
            [-15, 0, -15],
            [-15, 0, 10],
            [15, 0, 15],
        ],
    },
)

const { map: pTexture } = await useTexture({
    map: './plugins/digitalCity/image/line2.png',
})
pTexture.needsUpdate = true
pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping
pTexture.repeat.set(props.fewNum, 1)

pTexture.rotation = props.clockwise ? 0 : Math.PI
pTexture.generateMipmaps = false
pTexture.magFilter = THREE.NearestFilter

let pathPoint = [] as THREE.Vector3[]
props.linesList.forEach((point) => {
    pathPoint.push(new THREE.Vector3().fromArray(point))
})
const curve = new THREE.CatmullRomCurve3(pathPoint)

const { onLoop } = useRenderLoop()
onLoop(() => {
    pTexture.offset.x += 0.002 * props.speed
})

watch(
    () => [props.clockwise, props.fewNum],
    ([clockwise, fewNum]) => {
        pTexture.rotation = clockwise ? 0 : Math.PI
        pTexture.repeat.set(fewNum, 1)
    },
)
</script>

<template>
    <TresMesh>
        <TresTubeGeometry :args="[curve, props.tubularSegments /*管道路径平滑*/, props.radius, props.radialSegments /*管道壁圆润*/, props.closed]" />
        <TresMeshBasicMaterial
            :blending="THREE.AdditiveBlending"
            :map="pTexture"
            :side="THREE.DoubleSide"
            :alphaMap="pTexture"
            :transparent="true"
            :color="props.color"
        />
    </TresMesh>
</template>
