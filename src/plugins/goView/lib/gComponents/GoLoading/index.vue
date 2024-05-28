<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 17:02:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 17:13:46
-->
<template>
    <!-- svg加载图 -->
    <div class="go-loading-svg go-flex-center">
        <img src=" " alt="" />
    </div>
</template>
<style lang="scss" scoped>
@include go('loading-svg') {
    width: 100%;
    height: 100%;
    background-color: transparent;
    img {
        height: 50px;
    }
}
</style>
