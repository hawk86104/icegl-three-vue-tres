<!-- eslint-disable vue/space-unary-ops -->
<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-17 14:54:11
-->
<template>
	<TresCanvas v-bind="state">
		<TresPerspectiveCamera :position="[600, 750, -1221]" :fov="45" :near="1" :far="10000" />
		<OrbitControls v-bind="controlsState" />
		<TresAmbientLight color="#adadad" />
		<TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" cast-shadow />

		<Suspense>
			<belt></belt>
		</Suspense>

		<TresGridHelper />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three';
import { reactive, onMounted, watchEffect } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import belt from '../components/belt.vue';

const state = reactive({
	clearColor: '#32373E',
	shadows: true,
	alpha: false,
	useLegacyLights: true,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
});

const controlsState = reactive({ autoRotate: true, enableDamping: true });

watchEffect(() => { });
onMounted(() => {

})
</script>
