<template>
    <primitive :object="storm" :renderOrder="9999" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { LightningStorm } from '../../common/lightningStorm/LightningStorm'
import { watchEffect } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
        size?: number
        minHeight?: number
        maxHeight?: number
        maxLightnings?: number

        roughness?: number
        straightness?: number
        radius0?: number
        radius1?: number
        timeScale?: number
        subrayPeriod?: number
        subrayDutyCycle?: number
    }>(),
    {
        color: '#b0ffff',
        size: 2000,
        minHeight: 100,
        maxHeight: 500,
        maxLightnings: 18,

        roughness: 0.85,
        straightness: 0.65,
        radius0: 1,
        radius1: 0.5,
        timeScale: 0.15,
        subrayPeriod: 4,
        subrayDutyCycle: 0.6,
    },
)

const lightningColor = new THREE.Color(props.color)

const lightningMaterial = new THREE.MeshBasicMaterial({ color: lightningColor })
const rayDirection = new THREE.Vector3(0, -1, 0)
let rayLength = 0
const vec1 = new THREE.Vector3()
const vec2 = new THREE.Vector3()

const rayParams = {
    roughness: props.roughness,
    straightness: props.straightness,
    radius0: props.radius0,
    radius1: props.radius1,
    timeScale: props.timeScale,

    subrayPeriod: props.subrayPeriod,
    subrayDutyCycle: props.subrayDutyCycle,

    minRadius: 0.3,
    maxIterations: 7,
    propagationTimeFactor: 0.2,
    vanishingTimeFactor: 0.9,
    maxSubrayRecursion: 3,
    ramification: 3,
    recursionProbability: 0.4,

    //@ts-ignore
    onSubrayCreation: function (segment, parentSubray, childSubray, lightningStrike) {
        lightningStrike.subrayConePosition(segment, parentSubray, childSubray, 0.6, 0.6, 0.5)

        // Plane projection
        rayLength = lightningStrike.rayParameters.sourceOffset.y
        vec1.subVectors(childSubray.pos1, lightningStrike.rayParameters.sourceOffset)
        const proj = rayDirection.dot(vec1)
        vec2.copy(rayDirection).multiplyScalar(proj)
        vec1.sub(vec2)
        const scale = proj / rayLength > 0.5 ? rayLength / proj : 1
        vec2.multiplyScalar(scale)
        vec1.add(vec2)
        childSubray.pos1.addVectors(vec1, lightningStrike.rayParameters.sourceOffset)
    },
}

const storm = new LightningStorm({
    size: props.size,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    maxSlope: 0.6,
    maxLightnings: props.maxLightnings,
    lightningParameters: rayParams,
    lightningMaterial: lightningMaterial,
})

watchEffect(() => {
    const stormParams = storm.stormParams as any
    stormParams.size = props.size
    stormParams.minHeight = props.minHeight
    stormParams.maxHeight = props.maxHeight
    lightningMaterial.color.set(props.color)

    rayParams.roughness = props.roughness
    rayParams.straightness = props.straightness
    rayParams.radius0 = props.radius0
    rayParams.radius1 = props.radius1
    rayParams.timeScale = props.timeScale
})

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    storm.update(elapsed)
})
</script>
