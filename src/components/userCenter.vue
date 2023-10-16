<template>
    <div class="right">{{ initialState.userName }}</div>
</template>
<script>
import { useModel } from '@fesjs/fes';

export default {
    setup() {
        const initialState = useModel('@@initialState');
        return {
            initialState,
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
