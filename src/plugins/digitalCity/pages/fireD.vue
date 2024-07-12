<!--
 * @Description: :position="[0, 10, 0]" :scale="10"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-11 18:31:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-11 18:52:45
-->
<template>
    <pagesShow>
        <template v-slot:ability>
            <Suspense>
                <fireD :position="[10, 15, 0]" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import fireD from '../components/fire/fireD.vue'
</script>
