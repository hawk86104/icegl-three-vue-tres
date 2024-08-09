<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 08:31:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-09 15:27:00
-->
<template>
    <TresGroup>
        <TresMesh :rotateX="-Math.PI / 2">
            <TresCircleGeometry :args="[size]" />
            <TresShaderMaterial v-bind="tsmConfig" />
        </TresMesh>
    </TresGroup>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import * as THREE from 'three'
import { useTexture, useRenderLoop } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        size?: number
        speed?: number
        color?: string
    }>(),
    {
        size: 10,
        speed: 1,
        color: '#FFFFFF',
    },
)

const pTexture = await useTexture([
    './plugins/floor/image/digitalGround1.png',
    './plugins/floor/image/digitalGround2.png',
    './plugins/floor/image/digitalGround3.png',
    './plugins/floor/image/digitalGround4.png',
])
for (let i = 0; i < pTexture.length; i++) {
    pTexture[i].colorSpace = THREE.LinearSRGBColorSpace
    pTexture[i].wrapS = THREE.RepeatWrapping
    pTexture[i].wrapT = THREE.RepeatWrapping
    pTexture[i].magFilter = THREE.LinearFilter
    pTexture[i].minFilter = THREE.LinearMipmapLinearFilter
}

const tsmConfig = {
    uniforms: {
        time: {
            value: 0,
        },
        radius: {
            value: props.size,
        },
        uColor: {
			value: new THREE.Color(props.color)
		},
        texture0: {
            value: pTexture[0],
        },
        texture1: {
            value: pTexture[1],
        },
        texture2: {
            value: pTexture[2],
        },
        texture3: {
            value: pTexture[3],
        },
    },
    vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main(){
            vPosition = position;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform float radius;

        uniform sampler2D texture0;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D texture3;

        varying vec3 vPosition;
        uniform vec3 uColor;
        varying vec2 vUv;

        float wave(float a, float l, float s, float second, float val) {
            float PI = 3.141592653;
            float wave = a * sin(- val * 2.0 * PI / l + second * s * 2.0 * PI / l);
            return (wave + 1.0) / 2.0;
        }
        void main(){
            vec4 basceColor = vec4(uColor, 1.0);
            vec4 back = texture2D( texture0, vUv * 16.0);

            vec4 ori1 = texture2D( texture1, vUv * 4.0); // 电子元件
            vec4 ori2 = texture2D( texture2, vUv * 16.0 ); // 点
            vec4 ori3 = texture2D( texture3, vUv * 16.0 ); // 网格

            float length = length( vec2(vPosition.x, vPosition.y) );
            // 应用波函数蒙版
            float flag1 = wave(1.0, radius / 2.0, 45.0, time, length);
            if (flag1 < 0.5) {
                flag1 = 0.0;
            }
            ori1.a = ori1.a * (flag1 * 0.8 + 0.2);
            float flag2 = wave(1.0, radius / 3.0, 30.0, time, length);
            ori2.a = ori2.a * (flag2 * 0.8 + 0.2);
            float flag3 = wave(1.0, 60.0, 20.0, time, length);
            ori3.a = ori3.a * (flag3 * 2.0 - 1.5);
            // 应用蒙版
            float alpha = clamp(ori1.a + ori2.a + ori3.a + back.a * 0.01, 0.0, 1.0);
            basceColor.a = alpha*2.0;

            gl_FragColor = basceColor * clamp((2.0 - (length * 2.0 / radius)), 0.0, 1.0);
        }
    `,
    side: THREE.DoubleSide,
    transparent: true,
}

watch(
    () => props.color,
    (newVal) => {
        tsmConfig.uniforms.uColor.value = new THREE.Color(newVal)
    },
)

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    tsmConfig.uniforms.time.value = elapsed / 10 * props.speed
})
</script>
