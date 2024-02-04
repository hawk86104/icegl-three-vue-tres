<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-04 14:31:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-04 17:29:28
-->
<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import skyBox from 'PLS/skyBox/components/skyBoxDmesh.vue'
import stencilMaskMesh from '../components/stencilMaskBox.vue'
import stencilMaskModels from '../components/stencilMaskModels.vue'

</script>
<template>
	<TresCanvas ref="canvasRef" window-size clear-color="#111">
		<TresPerspectiveCamera :position="[-1, 0, 2]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
		<OrbitControls auto-rotate />

		<Suspense>
			<skyBox texture="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg" />
		</Suspense>

		<Suspense>
			<stencilMaskMesh />
		</Suspense>

		<Suspense>
			<stencilMaskModels />
		</Suspense>

		<TresPointLight :position="[0, 0, 1]" :intensity="1" />
		<TresDirectionalLight :position="[1, 1, 1]" :intensity="3" />
		<TresAmbientLight :intensity="2" />
	</TresCanvas>
</template>