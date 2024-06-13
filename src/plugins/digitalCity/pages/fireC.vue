<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 15:52:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-13 18:38:17
-->

<template>
    <pagesShow>
        <template v-slot:ability>
            <Suspense>
                <fireC :position="[10, 30, 0]" :scale="100" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import fireC from '../components/fire/fireC.vue'
</script>
