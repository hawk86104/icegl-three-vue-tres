<template>
    <n-radio-group :value="props.modelValue || INHERIT_VALUE" @update:value="handleChange">
        <n-space>
            <n-tooltip :show-arrow="false" trigger="hover" v-for="item in rendererList" :key="item.value">
                <template #trigger>
                    <n-radio :value="item.value">
                        {{ item.value }}
                    </n-radio>
                </template>
                {{ item.desc }}
            </n-tooltip>
        </n-space>
    </n-radio-group>
</template>
<script setup lang="ts">
import { type EchartsRenderer } from 'PLS/goView/lib/gSettings/chartThemes'

const props = defineProps<{ modelValue?: EchartsRenderer; includeInherit?: boolean }>()
const emits = defineEmits(['update:modelValue'])

const INHERIT_VALUE = 'inherit'

const handleChange = (val: EchartsRenderer & typeof INHERIT_VALUE) => {
    emits('update:modelValue', val === INHERIT_VALUE ? undefined : val)
}

const rendererList = [
    {
        value: 'svg',
        desc: '在缩放场景下具有更好的表现',
    },
    {
        value: 'canvas',
        desc: '数据量较大（经验判断 > 1k）、较多交互时，建议选择',
    },
    ...(props.includeInherit
        ? [
              {
                  value: INHERIT_VALUE,
                  desc: '默认继承全局配置',
              },
          ]
        : []),
]
</script>
