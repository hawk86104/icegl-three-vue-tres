<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:13:15
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { MatcapProps } from 'lamina/types'
import { Matcap } from './material'
const props = defineProps<MatcapProps>()
const { extend } = useTresContext()
extend({ Matcap })
</script>
<template>
	<TresMatcap :args="[props]" :visible="true" />
</template>
