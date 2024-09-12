threshold
<template>
    <TresMesh :renderOrder="2200">
        <TresSphereGeometry :args="[props.radius, 64, 64]" />
        <TresShaderMaterial v-bind="shader" />
    </TresMesh>
</template>

<script setup lang="ts">
import { toRaw, watch } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { useFBO } from 'PLS/basic'
import * as THREE from 'three'

const props = withDefaults(
    defineProps<{
        radius?: number
        shieldColor?: string
        rimColor?: string
        threshold?: number
    }>(),
    {
        radius: 100,
        shieldColor: '#ffff00',
        rimColor: '#ffffff',
        threshold: 0.005,
    },
)

const { sizes, camera } = useTresContext()
const dpr = sizes.aspectRatio.value
const widths = sizes.width.value
const heights = sizes.height.value
const ws = widths * dpr
const hs = heights * dpr
const fbo = useFBO({ height: ws, width: hs, depth: true, isLoop: true }) //autoRender
const shader = {
    blending: THREE.NormalBlending,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    // depthTest: true,
    vertexShader: `
	varying vec2 vUv;
	varying vec3 vNormal;
	varying vec3 vPosition;
	void main() {
		vUv = uv;
		vec4 worldPos = modelMatrix * vec4(position, 1.0);
		vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
		vec4 mvPosition = viewMatrix * worldPos;
		gl_Position = projectionMatrix * mvPosition;
		vNormal = modelNormal.xyz;
		vPosition = worldPos.xyz;
	}
  `,
    fragmentShader: `
uniform sampler2D uDepthTexture; 
uniform vec2 uResolution;
uniform float uNear;
uniform float uFar;
uniform float uThreshold;
uniform vec3 uShieldColor;
uniform vec3 uRimColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

#include <packing>

float LinearizeDepth(float depth) {
	float zNdc = 2.0 * depth - 1.0;
	float zEye = (2.0 * uFar * uNear) / ((uFar + uNear) - zNdc * (uFar - uNear));
	float linearDepth = (zEye - uNear) / (uFar - uNear);
	return linearDepth;
}

void main() {

  vec3 normal = normalize(vNormal);
  if(gl_FrontFacing) {
    normal *= -1.0;
  }

  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = 1. + dot(normal, viewDirection);
  fresnel = pow(fresnel, 4.0);

  vec2 worldCoords = gl_FragCoord.xy/uResolution;

  float sceneDepth = LinearizeDepth(texture2D(uDepthTexture, worldCoords).r);
  float bubbleDepth = LinearizeDepth(gl_FragCoord.z);

  float difference = abs( sceneDepth - bubbleDepth);
  float normalizedDistance = clamp(difference / uThreshold, 0.0, 1.0);
  vec4 intersection = mix(vec4(1.0), vec4(0.0), normalizedDistance) ;
  intersection.rgb *= uRimColor;
  vec4 color = vec4(uShieldColor, 0.3);
  gl_FragColor = color + intersection + vec4(uRimColor, 1.0) * fresnel ;
}
  `,
    uniforms: {
        uDepthTexture: { value: toRaw(fbo?.value?.depthTexture) },
        uResolution: { value: new THREE.Vector2(widths, heights) },
        uNear: {
            value: 1, //camera.value?.near,
        },
        uFar: {
            value: 10000, //camera.value?.far,
        },
        uThreshold: {
            value: 0.005,
        },
        uShieldColor: { value: new THREE.Color(props.shieldColor) },
        uRimColor: { value: new THREE.Color(props.rimColor) },
    },
}

const { onLoop } = useRenderLoop()
onLoop(() => {
    // debugger
    // camera
    // shader.uniforms.uDepthTexture.value = toRaw(fbo?.value?.depthTexture)
})

watch(
    () => [props.rimColor, props.shieldColor, props.threshold],
    ([rimColor, shieldColor, threshold]) => {
        shader.uniforms.uRimColor.value.setStyle(rimColor)
        shader.uniforms.uShieldColor.value.setStyle(shieldColor)
        shader.uniforms.uThreshold.value = threshold
    },
)
</script>
