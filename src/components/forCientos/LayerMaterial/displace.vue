<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:36:44
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { DisplaceProps } from 'lamina/types'
import { Displace } from './material'
const props = defineProps<DisplaceProps>()
const { extend } = useTresContext()
extend({ Displace })
</script>
<template>
	<TresDisplace :args="[props]" :visible="true" />
</template>
