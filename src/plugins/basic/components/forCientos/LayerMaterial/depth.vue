<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-08 13:09:46
-->
<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import { DepthProps } from 'lamina/types'
import { Depth } from './material'

const props = defineProps<DepthProps>()
const { extend } = useTresContext()
extend({ Depth })

const instanceRef = ref<any>()
watchEffect(() => {
	if (instanceRef.value) {
		if (props.colorA) {
			instanceRef.value.colorA.set(props.colorA)//.convertLinearToSRGB()
		}
		if (props.colorB) {
			instanceRef.value.colorB.set(props.colorB)//.convertLinearToSRGB()
		}
		if (props.alpha) {
			instanceRef.value.alpha = props.alpha
		}
		if (props.near) {
			instanceRef.value.near = props.near
		}
		if (props.far) {
			instanceRef.value.far = props.far
		}
	}
})
</script>
<template>
	<TresDepth ref="instanceRef" :args="[props]" :visible="true" />
</template>
