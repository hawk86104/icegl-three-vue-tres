<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 16:50:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 17:04:01
-->
<template>
    <TresLineSegments :material="gm" :geometry="gg" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import noise from '../../shaders/lightNoise.glsl'

const props = withDefaults(
    defineProps<{
        globalUniforms: any
    }>(),
    {},
)

const gPos = []
const gEnds = []
const gCount = 20000
for (let i = 0; i < gCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(35)
    const y = THREE.MathUtils.randFloat(-5, 10)
    const z = THREE.MathUtils.randFloatSpread(35)
    const len = THREE.MathUtils.randFloat(0.25, 0.5)
    gPos.push(x, y, z, x, y, z)
    gEnds.push(0, len, 1, len)
}
const gg = new THREE.BufferGeometry()
gg.setAttribute('position', new THREE.Float32BufferAttribute(gPos, 3))
gg.setAttribute('gEnds', new THREE.Float32BufferAttribute(gEnds, 2))
const gm = new THREE.LineBasicMaterial({
    color: 0x884488,
    transparent: true,
    // @ts-ignore
    onBeforeCompile: (shader) => {
        shader.uniforms.time = props.globalUniforms.time
        shader.uniforms.noiseTex = props.globalUniforms.noise
        shader.uniforms.globalBloom = props.globalUniforms.globalBloom
        shader.vertexShader = `
      uniform float time;
      uniform sampler2D noiseTex;
      attribute vec2 gEnds;
      varying float vGEnds;
      varying float vH;

      ${shader.vertexShader}
    `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
        
      vec3 pos = position;
      
      vec2 nUv = (vec2(pos.x, -pos.z) - vec2(-25.)) / 50.;
      float h = texture2D(noiseTex, nUv).g;
      h = (h - 0.5) * 4.;
      
      pos.y = -mod(10. - (pos.y - time * 5.), 15.) + 10.;
      h = pos.y - h;
      pos.y += gEnds.x * gEnds.y;
      transformed = pos;
      vGEnds = gEnds.x;
      vH = smoothstep(3., 0., h);
      `,
        )
        shader.fragmentShader = `
      uniform float time;
      uniform float globalBloom;
      varying float vGEnds;
      varying float vH;
      ${noise}
      ${shader.fragmentShader}
    `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
      float op = 1. - vGEnds;
      op = pow(op, 3.);
      float h = (pow(vH, 3.) * 0.5 + 0.5);
      vec3 col = diffuse * h; // lighter close to the surface
      col *= 1. + smoothstep(0.99, 1., h); // sparkle at the surface
      if (globalBloom > 0.5) {
        //col *= 0.5;
      }
      vec4 diffuseColor = vec4( col, op );
      
      `,
        )
    },
})
</script>
