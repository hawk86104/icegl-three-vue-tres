<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-26 10:50:18
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
                    <f-menu-item value="2.1">
                        <template #label>{{ pluginsConfig.digitalCity.title }}</template>
                    </f-menu-item>
                    <f-menu-item value="2.2">
                        <template #label>BBB</template>
                    </f-menu-item>
                </f-sub-menu>
            </f-menu>
        </div>
        <div class="flex flex-wrap flex-justify-start content-start mt-6 pl-6" v-for="(onePlugin, pkey) in pluginsConfig"
            :key="pkey">
            <div class="w-80 mr-10 mb-10 overflow-hidden" v-for="(onePreview, okey) in onePlugin.preview" :key="okey">
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineRouteMeta } from '@fesjs/fes';
import { AppstoreOutlined, PictureOutlined } from '@fesjs/fes-design/icon';
import { FCard } from '@fesjs/fes-design';
import { getPluginsConfig } from '../common/utils';

defineRouteMeta({
    name: 'index',
    title: '开源框架展示',
});

let pluginsConfig = getPluginsConfig();

const goto = (value: string) => {
    console.log(value)
}
let publicPath = process.env.BASE_URL
const router = useRouter()
const toPage = (plugin: string, value: any) => {
    let routeUrl = router.resolve({
        path: `/${plugin}/${value}`
    });
    window.open(routeUrl.href, '_blank');
}
</script>

<style>
.layout-logo {
    margin-right: 6.2em !important;
}
</style>
