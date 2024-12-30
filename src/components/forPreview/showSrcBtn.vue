<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-15 09:11:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-30 08:16:23
-->
<template>
    <FButton type="info" class="absolute home-btn" size="small" @click="tohome()">
        <template #icon> <HomeOutlined />首页 </template>
    </FButton>
    <FButton type="info" class="absolute" size="small" style="right: 10px; bottom: 10px" @click="jump()">
        <template #icon> <ProductOutlined /> </template>源码Src
    </FButton>
</template>
<script setup lang="ts">
import { ProductOutlined, HomeOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'

const props = withDefaults(
    defineProps<{
        parts: any
    }>(),
    {},
)

let baseUrl = 'https://gitee.com/ice-gl/icegl-three-vue-tres/blob/master/src'
let newUrl = `${baseUrl}/${props.parts[1]}/${props.parts[2]}/pages/${props.parts.slice(3).join('/')}.vue`

const jump = () => {
    window.open(newUrl)
}
const tohome = () => {
    window.open('https://github.com/hawk86104/three-vue-tres')
}
</script>
<style lang="less" scoped>
.home-btn {
    right: 93px;
    bottom: 10px;
    --f-btn-min-width: auto;
    border-right-width: 0px;
}
</style>
