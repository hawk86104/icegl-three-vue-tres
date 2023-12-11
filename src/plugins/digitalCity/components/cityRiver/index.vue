<template>
	<TresGroup :position="[0, 0, -2]"> <!-- :position="[0, 19.1, -2]" -->
		<primitive :object="scene" />
		<Suspense>
			<threeWater2 :position-y="0.0001" :waterGeometry="nodes.mesh_0.geometry" v-bind="water2State" />
		</Suspense>
	</TresGroup>
</template>

<script setup lang="ts">
import threeWater2 from 'PLS/water/components/threeWater2.vue'
import { useGLTF, TransformControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Color } from 'three'

import { Pane } from 'tweakpane'

const { scene, nodes } = await useGLTF('https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf')
scene.renderOrder = 9999
nodes.mesh_0.material.transparent = true
nodes.mesh_0.material.depthWrite = true
nodes.mesh_0.material.depthTest = true
nodes.mesh_0.material.opacity = 0.7

const water2State = reactive({
	color: '#f857cc',
	scale: 3.1,
	modelVisible: true,
})

const paneControl = new Pane({
	title: '河流参数',
	expanded: true,
});
paneControl.addBinding(water2State, 'modelVisible', { label: '模型显示', })
	.on('change', (ev) => {
		nodes.mesh_0.visible = ev.value
	})
paneControl.addBinding(water2State, 'scale', {
	label: '分辨率', min: 0.1,
	max: 10.0,
	step: 0.1,
})
paneControl.addBinding(water2State, 'color', { label: '河水颜色', })
</script>
