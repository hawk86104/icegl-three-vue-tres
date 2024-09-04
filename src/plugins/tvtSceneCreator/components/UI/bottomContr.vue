<template>
    <div class="bt-con-div">
        <FRadioGroup v-model="curMeshList.controlState" size="small">
            <FRadioButton value="sel">
                <template #icon>
                    <MinusCircleOutlined />
                </template>
                选择
            </FRadioButton>
            <FRadioButton value="translate">
                <template #icon>
                    <DragOutlined />
                </template>
                移动
            </FRadioButton>
            <FRadioButton value="scale">
                <template #icon>
                    <PlusCircleOutlined />
                </template>
                缩放
            </FRadioButton>
            <FRadioButton value="rotate">
                <template #icon>
                    <ReloadOutlined />
                </template>
                旋转
            </FRadioButton>
        </FRadioGroup>
    </div>
</template>

<script lang="ts" setup>
import { FRadioGroup, FRadioButton } from '@fesjs/fes-design'
import { MinusCircleOutlined, DragOutlined, PlusCircleOutlined, ReloadOutlined } from '@fesjs/fes-design/icon'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'

const curMeshList = useCurMeshListStore()
</script>
<style lang="scss" scoped>
.bt-con-div {
    position: absolute;
    bottom: 6px;
    width: 100%;
    color: white;
}
</style>
<style lang="scss">
.bt-con-div {
    .fes-radio-group {
        margin: 0 auto;
        display: block;
        width: 270px;
        pointer-events: all;

        .fes-radio-button {
            background: #0f1222;
        }
    }
}
</style>
