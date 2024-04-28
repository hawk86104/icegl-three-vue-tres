<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-26 09:05:47
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-26 11:45:42
-->
<template>
    <TresGroup ref="gref">
        <TresGroup ref="outer">
            <TresGroup ref="inner">
                <slot />
            </TresGroup>
        </TresGroup>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Box3, Vector3, Sphere } from 'three'

const props = withDefaults(
    defineProps<{
        precise?: boolean
        top?: boolean
        right?: boolean
        bottom?: boolean
        left?: boolean
        front?: boolean
        back?: boolean
        disable?: boolean
        disableX?: boolean
        disableY?: boolean
        disableZ?: boolean
    }>(),
    {
        precise: true,
        disable: false,
        disableX: false,
        disableY: false,
        disableZ: false,
        left: false,
        right: false,
        top: false,
        bottom: false,
        front: false,
        back: false,
    },
)

const gref = ref(null)
const outer = ref(null) as any
const inner = ref(null)

onMounted(() => {
    if (!outer.value) return
    if (!inner.value) return
    outer.value.matrixWorld.identity()
    const box3 = new Box3().setFromObject(inner.value, props.precise)
    const center = new Vector3()
    const sphere = new Sphere()
    const width = box3.max.x - box3.min.x
    const height = box3.max.y - box3.min.y
    const depth = box3.max.z - box3.min.z
    box3.getCenter(center)
    box3.getBoundingSphere(sphere)
    const vAlign = props.top ? height / 2 : props.bottom ? -height / 2 : 0
    const hAlign = props.left ? -width / 2 : props.right ? width / 2 : 0
    const dAlign = props.front ? depth / 2 : props.back ? -depth / 2 : 0

    outer.value.position.set(
        props.disable || props.disableX ? 0 : -center.x + hAlign,
        props.disable || props.disableY ? 0 : -center.y + vAlign,
        props.disable || props.disableZ ? 0 : -center.z + dAlign,
    )
})
</script>
