<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 08:42:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-15 10:22:02
-->
<template>
    <TresGroup>
        <highlightMiddle :scale="[1.1, 4.6, 1.1]" :position="[0, -2, 0]" />
        <tornadoOutter :scale="[0.6, 0.4, 0.6]" :position="[0, -2.5, 0]" :renderOrder="999992" />
        <tornado :scale="[0.44, 0.4, 0.44]" :position="[0, -2.5, 0]" :renderOrder="999993" />
        <tornadoInner :scale="0.4" :position="[0, -2.5, 0]" :renderOrder="999994" />
    </TresGroup>
</template>
<script setup lang="ts">
import highlightMiddle from './highlightMiddle.vue'
import tornadoOutter from './tornadoOutter.vue'
import tornado from './tornado.vue'
import tornadoInner from './tornadoInner.vue'
</script>
