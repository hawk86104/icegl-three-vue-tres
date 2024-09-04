<template>
    <div class="is-fixed" style="width: 280px; height: 700px; margin-top: 16px;pointer-events: all;">
        <FTabs type="card" v-model="otherConfig.activeModel">
            <FTabPane name="加入场景" value="modelList" displayDirective="show">
                <div class="tab-content">
                    <modelList />
                </div>
            </FTabPane>
            <FTabPane name="现有物体" value="nowin" displayDirective="show">
                <div class="tab-content">
                    <curList />
                </div>
            </FTabPane>
            <FTabPane name="独立效果" value="effect" displayDirective="show">
                <div class="tab-content" style="color: #fff;">
                    导入TvT.js生态中封装好独立的效果组件敬请期待
                </div>
            </FTabPane>
        </FTabs>
    </div>
</template>

<script lang="ts" setup>
import { FTabs, FTabPane } from '@fesjs/fes-design'
import modelList from './small/modelList.vue'
import curList from './small/curList.vue'
import { useotherConfigStore } from 'PLS/tvtSceneCreator/stores/otherConfig'

const otherConfig = useotherConfigStore() as any

</script>
<style lang="scss" scoped>
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
        line-height: 60px;
        text-align: center;
		background: #0f1222;
        padding: 10px;
    }
}

.fes-tabs {
    background: #0f1222;
    padding-top: 10px;
}

</style>
<style lang="scss">
.fes-tabs-card .fes-tabs-tab-card.fes-tabs-tab-active{
	background: #0f1222;
}
.fes-tabs-card .fes-tabs-tab-card{
	background:#0e0e0e;
}
.fes-tabs-tab {
	color: #bcbcbc;
}
.fes-tabs-tab-active {
    color: #ffffff;
}
</style>
