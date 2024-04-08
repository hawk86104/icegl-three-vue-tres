<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 22:17:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-07 09:27:04
-->
<template>
    <div class="flex h-full w-full">
        <div class="w-50" style="background-color: #0f1222;">
            <f-menu mode="vertical" :defaultExpandAll="true" :expandedKeys="expandedKeys" :inverted="true" @select="goto">
                <f-sub-menu value="1">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    <template #label>基础功能展示</template>
                    <template v-for="(bP, pkey) in filteredData">
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
                    <template v-for="(onePlugin, pkey) in  filteredData ">
                        <f-menu-item v-if="pkey !== 'basic'" :value="pkey">
                            <template #label>
                                <div class="flex absolute" style="left: 1px;flex-direction: column;top: 2px;">
                                    <template v-for="(lbItem, lbKey) in getleftMenuBadge(onePlugin.name)">
                                        <f-badge v-if="lbItem.show" :value="lbItem.text" class="tag-fbdge" type="primary"
                                            size="small" />
                                    </template>
                                </div>
                                <span class="left-m-text">{{ onePlugin.title }}</span>
                                <FBadge :value="onePlugin.preview.length" class="count-fbdge" type="primary" size="small" />
                            </template>
                        </f-menu-item>
                    </template>
                </f-sub-menu>
            </f-menu>
        </div>
        <div class="overflow-scroll mt-10 relative right-page-list" style="height: calc(100vh - 42px - 52px);width: 100%;">
            <filterComFixed />
            <template v-for="( onePlugin, pkey ) in  filteredData " :key="pkey">
                <template v-if="pkey === 'basic'">
                    <div style="background-color: #f1f1f2;" v-for="( one, opkey ) in  onePlugin.child " :key="opkey"
                        :ref="el => tabListRef[one.name] = el">
                        <cardList :onePlugin="one" />
                    </div>
                </template>
            </template>
            <template v-for="( onePlugin, pkey ) in  filteredData " :key="pkey">
                <div style="background-color: #f1f1f2;" v-if="pkey !== 'basic'" :ref="el => tabListRef[pkey] = el">
                    <cardList :onePlugin="onePlugin" />
                </div>
            </template>
            <UpCircleOutlined class="toTop" @click="scrollToTop" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { defineRouteMeta, useModel } from '@fesjs/fes'
import { FBadge } from '@fesjs/fes-design'
import { AppstoreOutlined, PictureOutlined, UpCircleOutlined } from '@fesjs/fes-design/icon'
import { getPluginsConfig, getOnlinePluginConfig } from '../common/utils'
import cardList from '../components/forPreview/cardList.vue'
import filterComFixed from '../components/forPreview/filterComFixed.vue'

defineRouteMeta({
    name: 'preview',
    title: '开源框架展示',
})

const tabListRef = ref([])
const pluginsConfig = ref({})
pluginsConfig.value = getPluginsConfig() as any
getOnlinePluginConfig(pluginsConfig)
const goto = (value: string) => {
    tabListRef.value[value.value]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" })
}
// const isNew = ((time: string) => {
//     if (time) {
//         const targetDate = new Date(time)
//         const currentDate = new Date()
//         const targetTimestamp = targetDate.getTime()
//         const currentTimestamp = currentDate.getTime()
//         const timeDifference = currentTimestamp - targetTimestamp
//         const millisecondsPerDay = 1000 * 60 * 60 * 24 // 每天的毫秒数
//         const daysDifference = Math.floor(timeDifference / millisecondsPerDay)
//         if (daysDifference < 7) { //小于七天 算新插件
//             return true
//         }
//     }
//     return false
// })

