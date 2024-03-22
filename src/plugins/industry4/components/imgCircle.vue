<template>
	<TresMesh>
		<TresCircleGeometry :args="[100, 32]" />
		<TresMeshBasicMaterial :map="pTexture" :transparent="true" :alphaTest="0.1" />
	</TresMesh>
</template>

<script setup lang="ts">
import { useTexture } from '@tresjs/core'

const pTexture = await useTexture(
	['./plugins/industry4/image/circle.png']
)
</script>