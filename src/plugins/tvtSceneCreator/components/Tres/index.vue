<template>
	<TresCanvas v-bind="tcConfig">
		<backgroundEnv />
		<defaultMesh />
		<viewHelper />
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"
import backgroundEnv from './default/backgroundEnv.vue'
import defaultMesh from './default/deMesh.vue'
import viewHelper from './default/viewHelper.vue'


const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

</script>