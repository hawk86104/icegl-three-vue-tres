<template>
	<TresCanvas v-bind="tcConfig">
		<defaultMesh />
		<viewHelper />
	</TresCanvas>
</template>


<script setup lang="ts">
import * as THREE from "three"
import { viewHelper } from 'PLS/tvtViewHelper'
import defaultMesh from '../components/defaultMesh.vue'

const tcConfig = {
	clearColor: "#201919",
	windowSize: true,
	shadows: true,
	toneMapping: THREE.ACESFilmicToneMapping,
	toneMappingExposure: 0.8,
}

</script>