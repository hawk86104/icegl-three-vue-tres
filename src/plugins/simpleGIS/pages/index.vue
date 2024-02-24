<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight :intensity="0.5" />

		<TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow @pointer-enter="onPointerEnter"
			@pointer-leave="onPointerLeave">
			<TresSphereGeometry :args="[2, 32, 32]" />
			<TresMeshToonMaterial color="#006060" />
		</TresMesh>

		<TresMesh ref="sphereRef2" :position="[4, 4, 0]" cast-shadow @pointer-enter="onPointerEnter"
			@pointer-leave="onPointerLeave">
			<TresSphereGeometry :args="[2, 32, 32]" />
			<TresMeshToonMaterial color="#006060" />
		</TresMesh>

		<TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
			<TresPlaneGeometry :args="[20, 20, 20, 20]" />
			<TresMeshToonMaterial />
		</TresMesh>


		<TresDirectionalLight ref="TDirectionalLight" :position="[10, 8, 4]" :intensity="1" cast-shadow />
		<TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

		<TresGridHelper />
	</TresCanvas>
</template>


<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, onMounted, shallowRef, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,

	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
	enableZoom: true,
	autoRotate: false,
	autoRotateSpeed: 2,
	maxPolarAngle: Math.PI,
	minPolarAngle: 0,
	maxAzimuthAngle: Math.PI,
	minAzimuthAngle: -Math.PI,
	enablePan: true,
	keyPanSpeed: 7,
	maxDistance: 100,
	minDistance: 0,
	minZoom: 0,
	maxZoom: 100,
	zoomSpeed: 1,
	enableRotate: true,
	rotateSpeed: 1,
})


const sphereRef = ref()
const sphereRef2 = ref()
const TDirectionalLight = shallowRef()

// const { onLoop, pause, resume } = useRenderLoop()
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
	if (!sphereRef.value) return
	sphereRef.value.position.y += Math.sin(elapsed) * 0.01
	sphereRef2.value.position.y += Math.sin(elapsed) * 0.01
})

function onPointerEnter(ev: any) {
	if (ev) {
		ev.object.material.color.set('#DFFF45')
		// pause()
	}
}
function onPointerLeave(ev: any) {
	if (ev) {
		ev.material.color.set('#006060')
	}
}

watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.shadow.mapSize.set(1000, 1000)
		TDirectionalLight.value.shadow.camera.near = 0.5; // default
		TDirectionalLight.value.shadow.camera.far = 50000; // default
		TDirectionalLight.value.shadow.camera.top = 20
		TDirectionalLight.value.shadow.camera.right = 20
		TDirectionalLight.value.shadow.camera.left = -20
		TDirectionalLight.value.shadow.camera.bottom = -20
	}
})
onMounted(() => {
})
</script>