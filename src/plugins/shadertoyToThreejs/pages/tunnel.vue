<!--
 * @Descripttion: 光线追踪实例，想学习每行代码的逻辑，请联系ICE社区-Jsonco
 * @version: 
 * @Author: Jsonco
 * @Date: 2024-09-13 20:27:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2024-09-13 20:53:21
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <TresMesh ref="quanMeshRef" :position="[0, 100, 0]" :rotation-x="((2 * Math.PI) / 360) * 90">
            <TresPlaneGeometry :args="[1000, 1000]" />
            <TresShaderMaterial v-bind="Material"></TresShaderMaterial>
        </TresMesh>
        <TresAxesHelper :args="[1000]" :position="[0, 19, 0]" />
        <TresGridHelper :args="[6000, 100]" :position="[0, 19, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core' //useRenderLoop
import { OrbitControls } from '@tresjs/cientos'
import { AdditiveBlending, DoubleSide } from 'three'
import stringVertex from '../shaders/argestCircle.vert?raw'
const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
}
const controlsState = { autoRotate: true, enableDamping: true }
const stringFrag = `
varying vec2 vUv;
uniform float uTime;
vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(sin(uTime * 0.2) * 0.5 + 0.5, cos(uTime * 0.25) * 0.5 + 0.5, sin(uTime * 0.3 + 1.0) * 0.5 + 0.5);
    
    return a + b * cos(6.28318 * (c * t + d));
}

void main(){
    vec2 uv = vUv-vec2(0.5);
    
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    
    int sides = int(5.0 + 4.0 * sin(uTime * 0.5)); 
    angle = mod(angle, 6.28318 / float(sides)) * float(sides);
    
    vec2 uv0 = vec2(radius, angle);
    vec3 finalColor = vec3(0.0);
    
    for(float i = 0.0; i < 5.0; i++) {
        uv0.x = fract(uv0.x * (1.5 + 0.1 * sin(uTime)));
        
        float d = uv0.x * exp(-radius);

        vec3 col = palette(uv0.x + i * 0.4 + uTime * 0.4);

        d = sin(d * (8.0 + 4.0 * sin(uTime * 0.1)) + uTime) / 8.0;
        d = abs(d);

        d = pow(0.01 / d, 1.2 + 0.1 * sin(uTime));

        finalColor += col * d;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`
const Material = {
    uniforms: {
        uTime: { type: 'f', value: 0.0 },
    },
    vertexShader: stringVertex,
    fragmentShader: stringFrag,
    side: DoubleSide,
    blending: AdditiveBlending,
    depthWrite: false,
    transparent: true,
}
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    Material.uniforms.uTime.value += delta
})
</script>
