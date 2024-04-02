<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:34:31
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { NormalProps } from 'lamina/types'
import { Normal } from './material'
const props = defineProps<NormalProps>()
const { extend } = useTresContext()
extend({ Normal })
</script>
<template>
	<TresNormal :args="[props]" :visible="true" />
</template>
