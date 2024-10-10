<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 17:52:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 17:54:56
-->
<template>
    <div class="text">
        <span class="retro noselect"><span style="color: #eae">光</span>噪声</span>
    </div>
</template>
<style lang="less" scoped>
.text {
    position: absolute;
    bottom: 6vh;
    width: 100%;
    text-align: center;
		z-index: 9999;
}
.retro {
    font-size: 18vh;
    display: block;
    color: #000;
    text-shadow: 0 0 0.125vh #f4a, 0 0 0.125vh #f4a, 0 0 0.25vh #f4a, 0 0 0.5vh #f4a, 0 0 0.75vh #f4a;
}
.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
  supported by Chrome and Opera */
}
</style>
