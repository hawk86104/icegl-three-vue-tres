<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'

const { onLoop } = useRenderLoop()
const yRotation = shallowRef(0)
onLoop(({ delta }) => {
	yRotation.value += 0.02 * delta
})

const StarsREF = ref()
onMounted(() => {
	StarsREF.value.value.material.color.setHex(0x4d76cf)
	StarsREF.value.value.scale.set(5, 5, 5)
})
</script>

<template>
	<Stars ref="StarsREF" :rotation="[0, yRotation, 0]" :radius="100" :depth="50" :count="10000" :size="5"
		:size-attenuation="true" />
</template>
