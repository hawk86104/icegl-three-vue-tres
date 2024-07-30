<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-30 09:45:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-30 11:36:56
-->

<template>
    <TresMesh @click="onClick">
        <TresPlaneGeometry :args="[sizes.width.value / 50, sizes.height.value / 50]" />
        <TresShaderMaterial v-bind="tsMaterialConfig" />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
const { sizes } = useTresContext()
import { noise } from './Noise'
import { gsap } from 'gsap'
import { colors } from './colors'

let colorIndex = 0
const tsMaterialConfig = {
    uniforms: {
        u_time: { value: 0.0 },
        u_progress: { value: 0 },
        u_aspect: { value: sizes.width.value / sizes.height.value },
        u_color: { value: new THREE.Color(colors[colorIndex]) },
    },
    vertexShader: `
		varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
		`,
    fragmentShader: `
	uniform float u_time;
    uniform float u_progress;
    uniform float u_aspect;
    uniform vec3 u_color;
    varying vec2 vUv;
    #define PI 3.14159265
    ${noise}

    void main() {
        vec2 newUv = (vUv - vec2(0.5)) * vec2(u_aspect,1.);
        float dist = length(newUv);
        float density = 1.8 - dist;
        float noise = cnoise(vec4(newUv*40.*density, u_time, 1.));
        float grain = (fract(sin(dot(vUv, vec2(12.9898,78.233)*2000.0)) * 43758.5453));
        
        float facets = noise*2.;
        float dots = smoothstep(0.1, 0.15, noise);
        float n = facets * dots;
        n = step(.2,facets)*dots;
        n = 1. - n;

        float radius = 1.5;
        float outerProgress = clamp(1.1*u_progress, 0., 1.);
        float innerProgress = clamp(1.1*u_progress - 0.05, 0., 1.);
  
        float innerCircle = 1. - smoothstep((innerProgress-0.4)*radius, innerProgress*radius, dist);
        float outerCircle = 1. - smoothstep((outerProgress-0.1)*radius, innerProgress*radius, dist);
  
        float displacement = outerCircle-innerCircle;
        
        float grainStrength = 0.3;
        vec3 final = vec3(displacement-(n+noise)) - vec3(grain*grainStrength);

        gl_FragColor = vec4(final, 1.0);
        gl_FragColor.rgb*=u_color*2.;

        #include <colorspace_fragment>
    }
		`,
}
function onClick(ev: any) {
    if (ev && ev.object && ev.object.material) {
        if (++colorIndex >= colors.length) {
            colorIndex = 0
        }
        console.log('colorIndex', colorIndex)
        ev.object.material.uniforms.u_color.value = new THREE.Color(colors[colorIndex])
        const uprogress = ev.object.material.uniforms.u_progress
        gsap.killTweensOf(uprogress)
        uprogress.value = 0
        gsap.to(uprogress, {
            duration: 2,
            ease: 'power1.out',
            value: 1,
        })
    }
}
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    if (tsMaterialConfig) {
        tsMaterialConfig.uniforms.u_time.value = elapsed
    }
})
</script>
