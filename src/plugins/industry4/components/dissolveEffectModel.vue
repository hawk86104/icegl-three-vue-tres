<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-23 08:36:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-23 17:52:54
-->
<template>
    <primitive :object="scene" :scale="0.015" :rotation="[0, Math.PI / 1.5, 0]" />
</template>
<script setup>
import { useGLTF } from '@tresjs/cientos'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { watchEffect, ref, defineExpose } from 'vue'
import * as THREE from 'three'

const props = defineProps({
    edgeColor: {
        default: 0x111111,
    },
    edgeWidth: {
        default: 0.03,
    },
    dissolveSpeed: {
        default: 0.003,
    },
    funRef: {
        appear: null,
        disappear: null,
    },
})

const { scene, nodes, materials } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb', {
    draco: true,
    decoderPath: './draco/',
})
Object.values(nodes).forEach((node) => {
    if (node.isMesh) {
        if (node.name.startsWith('glass')) node.geometry.computeVertexNormals()
        if (node.name === 'silver_001_BreakDiscs_0') {
            node.material = materials.BreakDiscs.clone()
            node.material.color = new THREE.Color('#ddd')
        }
    }
})

{
    nodes.glass_003.scale.setScalar(2.7)
    materials.FrameBlack.color = new THREE.Color('black')
    materials.FrameBlack.roughness = 0
    materials.FrameBlack.metalness = 0.75

    materials.Chrome.color = new THREE.Color('#333')
    materials.Chrome.metalness = 1
    materials.Chrome.roughness = 0

    materials.BreakDiscs.color = new THREE.Color('#555')
    materials.BreakDiscs.metalness = 0.2
    materials.BreakDiscs.roughness = 0.2

    materials.TiresGum.color = new THREE.Color('#181818')
    materials.TiresGum.metalness = 0
    materials.TiresGum.roughness = 0.4

    materials.GreyElements.color = new THREE.Color('#292929')
    materials.GreyElements.metalness = 0

    nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
        roughness: 0.3,
        metalness: 0.05,
        color: '#111',
        envMapIntensity: 0.75,
        clearcoatRoughness: 0,
        clearcoat: 1,
    })
}

const pTexture = await useTexture(['./plugins/digitalCity/image/smokeparticle.png', './plugins/industry4/image/dissolve.jpg'])
let shaders = []
let isDissolving = false
let params = {
    dissolveProgress: 0,
    noiseTexture: pTexture[0],
    edgeColorTexture: pTexture[1],
}
let signedDissolveSpeed = props.dissolveSpeed
const appear = () => {
    if (isDissolving) return
    isDissolving = true
    signedDissolveSpeed = props.dissolveSpeed

    for (let shader of shaders) {
        shader.uniforms.dissolveSpeed = { value: signedDissolveSpeed }
        shader.uniforms.dissolveProgress = { value: 0 }
    }
}
const disappear = () => {
    if (isDissolving) return
    isDissolving = true
    signedDissolveSpeed = -props.dissolveSpeed
    for (let shader of shaders) {
        shader.uniforms.dissolveSpeed = { value: signedDissolveSpeed }
        shader.uniforms.dissolveProgress = { value: 1 }
    }
}
props.funRef.appear = appear
props.funRef.disappear = disappear
defineExpose({
    appear,
    disappear,
})
Object.values(nodes).forEach((node) => {
    if (node.isMesh) {
        node.frustumCulled = false
        const material = node.material
        material.transparent = true

        material.onBeforeCompile = (shader) => {
            shaders.push(shader)
            shader.uniforms.edgeColor = { value: new THREE.Color(props.edgeColor) }
            shader.uniforms.edgeWidth = { value: props.edgeWidth }
            shader.uniforms.dissolveSpeed = { value: props.dissolveSpeed }
            shader.uniforms.dissolveProgress = { value: params.dissolveProgress }
            shader.uniforms.noiseTexture = { value: params.noiseTexture }
            shader.uniforms.edgeColorTexture = { value: params.edgeColorTexture }
            shader.vertexShader = shader.vertexShader.replace('#include <common>', ['varying vec2 xUv;', '#include <common>'].join('\n'))
            shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', ['xUv = uv;', '#include <uv_vertex>'].join('\n'))
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `#include <common>
             uniform float dissolveProgress;
             uniform float edgeWidth;
             uniform vec3 edgeColor;
             uniform sampler2D noiseTexture;
             uniform sampler2D edgeColorTexture;
             varying vec2 xUv;
            `,
            )
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `#include <dithering_fragment>
                float noiseValue = texture2D(noiseTexture, xUv).r;
              	vec4 finalColor = texture2D(edgeColorTexture, xUv);

								vec3 mixedColor = mix(finalColor.rgb, edgeColor, 0.5);
								finalColor.rgb = mixedColor;

                // vec4 finalColor = linearToOutputTexel( vec4(edgeColor, gl_FragColor.a) );
								float alpha = step(noiseValue - edgeWidth, dissolveProgress);
                gl_FragColor.a = alpha;
								float useOrigin = step(noiseValue, dissolveProgress);
								gl_FragColor.rgb = mix(finalColor.rgb, gl_FragColor.rgb, useOrigin);`,
            )
        }
    }
})

const { onLoop } = useRenderLoop()
onLoop(({ dt }) => {
    if (isDissolving) {
        for (let shader of shaders) {
            let { dissolveProgress, dissolveSpeed } = shader.uniforms
            dissolveProgress.value += dissolveSpeed.value
            if (dissolveProgress.value < 0) {
                isDissolving = false
            }
            if (dissolveProgress.value > 1) {
                isDissolving = false
            }
        }
    }
})

watchEffect(() => {
    if (props.dissolveSpeed) {
        for (let shader of shaders) {
            shader.uniforms.dissolveSpeed.value = props.dissolveSpeed
        }
    }
    if (props.edgeColor) {
        for (let shader of shaders) {
            shader.uniforms.edgeColor.value = new THREE.Color(props.edgeColor)
        }
    }
    if (props.edgeWidth) {
        for (let shader of shaders) {
            shader.uniforms.edgeWidth.value = props.edgeWidth
        }
    }
})
</script>
