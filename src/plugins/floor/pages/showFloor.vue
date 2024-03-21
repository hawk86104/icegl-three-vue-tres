<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-27 08:42:48
-->
<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="100000" :look-at="[0, 0, 0]" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="10.0" />

		<TresMesh :position="[3, 2, 0]">
			<TresBoxGeometry :args="[2, 2, 2]" />
			<TresMeshNormalMaterial :wireframe="true" />
		</TresMesh>

		<TresMesh :position="[0, 1.2, 0]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>
		<Suspense>
			<sfm :position="[0, 0, 0]" />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">

import { OrbitControls } from '@tresjs/cientos'
import sfm from '../components/sciFiModular.vue'


</script>