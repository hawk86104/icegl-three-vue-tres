<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-09-21 15:34:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-23 09:53:01
-->
<template>
    <div class="right">{{ userModel.user.userName }}</div>
</template>
<script>
import { useModel } from '@fesjs/fes'

export default {
    setup () {
        const userModel = useModel('forPreview')
        return {
            userModel,
        };
    },
};
</script>
<style scope>
.right {
    text-align: right;
    padding: 0 20px;
}
</style>
