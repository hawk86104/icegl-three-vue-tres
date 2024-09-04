<template>
    <f-menu inverted @select="handleSelect">
        <f-sub-menu value="1">
            <template #icon>
                <FolderOutlined />
            </template>
            <template #label>文件</template>
            <f-menu-item value="1.1">
                <template #label>新建 - 场景</template>
            </f-menu-item>
            <f-menu-item value="1.2">
                <template #label>导入 - 场景配置</template>
            </f-menu-item>
            <f-menu-item value="1.3">
                <template #label>导出 - 场景配置</template>
            </f-menu-item>
            <f-menu-item value="1.4">
                <template #label>生成 - 项目插件包</template>
            </f-menu-item>
        </f-sub-menu>
        <!-- <f-sub-menu value="2">
            <template #icon>
                <SettingOutlined />
            </template>
            <template #label>场景设置</template>
            <f-menu-item value="2.1" label="环境设置" />
            <f-menu-item value="2.2" label="全屏" />
        </f-sub-menu>
        <f-sub-menu value="3">
            <template #icon>
                <ShareOutlined />
            </template>
            <template #label>助手</template>
            <f-menu-item value="3.1" label="网格助手" />
            <f-menu-item value="3.2" label="灯光助手" />
            <f-menu-item value="3.3" label="场景属性" />
            <f-menu-item value="3.4" label="陀螺仪" />
        </f-sub-menu>
        <f-menu-item value="4" label="当前预览">
            <template #icon>
                <EyeOutlined />
            </template>
        </f-menu-item> -->
        <f-sub-menu value="5">
            <template #icon>
                <ShareOutlined />
            </template>
            <template #label>关于</template>
            <f-menu-item value="5.1" label="功能介绍" />
            <f-menu-item value="5.2" label="视频说明" />
            <f-menu-item value="5.3" label="免费源码包" />
        </f-sub-menu>
    </f-menu>
</template>

<script setup lang="ts">
import { FMenu, FSubMenu, FMenuItem, FMessage } from '@fesjs/fes-design'
import { FolderOutlined, ShareOutlined } from '@fesjs/fes-design/icon' // SettingOutlined EyeOutlined
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'
import { useBackgroundSetupStore } from 'PLS/tvtSceneCreator/stores/backgroundSetup'
import { useEnvSetupStore } from 'PLS/tvtSceneCreator/stores/envSetup'


const envSetup = useEnvSetupStore()
const backgroundSetup = useBackgroundSetupStore()
const curMeshList = useCurMeshListStore()

const exportSceneConfig = () => {
    const configAll = {
        mlist: curMeshList.mlist,
        envSetup: envSetup,
        backgroundSetup: backgroundSetup,
    }
    debugger
    const fileContent = JSON.stringify(configAll, null, 2)
    const blob = new Blob([fileContent], { type: 'application/javascript' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'tvtSceneCreator.config.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

const inputSceneConfig = () => {
    if (curMeshList.mlist.length > 0) {
        FMessage.error({
            content: `当前场景存在物体，请新建空场景再导入配置!`,
            colorful: true,
        })
        return
    }
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.js'
    input.onchange = async (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const text = await file.text()
            try {
                const config = JSON.parse(text) as any
                curMeshList.mlist = config.mlist

                envSetup.isLightFormer = config.envSetup.isLightFormer
                envSetup.colorA = config.envSetup.colorA
                envSetup.colorB = config.envSetup.colorB
                envSetup.blur = config.envSetup.blur
                envSetup.pos = config.envSetup.pos
                envSetup.rotate = config.envSetup.rotate
                envSetup.scale = config.envSetup.scale
                if (config.envSetup.envHDR.name !== 'upload') {
                    envSetup.setEnvHDR(config.envSetup.envHDR.name)
                }

                backgroundSetup.color = config.backgroundSetup.color
                backgroundSetup.img = config.backgroundSetup.img
                backgroundSetup.useBackImg = config.backgroundSetup.useBackImg

                FMessage.info({
                    content: `配置导入成功!`,
                    colorful: true,
                })
            } catch (error: any) {
                FMessage.error({
                    content: `读取文件时发生错误: ${error.message}`,
                    colorful: true,
                })
            }
        }
    }
    input.click()
}

const handleSelect = ({ value }: { value: string }) => {
    if (value === '5.1') {
        window.open('https://www.icegl.cn/tvtstore/tvtSceneCreator')
    }
    if (value === '5.3') {
        window.open('https://www.icegl.cn/tvtstore/tvtSceneCreator')
    }
    if (value === '5.2' || value === '1.4') {
        FMessage.info({
            content: `功能更新中，敬请期待!`,
            colorful: true,
        })
    }
    if (value === '1.1') {
        curMeshList.clearMesh()
        FMessage.info({
            content: `场景已清空!`,
            colorful: true,
        })
    }
    if (value === '1.3') {
        exportSceneConfig()
        FMessage.info({
            content: `配置导出成功!`,
            colorful: true,
        })
    }
    if (value === '1.2') {
        inputSceneConfig()
    }
}
</script>

<style lang="less" scoped>
.fes-sub-menu {
    min-width: 120px;
    pointer-events: all;
}
</style>
