<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-15 09:59:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 16:54:43
-->
<template>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useFBO } from 'PLS/basic'
import { PackedMipMapGenerator } from "../common/csmMipmap/PackedMipMapGenerator"

const props = withDefaults(defineProps<{
	parent: THREE.Mesh
	resolution?: number
	ignoreObjects?: THREE.Object3D[]
}>(), {
	resolution: 512,
	ignoreObjects: [] as THREE.Object3D[]
})

const reflectPlane = new THREE.Plane()
const reflectMatrix = new THREE.Matrix4()
const camera = new THREE.PerspectiveCamera()

const mipMaper = new PackedMipMapGenerator()
const renderTarget = useFBO({
	width: props.resolution, height: props.resolution, settings: {
		type: THREE.UnsignedByteType,
	}
})
const renderTargetMipMap = useFBO({
	width: props.resolution, height: props.resolution, settings: {
		type: THREE.UnsignedByteType,
	}
})
const { camera: baseCamera, renderer, scene } = useTresContext()

const beforeRender = () => {
	if (!baseCamera.value) {
		return
	}
	reflectPlane.set(new THREE.Vector3(0, 1, 0), 0)
	reflectPlane.applyMatrix4(props.parent.matrixWorld)
	camera.copy(baseCamera.value as THREE.PerspectiveCamera)
	const r = new THREE.Vector3(0, 0, 1).clone().negate()
	const o = baseCamera.value.getWorldPosition(new THREE.Vector3())
	r.reflect(reflectPlane.normal)
	const p = new THREE.Vector3()
	reflectPlane.projectPoint(o, p)
	const y = p.clone()
	y.sub(o), y.add(p), camera.position.copy(y)
	const d = new THREE.Vector3(0, 0, -1)
	d.applyQuaternion(
		baseCamera.value.getWorldQuaternion(new THREE.Quaternion())
	)
	d.add(o)
	const E = new THREE.Vector3();
	props.parent.getWorldPosition(E)
	E.sub(d)
	E.reflect(reflectPlane.normal).negate()
	E.add(props.parent.getWorldPosition(new THREE.Vector3()))
	camera.up.set(0, 1, 0)
	camera.applyQuaternion(
		baseCamera.value.getWorldQuaternion(new THREE.Quaternion())
	);
	camera.up.reflect(reflectPlane.normal)
	camera.lookAt(E)
	camera.updateMatrixWorld()
	const L = new THREE.Matrix4()
	L.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)
	L.multiply(camera.projectionMatrix)
	L.multiply(camera.matrixWorldInverse)
	reflectMatrix.copy(L)
	reflectPlane.applyMatrix4(camera.matrixWorldInverse)
	const k = new THREE.Vector4(
		reflectPlane.normal.x,
		reflectPlane.normal.y,
		reflectPlane.normal.z,
		reflectPlane.constant
	)
	const X = camera.projectionMatrix
	const $ = new THREE.Vector4()
	$.x = (Math.sign(k.x) + X.elements[8]) / X.elements[0]
	$.y = (Math.sign(k.y) + X.elements[9]) / X.elements[5]
	$.z = -1
	$.w = (1 + X.elements[10]) / X.elements[14]
	k.multiplyScalar(2 / k.dot($))
	X.elements[2] = k.x
	X.elements[6] = k.y
	X.elements[10] = k.z + 1
	X.elements[14] = k.w
	const Z = renderer.value.getRenderTarget()
	renderer.value.setRenderTarget(renderTarget.value)
	renderer.value.state.buffers.depth.setMask(true)
	renderer.value.autoClear === false && renderer.value.clear()
	props.ignoreObjects.forEach((be) => (be.visible = false))
	renderer.value.render(scene.value, camera)
	props.ignoreObjects.forEach((be) => (be.visible = true))
	renderer.value.setRenderTarget(Z)
}

const { onBeforeLoop } = useRenderLoop()

onBeforeLoop(() => {
	beforeRender()
	if (renderTarget.value && renderTargetMipMap.value && renderer.value) {
		mipMaper.update(renderTarget.value.texture, renderTargetMipMap.value, renderer.value)
	}
})

defineExpose({
	matrix: reflectMatrix,
	renderTarget: renderTargetMipMap,
})
</script>