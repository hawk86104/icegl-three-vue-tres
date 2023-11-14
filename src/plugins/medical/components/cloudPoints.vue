<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-14 09:01:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-14 16:24:49
-->
<template>
	<primitive :object="cloudModel" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	model: Group
	color?: string,
	opacity?: number
}>(), {
	color: '#FFF',
	opacity: 1.0,
})
import { Points, PointsMaterial, Mesh, Group, Color } from 'three'
import { watchEffect } from 'vue';

const cloudModel = new Group()
props.model.traverse((child) => {
	if (child instanceof Mesh) {
		const pbgeometry = child.geometry.clone()
		// child.removeFromParent()
		child.geometry.dispose()
		child.material.dispose()
		const pmaterial = new PointsMaterial({ color: props.color });
		pmaterial.opacity = props.opacity
		pmaterial.transparent = true
		const pointsMesh = new Points(pbgeometry, pmaterial)
		cloudModel.add(pointsMesh)
	}
})

watchEffect(() => {
	if (props.color) {
		cloudModel.traverse((child) => {
			if (child instanceof Points) {
				child.material.color = new Color(props.color)
			}
		})
	}
	if (props.opacity) {
		cloudModel.traverse((child) => {
			if (child instanceof Points) {
				child.material.opacity = props.opacity
			}
		})
	}
});
</script>