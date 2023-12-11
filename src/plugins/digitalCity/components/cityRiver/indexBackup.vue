<template>
	<TresGroup :position="[-1553.1671459739368, 160.56147161757758, 1938.3955926284068]" :scale="400"
		:rotation="[-3.141592653589793, 1.0149796591022564, -3.141592653589793]">
		<primitive :object="scene" />
		<Suspense>
			<threeWater2 :position-y="0.0001" :waterGeometry="nodes.mesh_0.geometry" v-bind="water2State" />
		</Suspense>
	</TresGroup>
	<!-- <TransformControls :mode="modelp.ty ? 'translate' : 'rotate'" :object="pRef" /> -->
</template>

<script setup lang="ts">
import threeWater2 from 'PLS/water/components/threeWater2.vue'
import { useGLTF, TransformControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Color } from 'three'

import { Pane } from 'tweakpane'

const { scene, nodes } = await useGLTF('https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf')
scene.renderOrder = 9999
// nodes.mesh_0.visible = false
nodes.mesh_0.material.transparent = false
nodes.mesh_0.material.depthWrite = true
nodes.mesh_0.material.depthTest = true
nodes.mesh_0.material.opacity = 0.7

const water2State = reactive({
	color: '#FFF',
	scale: 1.0
})

const paneControl = new Pane({
	title: '河流参数',
	expanded: true,
});
paneControl.addBinding(water2State, 'color');
</script>
