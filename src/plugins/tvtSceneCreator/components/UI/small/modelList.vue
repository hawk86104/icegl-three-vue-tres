<template>
    <div class="fit-demo">
        <FCollapse v-model="activeNames">
            <FCollapseItem title="模型列表" name="1">
                <div class="list-div">
                    <div v-for="(item, index) in modelFileList" :key="index" class="block" @click="addMesh(item)">
                        <FEllipsis class="demonstration" :content="item.name" :tooltip="{ popperClass: 'a', showAfter: 500 }" style="max-width: 100px" />
                        <FImage style="width: 100px; height: 100px" :src="item.img" fit="contain" />
                    </div>
                </div>
            </FCollapseItem>
            <FCollapseItem title="常用灯光" name="2">
                <div class="one-light" @click="addMesh('ambientLight')"><PlusCircleFilled :size="13" /> 环境光</div>
                <div class="one-light" @click="addMesh('directionalLight')"><PlusCircleFilled :size="13" /> 平行光</div>
            </FCollapseItem>
            <FCollapseItem title="常用物体" name="3">
                <div class="one-light" @click="addMesh('Sphere')"><PlusCircleFilled :size="13" /> 圆球</div>
                <div class="one-light" @click="addMesh('Box')"><PlusCircleFilled :size="13" /> 立方体</div>
            </FCollapseItem>
        </FCollapse>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FImage, FEllipsis, FCollapse, FCollapseItem, FMessage } from '@fesjs/fes-design'
import { PlusCircleFilled } from '@fesjs/fes-design/icon'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'
import { useotherConfigStore } from 'PLS/tvtSceneCreator/stores/otherConfig'
import { modelFileList } from 'PLS/tvtSceneCreator/modelList.config.js'

const otherConfig = useotherConfigStore() as any
const curMeshList = useCurMeshListStore() as any

const addMesh = (type: any) => {
    if (type === 'ambientLight') {
        if (curMeshList.hasAmbientLight()) {
            FMessage.error({
                content: `场景内已存在环境光，不能再添加！`,
                colorful: false,
            })
            return
        } else {
            curMeshList.addMesh({ name: 'AmbientLight', type: 'AmbientLight', intensity: 10 })
        }
    } else if (type === 'directionalLight') {
        curMeshList.addMesh({ name: 'DirectionalLight', type: 'DirectionalLight', intensity: 5, position: [5, 3, 5] })
    } else if (type === 'Box') {
        curMeshList.addMesh({ name: 'Box-add', type: 'Mesh', position: [0, 0, 0], args: [10, 10, 10], metalness: 1, roughness: 0.14 })
    } else if (type === 'Sphere') {
        curMeshList.addMesh({
            name: 'Sphere-add',
            type: 'Mesh',
            position: [0, 0, 0],
            args: [2, 32, 16],
            geometry: 'SphereGeometry',
            material: 'MeshStandardMaterial',
        })
    } else {
        curMeshList.addMesh({
            name: type.name,
            type: type.type,
            position: [0, 0, 0],
            url: type.url,
        })
    }
    curMeshList.selectedMeshIndex = null
    otherConfig.activeModel = 'nowin'
}
const activeNames = ref(['1'])

</script>

<style lang="scss" scoped>
.fit-demo {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 600px;
    .list-div {
        display: flex;
        flex-wrap: wrap;
        .block {
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 10px;
            padding-right: 0px;
            cursor: pointer;
        }
    }
    .one-light {
        text-align: left;
        padding: 10px 0px 10px 40px;
        color: #fff;
        cursor: pointer;
        line-height: 14px;
        position: relative;
        .fes-design-icon {
            display: block;
            position: absolute;
            left: 16px;
        }
    }
}
.fit-demo::-webkit-scrollbar {
    width: 4px;
}
.fit-demo::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    opacity: 0.2;
}
.fit-demo::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
}
.fit-demo::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
</style>

<style lang="scss">
.fit-demo {
    .block {
        .demonstration {
            font-size: 12px;
            color: #eee;
            line-height: 28px;
            margin-top: -10px;
            margin-bottom: -10px;
        }
    }
    .fes-collapse-item__header {
        background: #0f1222;
        color: var(--f-text-color-caption);
    }
    .fes-collapse-item__wrap.is-embedded {
        background: #0f1222;
    }
    .fes-collapse-item__content {
        padding: 5px;
    }
}
</style>
