<script setup lang="ts">

import { shallowRef,nextTick,onMounted,Ref } from 'vue'
import { MeshTransmissionMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'
import { useFBO } from '@tresjs/cientos'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { BackSide, DoubleSide } from 'three'
import type { TresObject } from '@tresjs/core'
import type { Camera, Texture, WebGLRenderTarget } from 'three'

const MeshTransmissionMaterialClass = shallowRef()
const { extend, scene, renderer, camera } = useTresContext()
const parent = shallowRef<TresObject>()

// Configs to move to props
const backside = true
const backsideThickness = 0
const thickness = 0
const backsideEnvMapIntensity = 0
const fboResolution = 1500

extend({ MeshTransmissionMaterial })

/**
 * Finds the parent mesh using the specified material UUID.
 *
 * @param {THREE.Scene} scene - The Three.js scene to search.
 * @param {string} materialUuid - The UUID of the material.
 * @returns {THREE.Mesh | undefined} - The mesh using the material, or undefined if not found.
 */
function findMeshByMaterialUuid(scene: TresObject, materialUuid: string): TresObject {
	let foundMesh

	scene.traverse((object: TresObject) => {
		if (object.isMesh && object.material && object.material.uuid === materialUuid) {
			foundMesh = object
		}
	})

	return foundMesh as unknown as TresObject
}

const discardMaterial = new MeshDiscardMaterial()

const { onLoop } = useRenderLoop()

onMounted(async() => {
	await nextTick()
	parent.value = findMeshByMaterialUuid(
		scene.value as unknown as TresObject,
		MeshTransmissionMaterialClass.value.uuid
	)
})

const fboBack = useFBO({ width: fboResolution, height: fboResolution }) as unknown as Ref<WebGLRenderTarget<Texture>>
const fboMain = useFBO({ width: fboResolution, height: fboResolution }) as unknown as Ref<WebGLRenderTarget<Texture>>

let oldBg
let oldEnvMapIntensity
let oldTone

onLoop(({ elapsed }) => {
	MeshTransmissionMaterialClass.value.time = elapsed

	if (MeshTransmissionMaterialClass.value.buffer === fboMain.value.texture) {
		if (parent.value) {
			// Save defaults
			oldTone = renderer.value.toneMapping
			oldBg = scene.value.background
			oldEnvMapIntensity = MeshTransmissionMaterialClass.value.envMapIntensity

			// Switch off tonemapping lest it double tone maps
			// Save the current background and set the HDR as the new BG
			// Use discardmaterial, the parent will be invisible, but it's shadows will still be cast
			// renderer.value.toneMapping = NoToneMapping
			// TODO: Check this with props
			if (false) {
				scene.value.background = null
			}

			parent.value.material = discardMaterial
			// throw new Error('Stop')

			if (backside) {
				// Render into the backside buffer
				renderer.value.setRenderTarget(fboBack.value)
				renderer.value.render(scene.value, camera.value as Camera)
				// And now prepare the material for the main render using the backside buffer
				parent.value.material = MeshTransmissionMaterialClass.value
				// TODO: This also causes some errors
				// parent.value.material.buffer = fboBack.value.texture
				parent.value.material.thickness = backsideThickness
				parent.value.material.side = BackSide
				parent.value.material.envMapIntensity = backsideEnvMapIntensity
			}

			// Render into the main buffer
			renderer.value.setRenderTarget(fboMain.value)
			renderer.value.render(scene.value, camera.value as Camera)

			parent.value.material = MeshTransmissionMaterialClass.value
			parent.value.material.thickness = thickness
			parent.value.material.side = DoubleSide
			// TODO: For some reason this makes the material really shinny, and i dont know why.
			// parent.value.material.buffer = fboMain.value.texture
			parent.value.material.envMapIntensity = oldEnvMapIntensity

			// Set old state back
			scene.value.background = oldBg
			renderer.value.setRenderTarget(null)
			renderer.value.toneMapping = oldTone
		}
	}
})

defineExpose({ root: MeshTransmissionMaterialClass, constructor: MeshTransmissionMaterial })

</script>

<template>
	<TresMeshTransmissionMaterial
		ref="MeshTransmissionMaterialClass"
		:buffer="fboMain.texture"
		:transmission="0"
		:_transmission="1"
		:anisotropic-blur="0.1"
		:thickness="0"
		:side="DoubleSide"
	/>
</template>
