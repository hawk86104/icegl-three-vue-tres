<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-09 17:15:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-11 11:32:34
-->
<template>
    <TresGroup ref="olref" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'
import { Outlines } from '@pmndrs/vanilla'
import { watchEffect } from 'vue'
import { shallowRef, watch } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
        thickness?: number
        screenspace?: boolean
    }>(),
    {
        color: '#ffffff',
        thickness: 0.1,
        screenspace: false,
    },
)

const { renderer } = useTresContext()
const ol = Outlines({
    color: new THREE.Color(props.color),
    thickness: props.thickness,
    screenspace: props.screenspace,
    gl: renderer.value,
})

const olref = shallowRef(null) as any
watch(olref, () => {
    if (olref.value && olref.value.parent) {
        olref.value.parent.add(ol.group)
        ol.generate()
    }
})

watchEffect(() => {
    ol.updateProps({
        color: new THREE.Color(props.color),
        thickness: props.thickness,
        screenspace: props.screenspace,
    })
})
</script>
