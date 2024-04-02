<!--
 * @Description: <TresMeshToonMaterial color="#FBB03B" />
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 15:07:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-02 21:22:09
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
// const slots = useSlots()
// args.layers = slots.default() || slots.default
// const args = Object.assign({}, props)
onMounted(() => {
  LayerMaterialClass.value.init(LayerMaterialClass.value.__vnode.children)
})
</script>

<template>
  <TresLayerMaterialCom ref="LayerMaterialClass" :args="[props]">
    <slot />
  </TresLayerMaterialCom>

</template>
