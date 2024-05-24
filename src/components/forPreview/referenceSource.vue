<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 19:30:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-24 09:45:04
-->
<template>
    <FButton v-if="referenceSourceConfig" type="info" class="absolute" size="small" style="left: 10px; bottom: 10px" @click="jump">
        <template #icon> <StarOutlined /> </template>参考出处 ：{{ referenceSourceConfig.title }}
    </FButton>
</template>
<script setup lang="ts">
import { StarOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'

const props = withDefaults(
    defineProps<{
        referenceSourceConfig: any
    }>(),
    {},
)

const jump = () => {
    window.open(props.referenceSourceConfig.url)
}
</script>
