<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-30 08:04:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-30 08:20:05
-->
<template>
    <TresMesh>
        <TresSphereGeometry :args="[1, 32, 32, 0, phiLength, 0, thetaLength]" />
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
        phiLength?: number
        thetaLength?: number
    }>(),
    {
        color: '#FFFFFF',
        opacity: 1.0,
        speed: 1.0,
        phiLength: 2 * Math.PI,
        thetaLength: Math.PI,
    },
)

const tsm = {
    uniforms: {
        iTime: { value: 1.0 },
        smokeStrengthScale: { value: 1.0 },
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
		precision highp float;
		varying vec2 vUv;
		uniform float iTime;
		uniform float smokeStrengthScale;
		uniform vec3 uColor;
		uniform float uOpacity;
		float R21 (vec2 p) {
			return fract(sin(dot(p.xy, vec2(2.3245,5.234)))*123.5632145);
		}
		float NoiseValue (vec2 uv) {
			vec2 gv = fract(uv);
			vec2 id = floor(uv);
			gv = gv * gv * (3. - 2. * gv);
			float a = R21(id);
			float b = R21(id + vec2(1., 0.));
			float c = R21(id + vec2(0., 1.));
			float d = R21(id + vec2(1., 1.));
		
			return mix(a, b, gv.x) + (c - a)* gv.y * (1. - gv.x) + (d - b) * gv.x * gv.y;
		}
		float SmoothNoise (vec2 uv) {
		
			float value = 0.;
			float amplitude = .5;
		
			for (int i = 0; i < 8; i++) {
				value += NoiseValue(uv) * amplitude;
				uv *= 2.;
				amplitude *= .5;
			}
			
			return value;
		}
		void main() {
			vec2 uv = 1.0 - vUv;
			vec3 col = vec3(0.);
			vec3 smokeCol = uColor;
			vec2 rn = vec2(0.5, 0.5);
			rn.x = SmoothNoise(uv + 1.984 * vec2(1.7,9.2)+ 0.158*iTime );
			rn.y = SmoothNoise(uv + 1. * vec2(8.3,2.8)+ 0.126*iTime);
			float smokeStrength = smoothstep(0.0, 1.0, SmoothNoise(uv+rn*2.5));
			gl_FragColor = vec4(smokeCol, smokeStrength * smokeStrengthScale * uOpacity);
		}
		`,
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
    tsm.uniforms.iTime.value += delta * props.speed
})
</script>
