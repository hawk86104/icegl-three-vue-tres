<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:23:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-26 11:03:00
-->

<template>
    <TresMesh ref="tmRef">
        <TresBoxGeometry :args="[1000, 1000, 1000]" />
        <TresShaderMaterial v-bind="tsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { ref, watchEffect } from 'vue'
import { useTexture, useTresContext, useRenderLoop } from '@tresjs/core'

const props = withDefaults(defineProps<{
    texture: string
}>(), {

})

const tmRef = ref()
const { map: pTexture } = await useTexture({ map: props.texture })
pTexture.wrapS = pTexture.wrapT = THREE.ClampToEdgeWrapping
pTexture.generateMipmaps = false
pTexture.magFilter = THREE.LinearFilter
pTexture.minFilter = THREE.LinearFilter

const tsMaterial = {
    uniforms: {
        uSkybox: { type: "t", value: pTexture }
    },
    side: THREE.BackSide,
    vertexShader: `
      varying vec3 vFragPos;

      void main() {
          vFragPos = position.xyz;
          vec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);
          viewSpace.w = 1.0;
          gl_Position = projectionMatrix * viewSpace;    
      }`,

    fragmentShader: `
      uniform sampler2D uSkybox;
      varying vec3 vFragPos;
      const float PI = 3.14159265359;
      void main() {
          vec3 dir = normalize(vFragPos);
          float v = (asin(dir.y) + PI * 0.5) / (PI); 
          float u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);
          gl_FragColor = texture2D(uSkybox, vec2(u, v));
      }`,
    depthWrite: true,
}

// const skyBoxCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100)
// const { scene, camera, renderer } = useTresContext()

// // const skyScene = new THREE.Scene()

// // const geometry1 = new THREE.BoxGeometry(1, 1, 1)
// // const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// // const mesh1 = new THREE.Mesh(geometry1, material1)
// // mesh1.position.set(1, 1, 1)
// // scene.value.add(mesh1)

// const { onBeforeLoop } = useRenderLoop()
// onBeforeLoop(() => {
//     if (camera.value) {
//         // var vector = new THREE.Vector3(0, 0, - 1)
//         // vector.applyQuaternion(camera.value.quaternion)
//         // skyBoxCamera.lookAt(vector)
//         // renderer.value.setRenderTarget(null)
//         // renderer.value.render(skyScene, skyBoxCamera)
//     }
// })

// watchEffect(() => {
//     if (tmRef.value) {
//         // skyScene.add(tmRef.value.clone())
//         // tmRef.value.visible = false
//         // tmRef.value.name = 'skybox'
//         // scene.value.getObjectByName('skybox')
//         // scene.value.remove(scene.value.getObjectByName('skybox'))
//         // scene.value.remove(tmRef.value)
//         // tmRef.value.removeFromParent()
//     }
// })
</script>