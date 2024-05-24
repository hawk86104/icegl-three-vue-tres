<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-24 16:54:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-24 18:21:25
-->
<script setup lang="ts">
import * as THREE from 'three'
import { C as CustomShaderMaterial } from './vanilla.esm.5.5.0.js'
import { watchEffect } from 'vue'
//@ts-ignore
import perlin from './perlin.frag'
//@ts-ignore
import voronoise from './voronoise.frag'

const props = withDefaults(
    defineProps<{
        color?: string
        metalness?: number
        roughness?: number
        clearcoat?: number
        clearcoatRoughness?: number
    }>(),
    {
        color: '#ff00fc',
        metalness: 1,
        roughness: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
    },
)

const materialProps = {
    baseMaterial: THREE.MeshPhysicalMaterial,
    metalness: props.metalness,
    roughness: props.roughness,
    clearcoat: props.clearcoat,
    clearcoatRoughness: props.clearcoatRoughness,
    color: props.color,
    vertexShader: `
			varying vec3 csm_vPosition;
			varying vec3 csm_vWorldNormal;
			varying vec3 csm_vWorldViewDirection;
			varying vec4 csm_vGlPosition;

			void main() {
					csm_vWorldNormal = normalize((modelMatrix * vec4(normal.xyz, 0.0)).xyz);
					csm_vWorldViewDirection = normalize(cameraPosition - (modelMatrix * vec4(position.xyz, 0.0)).xyz) ;

					csm_vGlPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					csm_vPosition = position;
			}`,
    fragmentShader: `
			${voronoise}
      ${perlin}
			varying vec3 csm_vPosition;
			varying vec3 csm_vWorldNormal;
			varying vec3 csm_vWorldViewDirection;
			varying vec4 csm_vGlPosition;

      uniform vec3 uFleckColor;

      const float fresnel_Power = 1.0;

      float fresnel() {
          return pow(1.0 - dot(csm_vWorldNormal, csm_vWorldViewDirection), fresnel_Power);
      }

      float mapLinear(float x, float a1, float a2, float b1, float b2) {
          return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
      }

      void main() {
      // Fresnel
      float fresnelFactor = fresnel();

      // Fleck
      float fleckFactor = voronoi3d(csm_vPosition * 2000.0).y;
      float fleckFactorY = voronoi3d(csm_vPosition * 2000.0 + 100.0).y;
      float fleckFactorZ = voronoi3d(csm_vPosition * 2000.0 + 200.0).y;

      // Distance from camera
      float normalizedDist = csm_vGlPosition.z / csm_vGlPosition.w;
      normalizedDist = smoothstep(0.6, 1.0, normalizedDist);
      // normalizedDist *= fresnelFactor;

      // Fade out flecks as we get further away
      float nonDistanceFleckFactor = fleckFactor;
      fleckFactor *= 1.0 - normalizedDist;

      // Diffuse
      float diffuseFactor = csm_DiffuseColor.g;
      float roughnessFactor2 = fleckFactor;

      roughnessFactor2 = mapLinear(roughnessFactor2, 0.0, 1.0, 0.4, 0.8);
      csm_Roughness = roughnessFactor2;

      // Color
      float fresnelColorFactor = smoothstep(0.0, 1.0, clamp(fresnelFactor, 0.0, 0.4));
      vec3 fresnelColor = mix(csm_DiffuseColor.rgb, uFleckColor, fresnelColorFactor);
      csm_DiffuseColor = vec4(fresnelColor, 1.0);

      float fleckColorFactor = smoothstep(0.99, 0.992, fleckFactor);

      // Orange peel
      float orangePeelFactorX = pnoise(csm_vPosition * 1000.0);
      float orangePeelFactorY = pnoise(csm_vPosition * 1000.0 + 100.0);
      float orangePeelFactorZ = pnoise(csm_vPosition * 1000.0 + 200.0);
      vec3 orangePeelFactor = vec3(orangePeelFactorX, orangePeelFactorY, orangePeelFactorZ);

      csm_ClearcoatNormal = orangePeelFactor * 0.01 * (1.0 - normalizedDist);
      // csm_Clearcoat = 10.0;
      // csm_ClearcoatRoughness = 0.0;

      csm_Bump = vec3(fleckFactor, fleckFactorY, fleckFactorZ) * 1.0 * (1.0 - normalizedDist);
      }
		`,
}
//@ts-ignore
const material = new CustomShaderMaterial(materialProps)

watchEffect(() => {
    material.color.setStyle(props.color)
    material.metalness = props.metalness
    material.roughness = props.roughness
    material.clearcoat = props.clearcoat
    material.clearcoatRoughness = props.clearcoatRoughness
})
</script>

<template>
    <primitive :object="material" />
</template>
