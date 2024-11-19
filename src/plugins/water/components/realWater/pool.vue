<template></template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import vertexShader from '../../shaders/pool/vertex.glsl'
import fragmentShader from '../../shaders/pool/fragment.glsl'

const props = defineProps<{
    waterTexture: THREE.Texture
    causticsTexture: THREE.Texture
    tiles: THREE.Texture
    light: Array<number>
}>()

const _geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
    -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1,
    -1, 1, 1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1,
])
const indices = new Uint32Array([0, 1, 2, 2, 1, 3, 4, 5, 6, 6, 5, 7, 12, 13, 14, 14, 13, 15, 16, 17, 18, 18, 17, 19, 20, 21, 22, 22, 21, 23])

_geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
_geometry.setIndex(new THREE.BufferAttribute(indices, 1))

const _material = new THREE.RawShaderMaterial({
    uniforms: {
        light: { value: props.light },
        tiles: { value: props.tiles },
        water: { value: null },
        causticTex: { value: null },
    },
    vertexShader,
    fragmentShader,
    side: THREE.FrontSide,
})

const _mesh = new THREE.Mesh(_geometry, _material)

const { renderer, camera } = useTresContext() as any
const draw = (waterTexture: any, causticsTexture: any) => {
    _material.uniforms['water'].value = waterTexture
    _material.uniforms['causticTex'].value = causticsTexture
    renderer.value.render(_mesh, camera.value)
}

const { onAfterLoop } = useRenderLoop()
onAfterLoop(() => {
    draw(props.waterTexture, props.causticsTexture)
})
</script>
