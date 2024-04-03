<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:30:33
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { GradientProps } from 'lamina/types'
import { Gradient } from './material'
const props = defineProps<GradientProps>()
const { extend } = useTresContext()
extend({ Gradient })
</script>
<template>
	<TresGradient :args="[props]" :visible="true" />
</template>
