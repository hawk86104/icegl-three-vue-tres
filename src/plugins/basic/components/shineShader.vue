<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-29 10:11:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 10:18:22
-->
<template>
    <TresMesh ref="TSGref" :scale="props.scale">
        <TresShaderMaterial v-bind="smState" />
    </TresMesh>
</template>

<script setup lang="ts">
import { useRenderLoop, useTresContext } from '@tresjs/core'
import * as THREE from 'three'
import { ref, watchEffect, watch } from 'vue'
import { LoopSubdivision } from 'three-subdivide'
const props = withDefaults(
    defineProps<{
        srcMesh: any
        scale?: number
        color?: string
        subdivision?: boolean
        c?: number
        p?: number
        side?: number
        blending?: number
    }>(),
    {
        scale: 1.2,
        color: '#ffff00',
        subdivision: true,
        c: 1.1,
        p: 1.4,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
    },
)
const TSGref = ref()
const smState = {
    uniforms: {
        c: { type: 'f', value: props.c },
        p: { type: 'f', value: props.p },
        glowColor: { type: 'c', value: new THREE.Color(props.color) },
        viewVector: { type: 'v3', value: { x: 0, y: 0, z: 0 } },
    },
    // 顶点着色器
    vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize( normalMatrix * normal);
            vec3 vNormel = normalize( normalMatrix * viewVector);
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
          }
            `,
    // 片段着色器
    fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() 
          {
          	vec3 glow = glowColor * intensity;
						if(intensity < 1.0){
            	gl_FragColor = vec4( glow, 1.0 );
						}
          }
        `,
    side: props.side, // DoubleSide BackSide FrontSide
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: props.blending, //在使用此材质显示对象时要使用何种混合。加法 NormalBlending
}

watchEffect(() => {
    if (props.srcMesh && TSGref.value) {
        if (!TSGref.value.geometry.attributes.position) {
            let geometry = props.srcMesh.geometry.clone()
            if (props.subdivision) {
                geometry = LoopSubdivision.modify(geometry, 2)
            }
            TSGref.value.geometry = geometry
            TSGref.value.position.copy(props.srcMesh.position)
        }
    }
    if (props.color) {
        smState.uniforms.glowColor.value = new THREE.Color(props.color)
    }
    if (props.c) {
        smState.uniforms.c.value = props.c
    }
    if (props.p) {
        smState.uniforms.p.value = props.p
    }
})
watch(
    () => props.subdivision,
    (newVal) => {
        let geometry = props.srcMesh.geometry.clone()
        if (newVal) {
            geometry = LoopSubdivision.modify(geometry, 2)
        }
        TSGref.value.geometry = geometry
    },
)
watch(
    () => props.side,
    (newVal) => {
        TSGref.value.material.side = newVal
    },
)
watch(
    () => props.blending,
    (newVal) => {
        TSGref.value.material.blending = newVal
    },
)
const { onLoop } = useRenderLoop()
const { camera } = useTresContext()
onLoop(() => {
    if (camera.value && TSGref.value) {
        smState.uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.value.position, TSGref.value.position)
    }
})
</script>
