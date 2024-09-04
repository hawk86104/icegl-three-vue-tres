<template>
    <div class="backgroundMapDiv">
        <input type="file" id="fileBackground" accept="image/*" style="display: none" />
        <FText size="large" class="title">背景管理</FText>
        <div style="text-align: center; margin: 10px 0px">
            <FSwitch v-model="backgroundSetup.useBackImg">
                <template #active> 使用背景色 </template>
                <template #inactive> 使用环境贴图 </template>
            </FSwitch>
        </div>
        <div v-show="backgroundSetup.useBackImg">
            <div class="color-div"></div>
            <FGrid style="margin-top: 10px" :gutter="10">
                <FGridItem :span="6">
                    <div class="col-title">默认颜色</div>
                </FGridItem>
                <FGridItem :span="18">
                    <FRadioGroup v-model="selectedColor" @change="changeColor">
                        <FRadioButton value="b"> 黑色 </FRadioButton>
                        <FRadioButton value="w"> 白色 </FRadioButton>
                        <FRadioButton value="g"> 灰色 </FRadioButton>
                    </FRadioGroup>
                </FGridItem>
            </FGrid>
            <FGrid style="margin-top: 10px" :gutter="10">
                <FGridItem :span="6">
                    <div class="col-title">选择图片</div>
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
                        class="background-image"
                        :class="{ 'sel-background-image': ione.name === backgroundSetup.img.name }"
                        :src="ione.src"
                        fit="contain"
                        @click="imgclick(ione)"
                    />
                </FGridItem>
            </FGrid>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { FText, FRadioButton, FRadioGroup, FGrid, FGridItem, FButton, FImage, FSwitch, FMessage } from '@fesjs/fes-design'
import { ProductOutlined } from '@fesjs/fes-design/icon'
import { Pane } from 'tweakpane'
import { useBackgroundSetupStore } from 'PLS/tvtSceneCreator/stores/backgroundSetup'

const backgroundSetup = useBackgroundSetupStore()
const selectedColor = ref('')

let pane = null as any
let fileInput = null as any

const changeColor = (color: string) => {
    if (color === 'b') {
        backgroundSetup.color = '#000'
        pane.children[0].refresh()
    }
    if (color === 'w') {
        backgroundSetup.color = '#fff'
        pane.children[0].refresh()
    }
    if (color === 'g') {
        backgroundSetup.color = '#888'
        pane.children[0].refresh()
    }
}

const imgList = [
    { name: 'upload', src: './plugins/tvtSceneCreator/image/backGround/upload.png' },
    { name: 'b-blue', src: './plugins/tvtSceneCreator/image/backGround/b-blue.jpeg' },
    { name: 'b-black', src: './plugins/tvtSceneCreator/image/backGround/b-black.jpeg' },
    { name: 'b-green', src: './plugins/tvtSceneCreator/image/backGround/b-green.jpeg' },
    { name: 'b-red', src: './plugins/tvtSceneCreator/image/backGround/b-red.jpeg' },
    { name: 'b-cyan', src: './plugins/tvtSceneCreator/image/backGround/b-cyan.jpeg' },
]
const imgclick = (ione: any) => {
    if (ione.name === 'upload' && ione.src === './plugins/tvtSceneCreator/image/backGround/upload.png') {
        FMessage.error({
            content: `请先上传背景图片！`,
            colorful: false,
        })
        return
    }

    backgroundSetup.img = { name: ione.name, src: ione.src }
}
const uploadImg = () => {
    fileInput.click()
}
onMounted(() => {
    const domcolor = document.querySelector('.backgroundMapDiv .color-div') as any
    pane = new Pane({ container: domcolor })
    pane.addBinding(backgroundSetup, 'color', { label: '纯色' })

    fileInput = document.getElementById('fileBackground') as any
    fileInput.onchange = () => {
        const file = fileInput.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const imgSrc = reader.result as string
                imgList[0].src = imgSrc
                backgroundSetup.img = imgList[0]
            }
        }
    }
})
</script>
<style lang="scss" scoped>
.backgroundMapDiv {
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
