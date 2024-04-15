<template>
	<primitive :object="scene" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexShader from '../../shaders/speedup.vert'
import fragmentShader from '../../shaders/speedup.frag'

const { scene } = await useGLTF('./plugins/industry4/model/su7_car/sm_speedup.gltf', { draco: false }, (gltfLoader) => { gltfLoader.setMeshoptDecoder(MeshoptDecoder) })
const uniforms = {
	uTime: { value: 0 },
	uSpeedFactor: { value: 0 },
}

const mat = new CustomShaderMaterial({
	baseMaterial: THREE.ShaderMaterial,
	uniforms,
	vertexShader,
	fragmentShader,
	transparent: true,
	depthWrite: false,
})

scene.traverse((child: THREE.Object3D) => {
	if ((child as THREE.Mesh).isMesh) {
		const mesh = child as THREE.Mesh
		mesh.material = mat
	}
})
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
	mat.uniforms.uTime.value += delta
	mat.uniforms.uSpeedFactor.value = 1.0
})
</script>
