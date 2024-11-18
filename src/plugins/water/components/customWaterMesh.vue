<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-05 16:39:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-18 10:22:57
-->
<template>
    <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2">
        <TresBoxGeometry :args="[5, 5, height, 64, 64, 1]" />
        <CustomShaderMaterialCom
            :baseMaterial="THREE.MeshPhysicalMaterial"
            :vertexShader="patchShaders(shader.vertex)"
            :fragmentShader="shader.fragment"
            :uniforms="uniforms"
            :side="THREE.DoubleSide"
            :roughness="0.2"
            :metalness="0.1"
            :flatShading="Flatshading"
            silent
        />
    </TresMesh>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial as CustomShaderMaterialCom } from '@tresjs/cientos'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

const props = withDefaults(
    defineProps<{
        height?: number
        Flatshading?: boolean
        waterColor?: string
        waterHighlight?: string
        brightness?: number
        baseMaterial?: any
    }>(),
    {
        height: 0.2,
        Flatshading: false,
        waterColor: '#52a7f7',
        waterHighlight: '#b3ffff',
        brightness: 1,
        baseMaterial: THREE.MeshPhysicalMaterial,
    },
)

import { patchShaders } from 'gl-noise/build/glNoise.m'

const tmRef = ref(null as any)

const shader = {
    vertex: `
uniform float uTime;
uniform float uHeight;
varying float vHeight;

vec3 displace(vec3 point) {
  vec3 p = point;
  p.y += uTime * 2.0;
  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.4, 1.0, 5, false, false);
  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);
  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);
  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);
  vec3 n = vec3(0.0);
  if(p.z >= uHeight / 2.0) {
      n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 0.5), fbmOpts));
      n += gln_GerstnerWave(p, A, uTime).xzy;
      n += gln_GerstnerWave(p, B, uTime).xzy * 0.5;
      n += gln_GerstnerWave(p, C, uTime).xzy * 0.25;
      n += gln_GerstnerWave(p, D, uTime).xzy * 0.2;
  }
  vHeight = n.z;
  return point + n;
}

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}

vec3 recalcNormals(vec3 newPos) {
  float offset = 0.001;
  vec3 tangent = orthogonal(normal);
  vec3 bitangent = normalize(cross(normal, tangent));
  vec3 neighbour1 = position + tangent * offset;
  vec3 neighbour2 = position + bitangent * offset;

  vec3 displacedNeighbour1 = displace(neighbour1);
  vec3 displacedNeighbour2 = displace(neighbour2);

  vec3 displacedTangent = displacedNeighbour1 - newPos;
  vec3 displacedBitangent = displacedNeighbour2 - newPos;

  return normalize(cross(displacedTangent, displacedBitangent));
}

void main() {
  csm_Position = displace(position);
  csm_Normal = recalcNormals(csm_Position);
}
	`,
    fragment: `
varying float vHeight;
uniform vec3 waterColor;
uniform vec3 waterHighlight;
uniform float offset;
uniform float contrast;
uniform float brightness;

vec3 calcColor() {
  float mask = (pow(vHeight, 2.) - offset) * contrast;
  vec3 diffuseColor = mix(waterColor, waterHighlight, mask);
  diffuseColor *= brightness;
  return diffuseColor;
}

void main() {
  csm_DiffuseColor = vec4(calcColor(), 1.0);
}
	`,
}
const uniforms = {
    uTime: { value: 0 },
    waterColor: {
        value: new THREE.Color(props.waterColor).convertLinearToSRGB(),
    },
    waterHighlight: {
        value: new THREE.Color(props.waterHighlight).convertLinearToSRGB(),
    },
    offset: {
        value: 0.4,
    },
    contrast: {
        value: 3.1,
    },
    brightness: {
        value: props.brightness,
    },
    uHeight: {
        value: props.height,
    },
}

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    uniforms.uTime.value = -elapsed / 5
})

watchEffect(() => {
    if (props.height) {
        uniforms.uHeight.value = props.height
    }
    if (props.waterColor) {
        uniforms.waterColor.value = new THREE.Color(props.waterColor).convertLinearToSRGB()
    }
    if (props.waterHighlight) {
        uniforms.waterHighlight.value = new THREE.Color(props.waterHighlight).convertLinearToSRGB()
    }
    if (props.brightness) {
        uniforms.brightness.value = props.brightness
    }
})
watch(
    () => props.Flatshading,
    (val) => {
        tmRef.value.material.needsUpdate = true
    },
)
watch(
    () => props.baseMaterial,
    (val) => {
        const material = new CustomShaderMaterial({
            baseMaterial: THREE[val],
            vertexShader: patchShaders(shader.vertex),
            fragmentShader: shader.fragment,
            uniforms: uniforms,
            flatShading: props.Flatshading,
            side: THREE.DoubleSide,
            roughness: 0.2,
            metalness: 0.1,
            silent: true,
        })
        tmRef.value.material.dispose()
        tmRef.value.material = material
    },
)
</script>
