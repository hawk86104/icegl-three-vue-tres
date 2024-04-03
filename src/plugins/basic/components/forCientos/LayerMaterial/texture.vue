<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:36:18
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { TextureProps } from 'lamina/types'
import { Texture } from './material'
const props = defineProps<TextureProps>()
const { extend } = useTresContext()
extend({ Texture })
</script>
<template>
	<TresTexture :args="[props]" :visible="true" />
</template>
