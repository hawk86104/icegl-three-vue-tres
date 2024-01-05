<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-05 09:23:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-05 10:07:17
-->

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Color, SRGBColorSpace, Plane, Vector3, DoubleSide } from 'three'
import { Pane } from 'tweakpane'

const tcRef = ref()

const meshList = []
for (let index = 1; index < 30; index += 2) {
	meshList.push(index)
}

const clipPlanes = [
	new Plane(new Vector3(1, 0, 0), 0),
	new Plane(new Vector3(0, - 1, 0), 0),
	new Plane(new Vector3(0, 0, - 1), 0)
];
const params = {
	clipIntersection: true,
	planeConstant: 0,
	showHelpers: false
};

watchEffect(() => {
	if (tcRef.value) {
		let renderer = tcRef.value.context.renderer.value
		renderer.localClippingEnabled = true
	}
})

const paneControl = new Pane({
	title: '裁剪参数',
	expanded: true,
});
paneControl.addBinding(clipPlanes[0], 'constant', {
	label: 'x',
	min: -1,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(clipPlanes[1], 'constant', {
	label: 'y',
	min: -1,
	max: 1,
	step: 0.1,
})
paneControl.addBinding(clipPlanes[2], 'constant', {
	label: 'z',
	min: -1,
	max: 1,
	step: 0.1,
})
</script>

<template>
	<TresCanvas ref="tcRef" window-size>
		<TresPerspectiveCamera :fov="40" :near="0.1" :far="200" :position="[-1.5, 2.5, 3.0]" />
		<TresGridHelper :args="[2, 10]" />
		<TresHemisphereLight :args="[0xffffff, 0x080808, 4.5]" :position="[-1.25, 1, 1.25]" />
		<OrbitControls />

		<TresGroup>
			<TresMesh v-for="i in meshList" :key="i">
				<TresSphereGeometry :args="[i / 30, 48, 24]" />
				<TresMeshLambertMaterial :color="new Color().setHSL(Math.random(), 0.5, 0.5, SRGBColorSpace)" :side="DoubleSide"
					:clippingPlanes="clipPlanes" :clipIntersection="params.clipIntersection" />
			</TresMesh>
		</TresGroup>

	</TresCanvas>
</template>