const scrollToTop = () => {
    document.querySelector('.right-page-list')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const expandedKeys = ref(['1', '2'])

const filterFixedInputValue = ref('')
provide('filterFixedInputValue', filterFixedInputValue)

const filterObjects = (obj: any, searchString: string): any => {
    if (!searchString) {
        return filterMenuSetup(menuSetupFilter.value)
    }
    const result = {} as any;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const item = obj[key];
            if (typeof item === 'object') {
                if (key === 'basic') {
                    const bItem = Object.values(filterObjects(item.child, searchString))
                    if (bItem.length) {
                        result[key] = {}
                        Object.assign(result[key], item, { child: bItem })
                    }
                    continue
                }
                const hasMatchInTitleOrName = (item.title && item.title.toLocaleLowerCase().includes(searchString)) || (item.name && item.name.toLocaleLowerCase().includes(searchString));
                if (hasMatchInTitleOrName) {
                    result[key] = item
                    continue
                } else {
                    const filteredPreview = item.preview.filter((previewItem: any) => {
                        return (previewItem.name && previewItem.name.toLocaleLowerCase().includes(searchString)) || (previewItem.title && previewItem.title.toLocaleLowerCase().includes(searchString));
                    });
                    if (filteredPreview.length > 0) {
                        result[key] = { ...item, preview: filteredPreview };
                    }
                }
            }
        }
    }
    return result
}
let filteredData = ref(pluginsConfig.value)

watch(filterFixedInputValue, (newValue: any) => {
    filteredData.value = filterObjects(pluginsConfig.value, newValue.toLocaleLowerCase())
    if (!newValue) {
        expandedKeys.value = ['1', '2']
    }
    // console.log('filterFixedInputValue filteredData', filteredData.value)
})

const { menuSetup } = useModel('forPreview')

function filterMenuSetup(msFilter: any) {
    if (msFilter.length === 0) {
        return pluginsConfig.value
        // return filterObjects(pluginsConfig.value, filterFixedInputValue.value.toLocaleLowerCase())
    }
    const result = {} as any
    msFilter.forEach((tag: any) => {
        if (menuSetup.value) {
            for (const key in menuSetup.value) {
                if (menuSetup.value.hasOwnProperty(key)) {
                    for (const key2 in menuSetup.value[key]) {
                        if (menuSetup.value[key].hasOwnProperty(key2)) {
                            if (menuSetup.value[key][key2].taglist === tag) {
                                if (pluginsConfig.value[key]?.preview) {
                                    const filteredPreview = pluginsConfig.value[key].preview.filter((item: any) => item.name === key2)
                                    if (filteredPreview) {
                                        if (result[key]) {
                                            result[key].preview = result[key].preview.concat(filteredPreview)
                                        } else {
                                            result[key] = { ...pluginsConfig.value[key], preview: filteredPreview }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return result
}
const menuSetupFilter = ref([])
provide('menuSetupFilter', menuSetupFilter)
watch(menuSetupFilter, (newValue: any) => {
    filteredData.value = filterMenuSetup(newValue)
    // console.log('menuSetupFilter filteredData', filteredData.value)
})

const getleftMenuBadge = (name: string) => {
    const tagOne = {
        'recommend': { show: false, text: '荐' },
        'new': { show: false, text: '新' },
        'hot': { show: false, text: '热' },
    } as any
    if (menuSetup.value && menuSetup.value[name]) {
        const tmpOne = menuSetup.value[name]
        for (const key in tmpOne) {
            tagOne[tmpOne[key].taglist].show = true
        }
    }
    // console.log(tagOne)
    return tagOne
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

.fes-menu.is-vertical.is-inverted {
    overflow: hidden;
    height: calc(100vh - 54px);
    overflow: scroll;
}

.fes-menu.is-vertical.is-inverted::-webkit-scrollbar {
    display: none;
}

.main-layout .layout-header {
    overflow: hidden;
}

.fes-checkbox-group {
    margin-bottom: 5px;
    margin-right: 20px;
}

.count-fbdge {
    span {
        border-radius: 3px !important;
        background-color: #0f1222 !important;
        border: white 1px solid;
        scale: 0.8;
        padding: 1px !important;
        margin-top: 2px;
        height: 15px;
    }
}

.tag-fbdge {
    span {
        border-radius: 2px !important;
        padding: 0px !important;
    }
}

.fes-menu.is-vertical .fes-menu-item-wrapper {
    height: 46px !important;
}
</style>
<style lang="less" scoped>
.toTop {
    position: fixed;
    right: 20px;
    bottom: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #0f1222;
    cursor: pointer;
}

.count-fbdge {
    position: absolute;
    right: 13px;
    top: 13.8px;
}

.tag-fbdge {
    scale: 0.8;
    margin-bottom: -3px;
    margin-top: 1px;
}

.left-m-text {
    width: 95%;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>