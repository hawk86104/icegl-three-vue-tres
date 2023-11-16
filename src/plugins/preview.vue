<template>
    <div class="flex h-full">
        <div class="w-50" style="background-color: black;">
            <f-menu mode="vertical" :defaultExpandAll="true" :inverted="true" @select="goto">
                <f-sub-menu value="1">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    <template #label>原生功能展示</template>
                    <template v-for="(bP, pkey) in pluginsConfig">
                        <f-menu-item v-if="pkey === 'basic'" v-for="(onePlugin, okey) in bP.child" :value="onePlugin.name">
                            <template #label>{{ onePlugin.title }}</template>
                        </f-menu-item>
                    </template>
                </f-sub-menu>
                <f-sub-menu value="2">
                    <template #icon>
                        <PictureOutlined />
                    </template>
                    <template #label>插件中心</template>
                    <template v-for="(onePlugin, pkey) in pluginsConfig">
                        <f-menu-item v-if="pkey !== 'basic'" :value="pkey">
                            <template #label>{{ onePlugin.title }}</template>
                        </f-menu-item>
                    </template>
                </f-sub-menu>
                <f-sub-menu value="8">
                    <template #icon>
                        <ClusterOutlined />
                    </template>
                    <template #label>aboutUs</template>
                    <f-menu-item value="abus">
                        <template #label>关于我们</template>
                    </f-menu-item>
                </f-sub-menu>
            </f-menu>
        </div>
        <div class="flex-1 overflow-scroll" style="height: calc(100vh - 54px);">
            <template v-for="(onePlugin, pkey) in pluginsConfig" :key="pkey">
                <div style="background-color: #f1f1f2;" v-if="pkey !== 'basic'" :ref="el => tabListRef[pkey] = el">
                    <cardList :onePlugin="onePlugin" />
                </div>
                <template v-else>
                    <div style="background-color: #f1f1f2;" v-for="(one, opkey) in onePlugin.child" :key="opkey"
                        :ref="el => tabListRef[one.name] = el">
                        <cardList :onePlugin="one" />
                    </div>
                </template>
            </template>
            <div style="background-color: rgb(90, 76, 76);" :ref="el => tabListRef.abus = el">
                <aboutUs />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineRouteMeta } from '@fesjs/fes';
import { AppstoreOutlined, PictureOutlined, ClusterOutlined } from '@fesjs/fes-design/icon';
import { getPluginsConfig } from '../common/utils';
import cardList from '../components/cardList.vue'
import aboutUs from '../components/aboutUs.vue'

defineRouteMeta({
    name: 'preview',
    title: '开源框架展示',
});

const tabListRef = ref([])
let pluginsConfig = getPluginsConfig();
const goto = (value: string) => {
    tabListRef.value[value.value]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" })
}

</script>

<style lang="less">
.layout-logo {
    /* margin-right: 6.2em !important; */
    width: 12.5rem !important;
    padding: 0 !important;
    justify-content: center !important;
    margin: 0 !important;
}

.fes-menu.is-vertical.is-inverted .fes-menu-item,
.fes-menu.is-horizontal.is-inverted .fes-menu-item {
    font-size: 0.93em;
    font-weight: 100;
}
</style>
