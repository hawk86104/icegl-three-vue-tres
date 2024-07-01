<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-01 10:08:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-01 11:08:11
-->
<template>
    <TresMesh>
        <TresSphereGeometry :args="[1.0, 32, 32]" />
        <TresShaderMaterial v-bind="tsm" />
    </TresMesh>
</template>

<script lang="ts" setup>
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
        opacity?: number
        speed?: number
    }>(),
    {
        color: '#FFFFFF',
        opacity: 1.0,
        speed: 1.0,
    },
)

const tsm = {
    uniforms: {
        uTime: { value: 0.0 },
        pointNum: { value: new THREE.Vector2(32, 16) },
        uColor: { value: new THREE.Color(props.color) },
        uOpacity: { value: props.opacity },
    },
    transparent: true,
    vertexShader: `
					varying vec2 vUv;
                    void main(){
						vUv=uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }`,
    fragmentShader: `
					float PI = acos(-1.0);
                    uniform vec3 uColor;
                    uniform vec2 pointNum;
                    uniform float uTime;
                    varying vec2 vUv;
					uniform float uOpacity;
                    void main(){
						vec2 uv = vUv+ vec2(0.0, uTime);
						float current = abs(sin(uv.y * PI));
						if(current < sin(0.4714*PI)) {
							current=current*0.5;
						}
						float d = distance(fract(uv * pointNum*2.0), vec2(0.5, 0.5));

						if(d > current*0.2 ) {
							discard;
						} else {
							gl_FragColor =vec4(uColor,current*uOpacity);
						}
                    }`,
}

watch(
    () => [props.color, props.opacity],
    ([color, opacity]) => {
        tsm.uniforms.uColor.value = new THREE.Color(color)
        // @ts-ignore
        tsm.uniforms.uOpacity.value = opacity
    },
)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    tsm.uniforms.uTime.value += delta * 0.1 * props.speed
})
</script>
