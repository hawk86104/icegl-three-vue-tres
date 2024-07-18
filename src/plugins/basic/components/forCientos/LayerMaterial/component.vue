<!--
 * @Description: <TresMeshToonMaterial color="#FBB03B" />
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 15:07:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 10:30:36
-->
<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
import { useTresContext } from '@tresjs/core'
import { LayerMaterialParameters } from 'lamina/types'
import { LayerMaterialCom } from './material'

const props = defineProps<LayerMaterialParameters>()
const LayerMaterialClass = shallowRef()
const { extend } = useTresContext()

extend({ LayerMaterialCom })

defineExpose({ LayerMaterialClass })
onMounted(() => {
    LayerMaterialClass.value.init()
})
</script>

<template>
    <TresLayerMaterialCom ref="LayerMaterialClass" :args="[props]">
        <slot />
    </TresLayerMaterialCom>
</template>
