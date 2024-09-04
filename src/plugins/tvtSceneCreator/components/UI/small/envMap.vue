<template>
    <div class="envMapDiv">
        <input type="file" id="fileEnv" accept=".hdr,.HDR" style="display: none" />
        <FText size="large" class="title">环境管理</FText>
        <div style="text-align: center; margin: 10px 0px">
            <FSwitch v-model="envSetup.isLightFormer">
                <template #active> lightFormer </template>
                <template #inactive> HDR 贴图 </template>
            </FSwitch>
        </div>
        <div v-show="!envSetup.isLightFormer">
            <FGrid style="margin-top: 10px" :gutter="10">
                <FGridItem :span="6">
                    <div class="col-title">选择HDR</div>
                </FGridItem>
                <FGridItem :span="20">
                    <FButton size="small" style="margin-top: 5px" @click="uploadImg()">
                        <template #icon> <ProductOutlined /> </template>上传
                    </FButton>
                </FGridItem>
            </FGrid>
            <FGrid style="margin-top: 10px" :gutter="10" wrap>
                <FGridItem v-for="ione in imgList" :span="8">
                    <FImage
                        style="width: 66px; height: 48px; margin-bottom: 8px; cursor: pointer"
                        :src="ione.img"
                        fit="contain"
                        class="background-image"
                        :class="{ 'sel-background-image': ione.name === envSetup.envHDR.name }"
                        @click="imgclick(ione)"
                    />
                </FGridItem>
            </FGrid>
        </div>
        <div class="lightFormer-div"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { FText, FGrid, FGridItem, FButton, FImage, FSwitch, FMessage } from '@fesjs/fes-design'
import { ProductOutlined } from '@fesjs/fes-design/icon'
import { Pane } from 'tweakpane'
import { useEnvSetupStore } from 'PLS/tvtSceneCreator/stores/envSetup'
import { loadHDR } from 'PLS/skyBox/common/utils'

const envSetup = useEnvSetupStore()
let pane = null as any
let fileInput = null as any

const imgList = ref([
    { name: 'upload', img: './plugins/tvtSceneCreator/image/backGround/upload.png', src: null },
    {
        name: 'desert',
        img: './plugins/tvtSceneCreator/image/envHDR/desert.jpeg',
        src: await loadHDR('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr'),
    },
    {
        name: 'belfast_sunset_puresky_1k',
        img: './plugins/tvtSceneCreator/image/envHDR/belfast_sunset_puresky_1k.jpeg',
        src: await loadHDR('./plugins/tvtSceneCreator/image/envHDR/belfast_sunset_puresky_1k.hdr'),
    },
    {
        name: 'metro_noord_1k',
        img: './plugins/tvtSceneCreator/image/envHDR/metro_noord_1k.jpeg',
        src: await loadHDR('./plugins/tvtSceneCreator/image/envHDR/metro_noord_1k.hdr'),
    },
    {
        name: 'pretville_cinema_1k',
        img: './plugins/tvtSceneCreator/image/envHDR/pretville_cinema_1k.jpeg',
        src: await loadHDR('./plugins/tvtSceneCreator/image/envHDR/pretville_cinema_1k.hdr'),
    },
    {
        name: 'shanghai_bund_1k',
        img: './plugins/tvtSceneCreator/image/envHDR/shanghai_bund_1k.jpeg',
        src: await loadHDR('./plugins/tvtSceneCreator/image/envHDR/shanghai_bund_1k.hdr'),
    },
])
const uploadImg = () => {
    fileInput.click()
}
const imgclick = async (ione: any) => {
    if (ione.name === 'upload' && !ione.src) {
        FMessage.error({
            content: `请先上传HDR图片！`,
            colorful: false,
        })
        return
    }
    envSetup.envHDR.name = ione.name
    envSetup.envHDR.src = ione.src
}

const setEnvHDR = (name: string) => {
    imgList.value.forEach((item) => {
        if (item.name === name) {
            envSetup.envHDR.name = name
            envSetup.envHDR.src = item.src
        }
    })
}
envSetup.setEnvHDR = setEnvHDR
let fcc = null as any
onMounted(() => {
    const domcolor = document.querySelector('.envMapDiv .lightFormer-div') as any
    pane = new Pane({ container: domcolor })
    pane.addBinding(envSetup, 'blur', { label: '背景模糊', min: 0, max: 1.0, step: 0.01 })

    fcc = pane.addFolder({ title: '属性' })
    fcc.addBinding(envSetup, 'colorA', { label: '颜色1' })
    fcc.addBinding(envSetup, 'colorB', { label: '颜色2' })
    fcc.addBinding(envSetup, 'pos', { label: '位置' })
    fcc.addBinding(envSetup, 'rotate', { label: '旋转' })
    fcc.addBinding(envSetup, 'scale', { label: '缩放', min: 0.1, max: 2.0, step: 0.01 })
    fcc.hidden = true

    fileInput = document.getElementById('fileEnv') as any
    fileInput.onchange = () => {
        const file = fileInput.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = async (e) => {
                if (e.target) {
                    const arrayBuffer = e.target.result as ArrayBuffer
                    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
                    const url = URL.createObjectURL(blob)

                    const texture = await loadHDR(url)
                    // texture.mapping = THREE.EquirectangularReflectionMapping
                    // texture.minFilter = THREE.LinearFilter
                    // texture.magFilter = THREE.LinearFilter
                    imgList.value[0].img = './plugins/tvtSceneCreator/image/envHDR/finishHDR.png'
                    imgList.value[0].src = texture
                    envSetup.envHDR.name = 'upload'
                    envSetup.envHDR.src = texture
                }
            }
        }
    }
})

watch(
    () => envSetup.isLightFormer,
    (v) => {
        fcc.hidden = !v
    },
)
</script>
<style lang="scss" scoped>
.envMapDiv {
    margin-top: -10px;
    .title {
        color: var(--f-text-color-caption);
        text-align: center;
        display: block;
    }
    .color-div {
        margin: 6px 0px;
    }
    .fes-radio-button {
        background: #0f1222;
    }
    .col-title {
        font-size: 13px;
        line-height: 2.5em;
        font-weight: 500;
    }
    .background-image {
        border: 1px solid #ffffff30;
    }
    .sel-background-image {
        border: 1px solid #ffffff;
    }
}
</style>
<style lang="scss">
:root {
    --tp-base-background-color: #0f1222;
    --tp-label-foreground-color: #cfd0d3;
}
.tp-rotv {
    font-size: 13px !important;
}
</style>
