<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 08:42:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-15 10:14:11
-->
<template>
    <TresGroup>
        <highlightMiddle :scale="[1.1, 4.6, 1.1]" :position="[0, -2, 0]" />
        <tornadoOutter :scale="[0.6, 0.4, 0.6]" :position="[0, -2.5, 0]" />
    </TresGroup>
</template>
<script setup lang="ts">
import highlightMiddle from './highlightMiddle.vue'
import tornadoOutter from './tornadoOutter.vue'
</script>
