<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-14 08:58:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-14 09:22:34
-->
<template>
    <pagesShow>
        <template v-slot:ability>
            <lightStorm />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import lightStorm from '../components/weather/lightStorm.vue'
</script>
