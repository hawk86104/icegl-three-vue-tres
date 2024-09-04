<template>
    <threeDcom />
    <FConfigProvider :themeOverrides="themeOverrides">
        <div
            id="UIDIV"
            style="
                position: absolute;
                width: 100%;
                height: 100%;
                pointer-events: none;
                -webkit-user-select: none; /* Safari */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* IE10+/Edge */
                user-select: none; /* Standard syntax */
            "
        >
            <topMenu />
            <leftLayout />
            <rightEnvSetup />
            <bottomContr />
        </div>
    </FConfigProvider>
</template>

<script setup lang="ts">
import { FConfigProvider } from '@fesjs/fes-design'

import topMenu from '../components/UI/topMenu.vue'
import leftLayout from '../components/UI/leftLayout.vue'
import rightEnvSetup from '../components/UI/rightEnvSetup.vue'
import bottomContr from '../components/UI/bottomContr.vue'
import threeDcom from '../components/Tres/index.vue'

const themeOverrides = {
    common: {
        primaryColor: '#8f98ff',

        successColor: '#00cb91',
        dangerColor: '#ff4d4f',
        warningColor: '#f29360',
        tipColor: '#8f98ff',

        white: '#fff',
        black: '#000',

        bodyBgColor: '#fff',

        fontColorBase: '#0f1222',
        fontSizeBase: '14px',

        borderRadiusBase: '4px',
        borderRadiusSm: '2px',
        borderWidthBase: '1px',
        borderStyleBase: 'solid',

        borderColorBase: '#cfd0d3',

        shadowColor: 'rgba(18, 18, 18, 0.1)',
        shadowColorSm: 'rgba(18, 18, 18, 0.2)',
        shadowRadius: '12px',
        shadowRadiusSm: '4px',

        maskColor: 'rgba(18, 18, 18, 0.45)',
    },
}
</script>

<style lang="scss">
:root {
    .fpsStats {
        top: 7px;
        right: 8px;
        left: auto;
    }
}
</style>
