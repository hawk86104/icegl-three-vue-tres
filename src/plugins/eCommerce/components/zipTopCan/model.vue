<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-30 11:24:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-30 12:07:28
-->
<template>
    <TresMesh :visible="false" @click="onClick">
        <TresPlaneGeometry :args="[sizes.width.value / 50, sizes.height.value / 50]" />
    </TresMesh>
    <TresGroup :rotation="[-Math.PI / 2, 1.7, Math.PI / 2]" :position="[0, tgpY, 5]">
        <TresGroup :rotation="[-Math.PI / 2, 0, 0]">
            <TresMesh :geometry="nodes.LowRes_Can_Alluminium_0.geometry" :material="materials.Alluminium" />
            <TresMesh :geometry="nodes.LowRes_Can_Body_0.geometry" :material="materials.Body" />
        </TresGroup>
    </TresGroup>
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { noise } from './Noise'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { colors } from './colors'
import { useRenderLoop, useTresContext } from '@tresjs/core'
const { sizes } = useTresContext()
import { ref } from 'vue'

// @ts-ignore
const { nodes, materials } = await useGLTF('./plugins/eCommerce/model/energy-can.glb', {
    draco: true,
    decoderPath: './draco/',
})

const uniforms = {
    u_time: { value: 0 },
    u_color1: { value: new THREE.Color(colors[0]) },
    u_color2: { value: new THREE.Color(colors[1]) },
    u_progress: { value: 0.5 },
    u_width: { value: 0.8 },
    u_scaleX: { value: 50 },
    u_scaleY: { value: 50 },
    u_textureSize: {
        value: new THREE.Vector2(materials.Body.map.source.data.width, materials.Body.map.source.data.height),
    },
}
materials.Body.metalness = 0
materials.Body.roughness = 1
materials.Body.onBeforeCompile = (shader: any) => {
    shader.uniforms = Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader.replace(
        `#include <common>`,
        `
          #include <common>
          varying vec2 vUv;
        `,
    )

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          #include <begin_vertex>
          vUv = uv;
        `,
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <common>`,
        `
          #include <common>
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform float u_progress;
          uniform float u_width;
          uniform float u_scaleX;
          uniform float u_scaleY;
          uniform vec2 u_textureSize;
          varying vec2 vUv;
          ${noise}
          float parabola( float x, float k ) {
            return pow( 4. * x * ( 1. - x ), k );
          }
      `,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <color_fragment>`,
        `
          #include <color_fragment>
            float aspect = u_textureSize.x/u_textureSize.y;
            float dt = parabola(u_progress,1.);
            float border = 1.;
            float noise = 0.5*(cnoise(vec4(vUv.x*u_scaleX  + 0.5*u_time/3., vUv.y*u_scaleY,0.5*u_time/3.,0.)) + 1.);
            float w = u_width*dt;
            float maskValue = smoothstep(1. - w,1.,vUv.y + mix(-w/2., 1. - w/2., u_progress));
            maskValue += maskValue * noise;
            float mask = smoothstep(border,border+0.01,maskValue);
            diffuseColor.rgb += mix(u_color1,u_color2,mask);
        `,
    )
}
let colorIndex = 0
function onClick(ev: any) {
    if (ev && ev.object && ev.object.material) {
        if (++colorIndex >= colors.length) {
            colorIndex = 0
        }
        console.log('model colorIndex', colorIndex)
        let nextTexture = new THREE.Color(colors[colorIndex])
        uniforms.u_color2.value = nextTexture

        const uprogress = uniforms.u_progress
        gsap.killTweensOf(uprogress)
        uprogress.value = 0.5
        gsap.to(uprogress, {
            duration: 1,
            ease: 'power1.out',
            value: 1,
            onComplete: () => {
                uniforms.u_color1.value = nextTexture
            },
        })
    }
    ev.stopPropagation()
}

let tgpY = ref(0)
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    tgpY.value = Math.sin(elapsed) * 0.12
    uniforms.u_time.value = elapsed
})
</script>
