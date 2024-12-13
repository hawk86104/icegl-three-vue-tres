<template>
	<TresCanvas v-bind="tcConfig">
			<TresPerspectiveCamera :position="[0, 2.0, 8]" :fov="45" :near="0.1" :far="1000" />
			<OrbitControls v-bind="controlsState" />
			<TresAmbientLight :intensity="2" />
			<Suspense>
					<fragmentModelCom />
			</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import fragmentModelCom from '../components/fragmentModelCom.vue'

const controlsState = reactive({
	enableDamping: true,
	enableZoom: true,
	autoRotate: true,
	enablePan: true,
	enableRotate: true,
})
const tcConfig = {
	clearColor: '#000000',
	windowSize: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}
</script>
