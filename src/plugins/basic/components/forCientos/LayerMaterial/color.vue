<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 18:51:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:29:25
-->
<script setup lang="ts">
import { defineProps, watchEffect, ref } from 'vue'
import { useTresContext } from '@tresjs/core'
import { ColorProps } from 'lamina/types'
import { Color } from './material'
const props = defineProps<ColorProps>()
const { extend } = useTresContext()
extend({ Color })

const colorRef = ref<any>()
watchEffect(() => {
    if (colorRef.value) {
        if (props.color) {
            colorRef.value.color.setStyle(props.color).convertLinearToSRGB() // 注意 material.color.set('#444') 如果值不同 请 convertLinearToSRGB()
        }
        if (props.alpha) {
            colorRef.value.alpha = props.alpha
        }
    }
})
</script>
<template>
    <TresColor ref="colorRef" :args="[props]" :visible="true" />
</template>
