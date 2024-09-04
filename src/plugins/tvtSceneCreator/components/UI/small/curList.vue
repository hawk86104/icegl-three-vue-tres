<template>
    <div class="container">
        <FDraggable v-model="curMeshList.mlist" disabled>
            <template #default="{ item, index }">
                <div class="sort-item" :class="{ 'active': index === curMeshList.selectedMeshIndex }" @click="selListOne(index)">
                     {{ item.name }}
                     <template v-if="item.type!=='AmbientLight'&&item.type!=='DirectionalLight'">
                        <{{item.type}}>
                    </template>
                    <CloseCircleFilled color="rgb(212 0 78)" class="del-i" @click="delItem(index)" />
                </div>
            </template>
        </FDraggable>
        <div style="color: white;" v-show="curMeshList.mlist.length === 0"> 暂无任何物体 </div>
    </div>
</template>

<script lang="ts" setup>
// <DragOutlined :size="18" :color="item.color" /> DragOutlined
import { FDraggable, FModal } from '@fesjs/fes-design'
import { CloseCircleFilled } from '@fesjs/fes-design/icon'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'

const curMeshList = useCurMeshListStore() as any

// const getRandomBrightColor = () => {
//     const r = Math.floor(Math.random() * 128) + 128
//     const g = Math.floor(Math.random() * 128) + 128
//     const b = Math.floor(Math.random() * 128) + 128
//     const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
//     return color
// }

const delItem = (index: number) => {
    FModal.confirm({
        title: '删除选中项',
        content: `是否删除当前项:${curMeshList.mlist[index].name} ？`,
        okText: '确认删除',
        onOk() {
            if (curMeshList.selectedMeshIndex === index) {
                curMeshList.selectedMeshIndex = null
            }
            curMeshList.removeMesh(index)
            // curMeshList.selectedMeshIndex = curMeshList.mlist.length - 2
        },
        onCancel() {},
    })
}

const selListOne = (index: number) => {
    if (!curMeshList.controlState) {
        curMeshList.controlState = 'sel'
    }
    curMeshList.selectedMeshIndex = index
}
</script>

<style lang="scss" scoped>
.sort-item {
    line-height: 22px;
    background: #000;
    margin: 2px 0;
    padding-left: 23px;
    color: #cbcbcb;
    text-align: left;
    cursor: pointer;
    position: relative;
    .fes-design-icon {
        position: absolute;
        top: 2px;
        left: 2px;
    }
    .del-i {
        right: 6px;
        top: 4px;
        left: auto;
    }
}
.active{
    border: 1px solid #fff;
}
</style>

<style lang="scss"></style>
