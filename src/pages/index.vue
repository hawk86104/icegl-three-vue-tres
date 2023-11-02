<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-02 09:08:58
-->
<template>
    <div class="flex h-full">
        <div class="w-50" style="background-color: black;">
            <f-menu mode="vertical" :defaultExpandAll="true" :inverted="true" @select="goto">
                <f-sub-menu value="1">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    <template #label>原生功能展示</template>
                    <f-menu-item value="1.1">
                        <template #label>AAA</template>
                    </f-menu-item>
                    <f-menu-item value="1.2">
                        <template #label>BBB</template>
                    </f-menu-item>
                </f-sub-menu>
                <f-sub-menu value="2">
                    <template #icon>
                        <PictureOutlined />
                    </template>
                    <template #label>插件中心</template>
                    <f-menu-item v-for="(onePlugin, pkey) in pluginsConfig" :value="pkey">
                        <template #label>{{ onePlugin.title }}</template>
                    </f-menu-item>
                </f-sub-menu>
            </f-menu>
        </div>
        <div class="flex-1 overflow-scroll" style="height: calc(100vh - 54px);">
            <div style="background-color: #f1f1f2;" v-for="(onePlugin, pkey) in pluginsConfig" :key="pkey"
                :ref="el => tabListRef[pkey] = el">
                <FDivider titlePlacement="left">{{ onePlugin.title + pkey }}</FDivider>
                <FText class="ml-13" tag="i" size="small">{{ onePlugin.intro }}</FText>
                <div class="flex flex-wrap flex-justify-start content-start mt-6 pl-6">
                    <div class="w-80 mr-10 mb-10 overflow-hidden" v-for="(onePreview, okey) in onePlugin.preview"
                        :key="okey">
                        <FCard :header="onePreview.title" shadow="hover">
                            <video controls class="w-full max-h-70" v-if="onePreview.type === 'video'">
                                <source :src="publicPath + onePreview.src" type="video/mp4" autoplay="true" loop="true" />
                            </video>
                            <img class="w-full max-h-70" v-else :src="publicPath + onePreview.src" />
                            <div class="cursor-pointer" @click="toPage(pkey, onePreview.name)">点击查看详情</div>
                        </FCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineRouteMeta, useRouter } from '@fesjs/fes'; //fesJS的路由被他自己封装了
import { AppstoreOutlined, PictureOutlined } from '@fesjs/fes-design/icon';
import { FCard, FDivider, FText } from '@fesjs/fes-design';
import { getPluginsConfig } from '../common/utils';

defineRouteMeta({
    name: 'index',
    title: '开源框架展示',
});

const tabListRef = ref([])
let pluginsConfig = getPluginsConfig();
const goto = (value: string) => {
    tabListRef.value[value.value]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" })
}
const router = useRouter()  //fesJS的路由被他自己封装了
let publicPath = process.env.BASE_URL
const toPage = (plugin: string, value: any) => {
    let routeUrl = router.resolve({
        path: `/${plugin}/${value}`
    });
    window.open(routeUrl.href, '_blank');
}
</script>

<style lang="less">
.layout-logo {
    /* margin-right: 6.2em !important; */
    width: 12.5rem !important;
    padding: 0 !important;
    justify-content: center;
    margin: 0 !important;
}
</style>
