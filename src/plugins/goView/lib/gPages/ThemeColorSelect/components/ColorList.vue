<template>
    <div class="content-left">
        <div
            class="content-left-item go-transition-quick go-mb-0"
            span="12 1000:6 1400:4 1800:4 2200:2"
            v-for="(item, index) in designColorRecommend"
            :key="index"
            @click="colorSelectHandle(item)"
        >
            <n-space>
                <div class="content-left-item-color" :style="{ backgroundColor: item.hex }"></div>
                <n-space vertical>
                    <n-space>
                        <span :style="{ color: item.hex }">{{ item.name }}</span>
                        <span class="Pinyin-upper">{{ item.pinyin.toUpperCase() }}</span>
                    </n-space>
                    <n-text>
                        {{ item.hex }}
                        <n-divider vertical></n-divider>
                        {{ `rgb(${item.RGB[0]}, ${item.RGB[1]}, ${item.RGB[2]})` }}
                    </n-text>
                </n-space>
            </n-space>
        </div>
        <n-divider></n-divider>
        <div
            class="content-left-item go-transition-quick"
            span="12 1000:6 1400:4 1800:4 2200:2"
            v-for="(item, index) in designColor"
            :key="index"
            @click="colorSelectHandle(item)"
        >
            <n-space>
                <div class="content-left-item-color" :style="{ backgroundColor: item.hex }"></div>
                <n-space vertical>
                    <n-space>
                        <span :style="{ color: item.hex }">{{ item.name }}</span>
                        <span class="Pinyin-upper">{{ item.pinyin.toUpperCase() }}</span>
                    </n-space>
                    <n-text>
                        {{ item.hex }}
                        <n-divider vertical></n-divider>
                        {{ `rgb(${item.RGB[0]}, ${item.RGB[1]}, ${item.RGB[2]})` }}
                    </n-text>
                </n-space>
            </n-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { AppThemeColorType } from 'PLS/goView/stores/designStore/designStore.d'
import designColorRecommend from 'PLS/goView/lib/gSettings/designColorRecommend.json'

const emits = defineEmits(['colorSelectHandle'])
defineProps({
    designColor: {
        type: Object as PropType<AppThemeColorType[]>,
        required: true,
    },
})
const colorSelectHandle = (color: AppThemeColorType) => {
    emits('colorSelectHandle', color)
}
</script>

<style lang="scss" scoped>
.content-left {
    display: flex;
    flex-wrap: wrap;
    margin-right: 200px;
    .content-left-item {
        position: relative;
        display: flex;
        margin-bottom: 10px;
        margin-right: 10px;
        padding: 10px 20px;
        min-width: 300px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0);
        &:hover {
            @include hover-border-color('background-color5');
        }
        &::after {
            content: '';
            z-index: -1;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            overflow: hidden;
            border-radius: 5px;
            @extend .go-background-filter-shallow;
            backdrop-filter: none;
        }
        &-color {
            width: 8px;
            height: 40px;
            border-radius: 2px;
        }
        .Pinyin-upper {
            font-size: 8px;
        }
    }
}
</style>
