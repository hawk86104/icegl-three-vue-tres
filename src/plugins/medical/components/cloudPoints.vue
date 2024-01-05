<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-14 09:01:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-05 15:44:11
-->
<template>
	<primitive :object="cloudModel" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	model: Group
	color?: string,
	opacity?: number
	isRemoveSrc?: boolean
}>(), {
	color: '#FFF',
	opacity: 1.0,
	isRemoveSrc: false
})
import { Points, PointsMaterial, Mesh, Group, Color } from 'three'
import { watchEffect } from 'vue';

const cloudModel = new Group()
props.model.traverse((child) => {
	if (child instanceof Mesh) {
		const pbgeometry = child.geometry.clone()
		child.geometry.dispose()
		child.material.dispose()
		const pmaterial = new PointsMaterial({ color: props.color });
		pmaterial.opacity = props.opacity
		pmaterial.transparent = true
		const pointsMesh = new Points(pbgeometry, pmaterial)
		cloudModel.add(pointsMesh)
		if (props.model.parent) {
			cloudModel.applyMatrix4(props.model.parent.matrix)
		}
		if (props.isRemoveSrc) {
			child.removeFromParent()
		}
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