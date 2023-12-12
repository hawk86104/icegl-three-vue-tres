<template>
	<TresFog v-if="props.type === 'Fog'" :color="props.color" :near="props.near" :far="props.far" />
</template>

<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { Color, FogExp2 } from 'three'
import { watch } from 'vue'

const props = withDefaults(defineProps<{
	type?: String
	color?: String
	density?: Number
	near?: Number
	far?: Number
}>(), {
	type: 'Fog',
	color: "#000",
	density: 0.01,
	near: 100,
	far: 4000
})

const { scene } = useTresContext()
watch(
	() => props.type,
	(nv, ov) => {
		// console.log(nv, ov)
		if (nv === 'FogExp2') {
			scene.value.fog = new FogExp2(props.color, 0.0010)
		}
	})

watch(() => props.color,
	(nv, ov) => {
		scene.value.fog.color = new Color(props.color)
	}
)
watch(() => props.density,
	(nv, ov) => {
		scene.value.fog.density = props.density
	}
)
</script>