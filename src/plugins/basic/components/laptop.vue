<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:18:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 11:35:56
-->

<template>
	<Levioso>
		<primitive ref="primitiveref" :object="nodes.Macbook">
			<Html transform wrapper-class="webpage" :distance-factor="11" :position="[0, 10.5, -13.6]" occlude
				:rotation-x="-0.256">
			<iframe class="rounded-lg w-[1024px] h-[670px]" src="https://www.icegl.cn" frameborder="0" />

			</Html>
		</primitive>
	</Levioso>
</template>

<script setup lang="ts">
import { Html, useGLTF, Levioso } from '@tresjs/cientos'
import { ref } from "vue"

const primitiveref = ref()
const { nodes }
	// https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf
	= await useGLTF('./plugins/basic/htmls/model/model.gltf',
		{ draco: true, decoderPath: './draco/' },
	)
</script>