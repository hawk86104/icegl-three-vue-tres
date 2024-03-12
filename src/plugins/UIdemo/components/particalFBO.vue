<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-11 15:02:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 09:40:48
-->
<script setup lang="ts">
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { useGLTF } from '@tresjs/cientos'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { loadOBJ } from 'PLS/medical/common/util'
import { makeSimMesh, makeTexture } from '../lib/utils'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import particalMesh from '../components/particalMesh.vue'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
	progress?: number
	width?: number
	height?: number
	color?: string
}>(), {
	progress: 0,
	width: 256,
	height: 256,
	color: '#ffaa00'
})

const pMesh = ref()
const fboTarget = new THREE.WebGLRenderTarget(props.width, props.height, {
	minFilter: THREE.NearestFilter,
	magFilter: THREE.NearestFilter,
	generateMipmaps: false,
	colorSpace: THREE.SRGBColorSpace,
	depthBuffer: false,
	stencilBuffer: false,
	format: THREE.RGBAFormat,
	type: THREE.FloatType
})

const mergeGeometriesForMesh = (model: THREE.Object3D) => {
	const gList: any[] = []
	model.traverse((child: THREE.Object3D) => {
		if (child instanceof THREE.Mesh) {
			child.geometry.deleteAttribute('uv')
			child.geometry.deleteAttribute('normal')
			child.geometry.deleteAttribute('tangent')
			gList.push(child.geometry)
		}
	})
	//合并 geometry
	return BufferGeometryUtils.mergeGeometries(gList)
}

const brainpartsPath = './plugins/medical/model/brainparts.OBJ'
const objLoader = new OBJLoader()
const brainpartsModel = await loadOBJ(brainpartsPath, objLoader)
const brainpartsGeometries = mergeGeometriesForMesh(brainpartsModel)
brainpartsGeometries.scale(0.01, 0.01, 0.01)
const brainTexture = makeTexture(brainpartsGeometries)

const guanyuModel = (await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb', { draco: true, decoderPath: './draco/' })).scene
const guanyuGeometries = mergeGeometriesForMesh(guanyuModel.children[0])
guanyuGeometries.rotateX(Math.PI / 2)
guanyuGeometries.translate(0, -0.9, 0)
const guanyuTexture = makeTexture(guanyuGeometries)

const planeModel = (await useGLTF('./plugins/industry4/model/modelDraco.glb', { draco: true, decoderPath: './draco/' })).scene
const planeGeometries = mergeGeometriesForMesh(planeModel.children[0])
planeGeometries.rotateX(-Math.PI / 2)
planeGeometries.rotateY(Math.PI / 3)
planeGeometries.translate(0.0, 0, 0)
const planeTexture = makeTexture(planeGeometries)

const simMesh = makeSimMesh()
// simMesh.material.uniforms.uTextureA.value = brainTexture
// simMesh.material.uniforms.uTextureB.value = guanyuTexture

const FBOscene = new THREE.Scene()
const FBOcamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
FBOscene.add(simMesh)

const { onBeforeLoop } = useRenderLoop()
const { camera, renderer } = useTresContext()
onBeforeLoop(({ elapsed }) => {
	if (renderer.value && camera.value && pMesh.value) {
		renderer.value.setRenderTarget(fboTarget)
		renderer.value.clear()
		renderer.value.render(FBOscene, FBOcamera as THREE.Camera)
		renderer.value.setRenderTarget(null)

		if (props.progress < 1 / 2) {
			simMesh.material.uniforms.uTextureA.value = guanyuTexture
			simMesh.material.uniforms.uTextureB.value = brainTexture
			simMesh.material.uniforms.uScroll.value = props.progress * 2
		} else {
			simMesh.material.uniforms.uTextureA.value = brainTexture
			simMesh.material.uniforms.uTextureB.value = planeTexture
			simMesh.material.uniforms.uScroll.value = (props.progress - 1 / 2) * 2
		}
		simMesh.material.uniforms.uTime.value = elapsed

		pMesh.value.particles.material.uniforms.uPositions.value = fboTarget.texture
		pMesh.value.particles.material.uniforms.uColor.value.setStyle(props.color)
	}
})

</script>

<template>
	<particalMesh ref="pMesh" :progress="progress" />
</template>