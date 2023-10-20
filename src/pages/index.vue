<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-20 10:38:53
-->
<template>
    <Suspense>
        <city />
    </Suspense>
</template>

<script setup>
import { defineRouteMeta } from '@fesjs/fes';
// eslint-disable-next-line import/no-unresolved
import city from 'PLS/superzay/pages/city.vue'; //'@/plugins/'

defineRouteMeta({
    name: 'index',
    title: '首页',
});
</script>
