<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-24 10:36:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-24 16:47:19
-->

<template>
    <TresGroup>
        <TresPoints :rotateX="-Math.PI / 2" :scale="0.1">
            <TresBufferGeometry :position="[geoPosList, 3]" :aIndex="[aIndex, 1]" :aNormal="[aNormals, 3]" />
            <CustomShaderMaterial
                :baseMaterial="THREE.PointsMaterial"
                :vertexShader="vertex"
                :fragmentShader="fragment"
                :uniforms="uniforms"
                :map="pTexture[0]"
                :alphaMap="pTexture[0]"
                transparent
                :depthWrite="false"
                :blending="THREE.AdditiveBlending"
                color="#409eff"
                :size="0.1"
            />
        </TresPoints>
    </TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { CustomShaderMaterial } from '@tresjs/cientos'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { useAttrs, watch } from 'vue'

const attrs = useAttrs()
const props = defineProps({
    height: {
        default: 1.6,
    },
    speed: {
        default: 1,
    },
    color: {
        default: '#90ee90',
    },
})

const pTexture = await useTexture(['./plugins/basic/shine/image/round.png', './plugins/digitalCity/image/noise/noisePerlin.png'])

const curve = new THREE.EllipseCurve(0, 0, 8, 8, 0, 2 * Math.PI, false, 0)
const pointsPos = []

for (let i = 0; i < 5; i++) {
    pointsPos.push(...curve.getPoints(719))
    curve.xRadius += 0.2
    curve.yRadius += 0.2
}

const aIndex = new Float32Array(pointsPos.map((_, index) => index))
const geometry = new THREE.BufferGeometry().setFromPoints(pointsPos)

const geoPosList = geometry.getAttribute('position').array
const aNormals = new Float32Array(geoPosList.length)

for (let i = 0; i < geoPosList.length / 3; i++) {
    const i3 = i * 3
    geoPosList[i3 + 1] += Math.floor(i / 720) * 0.15
    const baseIndex = (i % 720) * 3
    const offsetIndex = ((i % 720) + 720 * 4) * 3
    aNormals[i3] = geoPosList[offsetIndex] - geoPosList[baseIndex]
    aNormals[i3 + 1] = geoPosList[offsetIndex + 1] - geoPosList[baseIndex + 1]
    aNormals[i3 + 2] = geoPosList[offsetIndex + 2] - geoPosList[baseIndex + 2]
}

const uniforms = {
    uTime: { value: 0 },
    uScale: { value: attrs.scale ? attrs.scale : 1 },
    uHeight: { value: props.height },
    uPerlinTexture: { value: pTexture[1] },
    baseColor: { value: new THREE.Color(props.color) },
}

const vertex = `
varying vec2 vMapUv;
attribute float aIndex;
attribute vec3 aNormal;
uniform float uTime;
uniform float uScale;
uniform float uHeight;
uniform sampler2D uPerlinTexture;
varying float vIndex;
varying float vSelfIndex;
varying float vCircleNum;
float getStrength(float aIndex, float uTime, vec3 aNormal) {
    float selfIndex = mod(aIndex, 720.0);
    float circleNum = (aIndex - selfIndex) / 720.0;
    vec3 pDir = normalize(aNormal);
    float waveWidth = 90.0;
    float totalLength = 720.0;
    float modUtime = mod(uTime * 50.0, 720.0);
    float dw = waveWidth * 0.5;
    float smoothStart = smoothstep(modUtime, modUtime + dw, selfIndex);
    float smoothEnd = 1.0 - smoothstep(modUtime + waveWidth - dw, modUtime + waveWidth, selfIndex);
    float strength = min(smoothStart, smoothEnd);
    float isOver = step(720.0, modUtime + waveWidth);
    float over = (modUtime + waveWidth - 720.0);
    float isOverStep1 = (1.0 - step(dw, over)) * isOver;
    float isOverStep2 = step(dw, over);
    float overStep1Left = min(smoothstep(modUtime, modUtime + dw, selfIndex), (1.0 - smoothstep(modUtime + waveWidth - dw, modUtime + waveWidth, selfIndex)));
    float overStep1Right = 1.0 - smoothstep(modUtime + waveWidth - dw, modUtime + waveWidth, selfIndex + 720.0);
    float overStep1 = max(overStep1Left, overStep1Right);
    float overStep2Left = smoothstep(modUtime, modUtime + dw, selfIndex);
    float overStep2Right = min(smoothstep(modUtime, modUtime + dw, selfIndex + 720.0), (1.0 - smoothstep(modUtime + waveWidth - dw, modUtime + waveWidth, selfIndex + 720.0)));
    float overStep2 = max(overStep2Left, overStep2Right);
    float os = isOverStep1 * overStep1 + overStep2 * isOverStep2;
    strength = (1.0 - isOver) * strength + isOver * os;
    return strength;
}
void main() {
	vMapUv = uv;
	float selfIndex = mod(aIndex, 720.0);
	float circleNum = (aIndex - selfIndex) / 720.0;
	vec3 pDir = normalize(aNormal);
	float noise = texture(uPerlinTexture, vec2((selfIndex / 720.0), mod(uTime * 0.1, 1.0))).r;
	float strength = getStrength(aIndex, uTime, aNormal);
	strength += getStrength(aIndex, uTime + 10.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 20.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 30.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 40.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 50.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 60.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 70.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 80.0 + noise, aNormal);
	strength += getStrength(aIndex, uTime + 90.0 + noise, aNormal);
	csm_Position.x += pDir.x * strength * 0.5;
	csm_Position.z += strength * circleNum * noise * uHeight;
	csm_Position.y += pDir.z * strength * 0.5;
	vIndex = aIndex;
	csm_PointSize = 0.01*uScale;
}
`

const fragment = `
varying vec2 vMapUv;
varying float vIndex;
uniform float uTime;
uniform vec3 baseColor;
uniform sampler2D uPerlinTexture;
void main() {
	vec3 whiteColor = vec3( 1.0,1.0,1.0);
	float selfIndex=mod(vIndex,720.0);
	float circleNum=(vIndex - selfIndex)/720.0;
	vec3 finalColor=mix(baseColor,diffuse,circleNum/5.0);
	finalColor*=1.0;
	csm_DiffuseColor = vec4( finalColor, opacity );
}
`

const { onLoop } = useRenderLoop()
onLoop(() => {
    uniforms.uTime.value += 0.01 * props.speed
})

watch(
    () => [props.color, attrs.scale, props.height],
    ([color, scale, height]) => {
			uniforms.baseColor.value.set(color)
			uniforms.uScale.value = scale
			uniforms.uHeight.value = height
    },
)
</script>
