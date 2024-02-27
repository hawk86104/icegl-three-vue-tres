
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[400, 400, 400]" :fov="60" :near="0.1" :far="4000" />
		<OrbitControls v-bind="controlsState" />

		<TresAmbientLight :intensity="0.5" />
		<TresDirectionalLight ref="TDirectionalLight" :position="[1, 2, 3]" :intensity="1.25" />
		<tilesMesh />
	</TresCanvas>
</template>


<script setup lang="ts">
import { reactive, watchEffect, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import tilesMesh from '../components/tilesMesh.vue'

const state = reactive({
	clearColor: '#201919',
	// alpha: false,
})

const controlsState = reactive({
	enableDamping: true,
	dampingFactor: 0.05,
})


const { onLoop } = useRenderLoop()

onLoop(() => {

})
const TDirectionalLight = shallowRef()
watchEffect(() => {
	if (TDirectionalLight.value) {
		TDirectionalLight.value.position.set(1, 2, 3).multiplyScalar(40)

		// TDirectionalLight.value.shadow.bias = - 0.01
		// TDirectionalLight.value.shadow.mapSize.setScalar(2048)

		// TDirectionalLight.value.shadow.camera.top = 200
		// TDirectionalLight.value.shadow.camera.right = 200
		// TDirectionalLight.value.shadow.camera.left = -200
		// TDirectionalLight.value.shadow.camera.bottom = -200

		// TDirectionalLight.value.shadow.camera.updateProjectionMatrix()
	}
})

</script>