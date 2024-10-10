<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 16:38:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 17:37:36
-->
<template>
    <TresMesh :material="pMaterial" :position="[0, 1.25+2.5, -12]">
        <TresPlaneGeometry :args="[5, 5]" />
    </TresMesh>
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

const pMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6633,
    transparent: true,
    // @ts-ignore
    onBeforeCompile: (shader) => {
        shader.uniforms.time = props.globalUniforms.time
        shader.uniforms.globalBloom = props.globalUniforms.globalBloom
        shader.fragmentShader = `
      #define S(a, b, t) smoothstep(a, b, t)
      uniform float time;
      uniform float globalBloom;
      
      ${noise}
      
      float getTri(vec2 uv, float shift){
        uv = uv * 2.-1.;
        float a = atan(uv.x + shift,uv.y) + 3.1415926;
        float r = 3.1415926 * 2./3.;
        return cos(floor(.5+a/r)*r-a)*length(uv);
      }
      
      float doubleTri(vec2 uv, float still, float width){
        vec2 baseUv = uv;
        vec2 e2 = fwidth(baseUv * 20.);
        float e = min(e2.x, e2.y) * width;
        float baseTri = getTri(baseUv, cos(baseUv.y * 31. + time) * sin(baseUv.y * 27. + time * 4.) * 0.025 * still);
        float td = abs(fract(baseTri * 20.) - 0.5);
        float tri = S(e, 0., td) - S(0., e, td);
        tri *= step(0.4, baseTri) -  step(0.5, baseTri);
        return tri;
      }
      
      ${shader.fragmentShader}
    `
            .replace(
                `vec4 diffuseColor = vec4( diffuse, opacity );`,
                `
        float tri = doubleTri(vUv, 0.0, 16.);
        float triWave = doubleTri(vUv, 1.0, 8.);
        float fullTri = max(tri, triWave);
        
        if (fullTri < 0.5) discard;
        
        vec3 col = mix(diffuse, vec3(0.75), fullTri);
        
        float blinking = smoothNoise(vec2(time, time * 5.));
        blinking = blinking * 0.9 + 0.1;
        
        vec4 diffuseColor = vec4(col * blinking, fullTri);
      `,
            )
            .replace(
                `#include <dithering_fragment>`,
                `#include <dithering_fragment>
        if (globalBloom > 0.5) {
          gl_FragColor = vec4(gl_FragColor.rgb * 0.375, fullTri);
        }
      `,
            )
    },
})
pMaterial.defines = { USE_UV: '' }
// pMaterial.extensions = { derivatives: true }

</script>
