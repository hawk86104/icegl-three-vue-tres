<template>
    <!-- name:core uuid:fc5f1290-58d9-4fc1-937a-00183070e7c1 type:Group -->
    <primitive :object="object[0]" />
    <!-- name:belt_dots uuid:e392da8f-d0ee-4041-8dc6-1ae9d5031242 type:Mesh -->
    <primitive :object="object[1]" :visible="false" />
    <!-- name:bip_item uuid:307c8694-6ae3-4318-8930-e6a99e5401fe type:Mesh -->
    <primitive :object="object[2]" />
    <!-- name:flat_item uuid:3231d773-684b-415b-8d3a-254f4f563f33 type:Mesh -->
    <primitive :object="object[4]" />
    <!-- name:radio_item uuid:f14fb537-dd24-4650-a74e-c174b57ca47e type:Mesh -->
    <primitive :object="object[5]" />
    <!-- name:belt uuid:ddf5afc6-568b-4026-aa1f-1075cb224436 type:Mesh -->
    <primitive :object="object[6]" />
    <!-- name:box_item uuid:bbe484e0-bca1-4888-bad2-26152241a40c type:Mesh -->
    <primitive :object="object[3]" />
</template>

<script setup lang="ts">
import { initBeltFots, updateBeltFots, initRawItemsPool, updateRawItemsPool, initBoxesPool, updateBoxesPool } from '../utils'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'

const props = withDefaults(
    defineProps<{
        object: any
    }>(),
    {},
)

const { scene } = useTresContext()
const beltDotsItem = initBeltFots(props.object[1])
scene.value.add(beltDotsItem)

const rawItemsPool = initRawItemsPool(props.object)
const group = new THREE.Group()
group.position.set(0, 1, 0)
group.add(...rawItemsPool)
scene.value.add(group)

const boxesPool = initBoxesPool(props.object)
const group2 = new THREE.Group()
group2.add(...boxesPool)
group2.position.set(0, 1, 0)
scene.value.add(group2)

const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    if (beltDotsItem) {
        updateBeltFots(beltDotsItem)
    }
    if (rawItemsPool) {
        updateRawItemsPool(rawItemsPool)
    }
    if (boxesPool) {
        updateBoxesPool(boxesPool)
    }
})
</script>
