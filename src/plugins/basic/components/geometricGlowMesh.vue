<template>
    <TresGroup>
        <TresMesh :geometry="erodedGeometry">
            <TresShaderMaterial v-bind="inMaterialConfig" :blending="THREE.AdditiveBlending" transparent :depthWrite="false" :side="THREE.FontSide" />
        </TresMesh>
        <TresMesh :geometry="dilatedGeometry" :visible="true">
            <TresShaderMaterial v-bind="outMaterialConfig" :blending="THREE.AdditiveBlending" transparent :depthWrite="false" :side="THREE.BackSide" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { dilateBufferGeometry } from '../common/utils'
import vertexShader from '../shader/geometricGlow.vert'
import fragmentShader from '../shader/geometricGlow.frag'

const props = defineProps({
    geometry: Object,
    inColor: {
        default: 'hotpink',
    },
    outColor: {
        default: 'hotpink',
    },
    inPower: {
        default: 1.4,
    },
    outPower: {
        default: 1.2,
    },
    inCoeficient: {
        default: 1.1,
    },
    outCoeficient: {
        default: 0.1,
    },
})

const erodedGeometry = props.geometry.clone()
dilateBufferGeometry(erodedGeometry, 0.01)

const dilatedGeometry = props.geometry.clone()
dilateBufferGeometry(dilatedGeometry, 0.2)

const inMaterialConfig = {
    uniforms: {
        coeficient: { value: props.inCoeficient },
        power: { value: props.inPower },
        glowColor: { value: new THREE.Color(props.inColor) },
        viewVector: { value: new THREE.Vector3(0, 0, 1) },
    },
    vertexShader,
    fragmentShader,
}

const outMaterialConfig = {
    uniforms: {
        coeficient: { value: props.outCoeficient },
        power: { value: props.outPower },
        glowColor: { value: new THREE.Color(props.outColor) },
        viewVector: { value: new THREE.Vector3(0, 0, 1) },
    },
    vertexShader,
    fragmentShader,
}

watch(
    () => [props.inColor, props.outColor],
    ([inColor, outColor]) => {
        inMaterialConfig.uniforms.glowColor.value.set(inColor)
        outMaterialConfig.uniforms.glowColor.value.set(outColor)
    },
)
watch(
    () => [props.inPower, props.outPower, props.inCoeficient, props.outCoeficient],
    ([inPower, outPower, inCoeficient, outCoeficient]) => {
        inMaterialConfig.uniforms.power.value = inPower
        outMaterialConfig.uniforms.power.value = outPower
        inMaterialConfig.uniforms.coeficient.value = inCoeficient
        outMaterialConfig.uniforms.coeficient.value = outCoeficient
    },
)
</script>
