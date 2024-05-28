<template>
    <div class="go-border-box">
        <svg :width="w" :height="h">
            <defs>
                <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
                    <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
                    <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
                    <feFlood :flood-color="colors[1]" result="glowColor" />
                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
                    <feMerge>
                        <feMergeNode in="softGlowColored" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <polygon
                :fill="backgroundColor"
                :points="`
        20, 32 ${w * 0.5 - borderTitleWidth / 2}, 32 ${w * 0.5 - borderTitleWidth / 2 + 20}, 53
        ${w * 0.5 + borderTitleWidth / 2 - 20}, 53 ${w * 0.5 + borderTitleWidth / 2}, 32
        ${w - 20}, 32 ${w - 8}, 48 ${w - 8}, ${h - 25} ${w - 20}, ${h - 8}
        20, ${h - 8} 8, ${h - 25} 8, 50
      `"
            />

            <polyline
                :fill="backgroundColor"
                :stroke="colors[0]"
                :filter="`url(#${filterId})`"
                :points="`
          ${(w - borderTitleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (h - 167) / 2}
          13, ${55 + (h - 167) / 2} 13, ${135 + (h - 167) / 2}
          7, ${140 + (h - 167) / 2} 7, ${h - 27}
          20, ${h - 7} ${w - 20}, ${h - 7} ${w - 7}, ${h - 27}
          ${w - 7}, ${140 + (h - 167) / 2} ${w - 13}, ${135 + (h - 167) / 2}
          ${w - 13}, ${55 + (h - 167) / 2} ${w - 7}, ${50 + (h - 167) / 2}
          ${w - 7}, 50 ${w - 20}, 30 ${(w + borderTitleWidth) / 2}, 30
          ${(w + borderTitleWidth) / 2 - 20}, 7 ${(w - borderTitleWidth) / 2 + 20}, 7
          ${(w - borderTitleWidth) / 2}, 30 ${(w - borderTitleWidth) / 2 + 20}, 52
          ${(w + borderTitleWidth) / 2 - 20}, 52 ${(w + borderTitleWidth) / 2}, 30
        `"
            />

            <polygon
                :stroke="colors[0]"
                fill="transparent"
                :points="`
          ${(w + borderTitleWidth) / 2 - 5}, 30 ${(w + borderTitleWidth) / 2 - 21}, 11
          ${(w + borderTitleWidth) / 2 - 27}, 11 ${(w + borderTitleWidth) / 2 - 8}, 34
        `"
            />

            <polygon
                :stroke="colors[0]"
                fill="transparent"
                :points="`
          ${(w - borderTitleWidth) / 2 + 5}, 30 ${(w - borderTitleWidth) / 2 + 22}, 49
          ${(w - borderTitleWidth) / 2 + 28}, 49 ${(w - borderTitleWidth) / 2 + 8}, 26
        `"
            />

            <polygon
                :stroke="colors[0]"
                :fill="colors[1]"
                :filter="`url(#${filterId})`"
                :points="`
          ${(w + borderTitleWidth) / 2 - 11}, 37 ${(w + borderTitleWidth) / 2 - 32}, 11
          ${(w - borderTitleWidth) / 2 + 23}, 11 ${(w - borderTitleWidth) / 2 + 11}, 23
          ${(w - borderTitleWidth) / 2 + 33}, 49 ${(w + borderTitleWidth) / 2 - 22}, 49
        `"
            />

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="1"
                :points="`
          ${(w - borderTitleWidth) / 2 - 10}, 37 ${(w - borderTitleWidth) / 2 - 31}, 37
          ${(w - borderTitleWidth) / 2 - 25}, 46 ${(w - borderTitleWidth) / 2 - 4}, 46
        `"
            >
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="0.7"
                :points="`
          ${(w - borderTitleWidth) / 2 - 40}, 37 ${(w - borderTitleWidth) / 2 - 61}, 37
          ${(w - borderTitleWidth) / 2 - 55}, 46 ${(w - borderTitleWidth) / 2 - 34}, 46
        `"
            >
                <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="0.5"
                :points="`
          ${(w - borderTitleWidth) / 2 - 70}, 37 ${(w - borderTitleWidth) / 2 - 91}, 37
          ${(w - borderTitleWidth) / 2 - 85}, 46 ${(w - borderTitleWidth) / 2 - 64}, 46
        `"
            >
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="1"
                :points="`
          ${(w + borderTitleWidth) / 2 + 30}, 37 ${(w + borderTitleWidth) / 2 + 9}, 37
          ${(w + borderTitleWidth) / 2 + 3}, 46 ${(w + borderTitleWidth) / 2 + 24}, 46
        `"
            >
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="0.7"
                :points="`
          ${(w + borderTitleWidth) / 2 + 60}, 37 ${(w + borderTitleWidth) / 2 + 39}, 37
          ${(w + borderTitleWidth) / 2 + 33}, 46 ${(w + borderTitleWidth) / 2 + 54}, 46
        `"
            >
                <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <polygon
                :filter="`url(#${filterId})`"
                :fill="colors[0]"
                opacity="0.5"
                :points="`
          ${(w + borderTitleWidth) / 2 + 90}, 37 ${(w + borderTitleWidth) / 2 + 69}, 37
          ${(w + borderTitleWidth) / 2 + 63}, 46 ${(w + borderTitleWidth) / 2 + 84}, 46
        `"
            >
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" begin="0s" repeatCount="indefinite" />
            </polygon>

            <text :x="`${w / 2}`" :y="borderTitleHeight" :fill="borderTitleColor" :font-size="borderTitleSize" text-anchor="middle" dominant-baseline="middle">
                {{ borderTitle }}
            </text>

            <polygon
                :fill="colors[0]"
                :filter="`url(#${filterId})`"
                :points="`
          7, ${53 + (h - 167) / 2} 11, ${57 + (h - 167) / 2}
          11, ${133 + (h - 167) / 2} 7, ${137 + (h - 167) / 2}
        `"
            />

            <polygon
                :fill="colors[0]"
                :filter="`url(#${filterId})`"
                :points="`
          ${w - 7}, ${53 + (h - 167) / 2} ${w - 11}, ${57 + (h - 167) / 2}
          ${w - 11}, ${133 + (h - 167) / 2} ${w - 7}, ${137 + (h - 167) / 2}
        `"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { getUUID } from 'PLS/goView/lib/utils/global'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

const filterId = `border-box-04-filterId-${getUUID()}`
const { w, h } = toRefs(props.chartConfig.attr)
const { colors, borderTitle, borderTitleColor, borderTitleSize, borderTitleHeight, borderTitleWidth, backgroundColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
}
</style>
