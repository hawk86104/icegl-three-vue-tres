<template>
    <lucesPlane :globalUniforms="globalUniforms" />
    <portal :globalUniforms="globalUniforms" />
    <drops :globalUniforms="globalUniforms" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import noise from '../../shaders/lightNoise.glsl'
import lucesPlane from './lucesPlane.vue'
import portal from './portal.vue'
import drops from './drops.vue'
import { watch } from 'vue'

const globalUniforms = {
    time: { value: 0 },
    globalBloom: { value: 0 },
    noise: { value: null as any },
}

const renderTarget = new THREE.WebGLRenderTarget(512, 512)
const rtScene = new THREE.Scene()
const rtCamera = new THREE.Camera()
const rtGeo = new THREE.PlaneGeometry(2, 2)
const rtMat = new THREE.MeshBasicMaterial({
    // @ts-ignore
    onBeforeCompile: (shader) => {
        shader.uniforms.time = globalUniforms.time
        shader.fragmentShader = `
      uniform float time;
      ${noise}
      ${shader.fragmentShader}
    `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
        vec3 col = vec3(0);
        float h = clamp(smoothNoise2(vUv * 50.), 0., 1.);
        col = vec3(h);
        vec4 diffuseColor = vec4( col, opacity );
      `,
        )
    },
})
rtMat.defines = { USE_UV: '' }
const rtPlane = new THREE.Mesh(rtGeo, rtMat)
rtScene.add(rtPlane)
globalUniforms.noise.value = renderTarget.texture

const { camera, renderer, scene, sizes, controls } = useTresContext()

watch(
    () => controls.value,
    (v: any) => {
        v?.target.set(0, 2, 0)
        if (!scene.value.background) {
            scene.value.background = new THREE.Color(0x665566)
        }
    },
)

const bloomComposer = new EffectComposer(renderer.value)
const finalComposer = new EffectComposer(renderer.value)

const renderScene = new RenderPass(scene.value, camera.value)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width.value, sizes.height.value), 1.2, 0.5, 0)

bloomComposer.renderToScreen = false
bloomComposer.addPass(renderScene)
bloomComposer.addPass(bloomPass)

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
								varying vec2 vUv;
								void main() {
									vUv = uv;
									gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
								}`,
        fragmentShader: `
								uniform sampler2D baseTexture;
								uniform sampler2D bloomTexture;
								varying vec2 vUv;
								void main() {
									gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
								}`,
        defines: {},
    }),
    'baseTexture',
)
finalPass.needsSwap = true

finalComposer.addPass(renderScene)
finalComposer.addPass(finalPass)

scene.value.fog = new THREE.Fog(0x665566, 1, 25)

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    globalUniforms.time.value = elapsed

    if (renderer.value) {
        renderer.value.setRenderTarget(renderTarget)
        renderer.value.render(rtScene, rtCamera)
        renderer.value.setRenderTarget(null)

        globalUniforms.globalBloom.value = 1.2
        scene.value.fog.color.set(0x000000)
        scene.value.fog.near = 15
        scene.value.background?.set(0x000000)

        bloomComposer.render()

        globalUniforms.globalBloom.value = 0
        scene.value.fog.color.set(0x665566)
        scene.value.fog.near = 10
        scene.value.background?.set(0x665566)

        finalComposer.render()
    }
})
</script>
