<template>
    <TresMesh :geometry="lGeometry" :material="lMaterial" />
    <TresMesh :material="pMaterial">
        <TresPlaneGeometry :args="[50, 50, 500, 500]" :rotateX="-Math.PI * 0.5" />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        globalUniforms: any
    }>(),
    {},
)

const luces = [] as any
const lucesInit = [] as any
const instCount = 100
const sphereGeometry = new THREE.SphereGeometry(1, 36, 18) as any
const lGeometry = new THREE.InstancedBufferGeometry().copy(sphereGeometry)
lGeometry.instanceCount = instCount
const instData = []
for (let i = 0; i < instCount; i++) {
    let x = THREE.MathUtils.randFloatSpread(49)
    let z = THREE.MathUtils.randFloatSpread(49)
    let scale = THREE.MathUtils.randFloat(0.0625, 0.125)
    let ldist = THREE.MathUtils.randFloat(1, 3)
    instData.push(x, z, scale)
    lucesInit.push(new THREE.Vector4(x, z, ldist, THREE.MathUtils.randFloat(1, 2)))
    luces.push(new THREE.Vector4(x, z, scale, ldist))
}
lGeometry.setAttribute('instData', new THREE.InstancedBufferAttribute(new Float32Array(instData), 3))

const lMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2222,
    // @ts-ignore
    onBeforeCompile: (shader) => {
        shader.uniforms.noiseTex = props.globalUniforms.noise
        shader.vertexShader = `
      uniform sampler2D noiseTex;
      attribute vec4 instData;
      ${shader.vertexShader}
    `.replace(`#include <begin_vertex>`,
      `#include <begin_vertex>
      transformed = position * instData.z;
      
      transformed.x += instData.x;
      transformed.z += instData.y;
      vec2 nUv = (vec2(instData.x, -instData.y) - vec2(-25.)) / 50.;
      float h = texture2D(noiseTex, nUv).g;
      h = (h - 0.5) * 4.;
      transformed.y += h;
      `,)
    },
})

const planeUniforms = {
    luces: { value: luces },
}
const pMaterial = new THREE.MeshLambertMaterial({
    color: 0x241224,
    // @ts-ignore
    onBeforeCompile: (shader: any) => {
        shader.uniforms.luces = planeUniforms.luces
        shader.uniforms.globalBloom = props.globalUniforms.globalBloom
        shader.uniforms.noiseTex = props.globalUniforms.noise
        shader.vertexShader = `
      uniform float time;
      uniform sampler2D noiseTex;
      varying vec3 vPos;
      varying float intensity;
      
      //// https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989/8 ///
      
      // the function which defines the displacement
      float displace(vec2 vUv) {
        return (texture2D(noiseTex, vUv).g - 0.5) * 4.;
      }

      vec3 getNormal(vec2 vUv){
        vec3 displacedPosition = position + normal * displace(vUv);

        float texelSize = 1.0 / 512.0; // temporarily hardcoding texture resolution
        float offset = 0.1;

        vec3 neighbour1 = position + vec3(1., 0., 0.) * offset;
        vec3 neighbour2 = position + vec3(0., 0., 1.) * offset;
        vec2 neighbour1uv = vUv + vec2(-texelSize, 0);
        vec2 neighbour2uv = vUv  + vec2(0, -texelSize);
        vec3 displacedNeighbour1 = neighbour1 + normal * displace(neighbour1uv);
        vec3 displacedNeighbour2 = neighbour2 + normal * displace(neighbour2uv);

        // https://i.ya-webdesign.com/images/vector-normals-tangent-16.png
        vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
        vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;

        // https://upload.wikimedia.org/wikipedia/commons/d/d2/Right_hand_rule_cross_product.svg
        vec3 displacedNormal = normalize(cross(displacedBitangent, displacedTangent));
        return displacedNormal;
      }
      
      ${shader.vertexShader}
    `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>

        float h = texture2D(noiseTex, uv).g;
        intensity = h;
        h = (h - 0.5) * 4.;
        transformed.y = h;
        vPos = transformed;
        transformedNormal = normalMatrix * getNormal(uv);
      `,
        )
        shader.fragmentShader = `
      uniform vec4 luces[${instCount}];
      uniform sampler2D noiseTex;
      uniform float globalBloom;
      varying vec3 vPos;
      varying float intensity;

      ${shader.fragmentShader}
    `
            .replace(
                `#include <fog_fragment>`,
                `
        vec3 col = vec3(1, 0, 0)*0.75;
        float intensity = 0.;
        for(int i = 0;i < ${instCount}; i++){
          vec4 lux = luces[i];
          vec2 luxUv = (vec2(lux.x, -lux.y) - vec2(-25.)) / 50.;
          float h = texture2D(noiseTex, luxUv).g;
          h = (h - 0.5) * 4.;
          vec3 lightPos = vec3(lux.x, h, lux.y);
          float currIntensity = smoothstep(lux.z + lux.w, lux.z, distance(vPos, lightPos));
          intensity += pow(currIntensity, 16.);
        }
        intensity = clamp(intensity, 0., 1.);
        col = mix(col * 0.5, col, intensity);
        col = mix(gl_FragColor.rgb, col, intensity);
        col += vec3(1) * intensity * 0.01;
        gl_FragColor = vec4( col, opacity );
        #include <fog_fragment>
      `,
            )
            .replace(
                `#include <dithering_fragment>`,
                `#include <dithering_fragment>
        if (globalBloom > 0.5) {
          gl_FragColor = vec4(0);
        }
      `,
            )
    },
})

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    for (let i = 0; i < instCount; i++) {
        const li = lucesInit[i]
        let z = ((li.y + elapsed + 25) % 50) - 25
        luces[i].y = z
        luces[i].w = (Math.sin(elapsed * li.w * ((i % 3) + 1)) * Math.cos(elapsed * li.w * ((i % 5) + 1)) * 0.25 + 0.25) * li.z + li.z * 0.75
        lGeometry.attributes.instData.setY(i, z)
    }
    lGeometry.attributes.instData.needsUpdate = true
})
</script>
