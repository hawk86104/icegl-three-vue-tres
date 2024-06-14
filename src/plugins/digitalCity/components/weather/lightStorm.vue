<template>
    <primitive :object="storm" :renderOrder="9999" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { LightningStorm } from '../../common/lightningStorm/LightningStorm'

const GROUND_SIZE = 2000

const lightningColor = new THREE.Color(0xb0ffff)
const outlineColor = new THREE.Color(0x00ffff)

const lightningMaterial = new THREE.MeshBasicMaterial({ color: lightningColor })
const rayDirection = new THREE.Vector3(0, -1, 0)
let rayLength = 0
const vec1 = new THREE.Vector3()
const vec2 = new THREE.Vector3()

const rayParams = {
    radius0: 1,
    radius1: 0.5,
    minRadius: 0.3,
    maxIterations: 7,

    timeScale: 0.15,
    propagationTimeFactor: 0.2,
    vanishingTimeFactor: 0.9,
    subrayPeriod: 4,
    subrayDutyCycle: 0.6,

    maxSubrayRecursion: 3,
    ramification: 3,
    recursionProbability: 0.4,

    roughness: 0.85,
    straightness: 0.65,

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
    size: GROUND_SIZE,
    minHeight: 100,
    maxHeight: 500,
    maxSlope: 0.6,
    maxLightnings: 8,
    lightningParameters: rayParams,
    lightningMaterial: lightningMaterial,
})

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    storm.update(elapsed)
})
</script>
