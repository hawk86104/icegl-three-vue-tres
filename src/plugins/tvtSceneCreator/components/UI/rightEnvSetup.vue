<template>
    <div class="right-env-setup">
        <FTabs v-model="reseletTab" type="card">
            <FTabPane name="场景设置" value="modelList" displayDirective="show">
                <div class="tab-content">
                    <backgroundMap />
                    <FDivider />
                    <envMap />
                </div>
            </FTabPane>
            <FTabPane name="选中物体" value="selMesh" displayDirective="show">
                <div class="tab-content" style="color: #fff">
                    <selMeshInfo />
                </div>
            </FTabPane>
        </FTabs>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { FDivider, FTabs, FTabPane } from '@fesjs/fes-design'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'
import backgroundMap from './small/backgroundMap.vue'
import envMap from './small/envMap.vue'
import selMeshInfo from './small/selMeshInfo.vue'

const curMeshList = useCurMeshListStore()

const reseletTab = ref('modelList')
watch(
    () => curMeshList.selectedMeshIndex,
    (index) => {
        if (index !== null) {
            reseletTab.value = 'selMesh'
        }
    },
)
</script>
<style lang="scss" scoped>
.right-env-setup {
    position: absolute;
    top: 70px;
    width: 260px;
    pointer-events: all;
    background-color: var(--f-font-color-base);
    color: var(--f-text-color-caption);
    right: 0;
    padding: 10px;
}
.fes-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.fes-scrollbar::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    opacity: 0.2;
}
.fes-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
}
.fes-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
.fes-layout-aside.is-fixed.is-placement-left {
    top: 60px;
}
.fes-tabs-tab-pane {
    height: 100%;
    .tab-content {
        height: 100%;
        margin-top: 10px;
        text-align: center;
    }
}

.fes-tabs {
    background: #0f1222;
    color: var(--f-text-color-caption);
}
</style>
<style lang="scss">
.fes-tabs-card .fes-tabs-tab-card.fes-tabs-tab-active {
    background: #0f1222;
}
.fes-tabs-card .fes-tabs-tab-card {
    background: #0e0e0e;
}
.fes-tabs-tab {
    color: #bcbcbc;
}
.fes-tabs-tab-active {
    color: #ffffff;
}
.right-env-setup {
    .fes-tabs-tab-pane-wrapper {
        overflow: visible;
    }
}
</style>
