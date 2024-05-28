<template>
    <n-button quaternary @click="modelShow = true" title="颜色">
        <n-icon size="20" :depth="1">
            <color-wand-icon></color-wand-icon>
        </n-icon>
    </n-button>
    <n-modal v-model:show="modelShow">
        <div class="go-system-color-setting">
            <n-space justify="space-between">
                <n-h3 class="title">主题颜色选择</n-h3>
                <n-icon size="20" class="go-cursor-pointer" @click="modelShow = false">
                    <close-icon></close-icon>
                </n-icon>
            </n-space>
            <n-divider></n-divider>
            <div class="model-content" ref="contentLeftRef">
                <div class="content-left" v-if="modelShow">
                    <color-list :designColor="designColorSplit" @colorSelectHandle="colorSelectHandle"></color-list>
                </div>
                <div class="content-right">
                    <div class="color-name-detail">
                        <n-text v-if="appThemeDetail" class="color-name">{{ appThemeDetail.name }}</n-text>
                        <n-text v-else class="color-name">中国色</n-text>
                        <n-text v-if="appThemeDetail" class="color-name-Pinyin">{{ appThemeDetail.pinyin.toUpperCase() }}</n-text>
                        <div v-if="appThemeDetail" class="select-color" :style="{ backgroundColor: designStore.appTheme }"></div>
                    </div>
                    <img src="" />
                </div>
            </div>
            <div class="model-footer">
                中国色列表来自于：
                <n-a href="http://zhongguose.com" target="_blank">http://zhongguose.com</n-a>
            </div>
        </div>
    </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue'
import { useDesignStore } from 'PLS/goView/stores/designStore/designStore'
import { AppThemeColorType } from 'PLS/goView/stores/designStore/designStore.d'
import { icon } from 'PLS/goView/lib/gPlugins/'
import { loadAsyncComponent } from 'PLS/goView/lib/utils/global'
import { useScroll } from '@vueuse/core'
import designColor from 'PLS/goView/lib/gSettings/designColor.json'

const ColorList = loadAsyncComponent(() => import('./components/ColorList.vue'))
const { ColorWandIcon, CloseIcon } = icon.ionicons5

let splitNumber = 50

const designStore = useDesignStore()
const modelShow = ref(false)
const contentLeftRef = ref<HTMLElement | null>(null)
const designColorSplit = ref(designColor.slice(0, splitNumber))

const { arrivedState } = useScroll(contentLeftRef, {
    offset: { bottom: 200 },
})
const { bottom } = toRefs(arrivedState)

const appThemeDetail = computed(() => {
    return designStore.getAppThemeDetail
})

const colorSelectHandle = (color: AppThemeColorType) => {
    designStore.setAppColor(color)
}

watch(
    () => bottom.value,
    (newData: boolean) => {
        if (newData) {
            splitNumber = splitNumber + 50
            designColorSplit.value = designColor.slice(0, splitNumber)
        }
    },
)

watch(
    () => modelShow.value,
    (modelShow: boolean) => {
        if (!modelShow) {
            splitNumber = 50
        }
    },
)
</script>

<style lang="scss" scoped>
$height: 85vh;
@include go('system-color-setting') {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    min-width: 1000px;
    padding: 20px 25px;
    height: $height;
    border-radius: 15px;
    overflow: hidden;
    @extend .go-background-filter;
    @include hover-border-color('background-color5');
    .title {
        margin: 0;
    }
    .model-content {
        flex: 1;
        height: calc(#{$height} - 40px - 48px - 36px);
        overflow: auto;
        /* 右侧 */
        .content-right {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 300px;
            height: 100%;
            right: 50px;
            top: 0px;
            .color-name-detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 40px;
                .go-flex-items-center {
                    flex-direction: column;
                }
                .select-color {
                    margin-top: 20px;
                    width: 100px;
                    height: 20px;
                    border-radius: 3px;
                    background-image: url('');
                }
                .color-name {
                    font-family: serif;
                    font-size: 80px;
                    color: #fff;
                    margin: 0 auto;
                    display: block;
                    width: 110px;
                    text-align: center;
                    background-position: center top;
                    background-repeat: no-repeat;
                }
                .color-name-Pinyin {
                    text-align: center;
                    font-family: Georgia;
                    font-size: 16px;
                }
            }
        }
    }
    .model-footer {
        z-index: 1;
        text-align: end;
    }
}
</style>
