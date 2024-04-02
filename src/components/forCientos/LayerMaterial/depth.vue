<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:36:39
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { DepthProps } from 'lamina/types'
import { Depth } from './material'
const props = defineProps<DepthProps>()
const { extend } = useTresContext()
extend({ Depth })
</script>
<template>
	<TresDepth :args="[props]" :visible="true" />
</template>
