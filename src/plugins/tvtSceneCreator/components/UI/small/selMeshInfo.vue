<template>
    <div class="selMeshInfo-div" v-show="curMeshList.selectedMeshIndex !== null">
        <FText size="large" class="title">详情信息</FText>
        <div class="info-div" />
    </div>
    <div v-show="curMeshList.selectedMeshIndex === null">暂未选择物体</div>
</template>

<script lang="ts" setup>
import { onMounted, watch, toRaw } from 'vue'
import { useSeek } from '@tresjs/core'
import { FText } from '@fesjs/fes-design'
import { Pane } from 'tweakpane'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'

const curMeshList = useCurMeshListStore()

const PARAMS = {
    meshType: 'Mesh',
    meshName: '自行车',
    uuid: '1234567890',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    renderOrder: 0,
    visible: true,
    castShadow: true,
    receiveShadow: true,
}
let pane = null as any
const { seek } = useSeek()
let selMesh = null as any
watch(
    () => curMeshList.selectedMeshIndex,
    (index) => {
        bingPARAMS()
    },
)
const bingPARAMS = () => {
    const index = curMeshList.selectedMeshIndex
    if (index !== null) {
        const mesh = seek(curMeshList.tresGroup as any, 'meshListIndex', index) as any
        if (mesh) {
            selMesh = toRaw(mesh)
            PARAMS.meshType = selMesh.type
            PARAMS.meshName = selMesh.name
            PARAMS.uuid = selMesh.uuid

            PARAMS.position = selMesh.position
            PARAMS.rotation = selMesh.rotation
            PARAMS.scale = selMesh.scale

            PARAMS.renderOrder = selMesh.renderOrder
            PARAMS.visible = selMesh.visible
            PARAMS.castShadow = selMesh.castShadow
            PARAMS.receiveShadow = selMesh.receiveShadow

            pane.refresh()
        }
    }
}
// @ts-ignore
window['TvTSCinForPane'] = bingPARAMS
onMounted(() => {
    const domcolor = document.querySelector('.selMeshInfo-div .info-div') as any
    pane = new Pane({ container: domcolor })
    pane.addBinding(PARAMS, 'meshType', { label: '物体类型', disabled: true })
    pane.addBinding(PARAMS, 'meshName', { label: '物体名称', disabled: true })
    pane.addBinding(PARAMS, 'uuid', { label: '识别码', disabled: true })

    pane.addBinding(PARAMS, 'position', { label: '位置' })
    pane.addBinding(PARAMS, 'rotation', { label: '旋转' })
    pane.addBinding(PARAMS, 'scale', { label: '缩放' })

    pane.addBinding(PARAMS, 'renderOrder', { label: '渲染顺序', step: 1, min: 0 })
    pane.addBinding(PARAMS, 'visible', { label: '是否可见' })
    pane.addBinding(PARAMS, 'castShadow', { label: '产生阴影' })
    pane.addBinding(PARAMS, 'receiveShadow', { label: '接受阴影' })

    pane.on('change', (ev: any) => {
        if (ev.target.key === 'visible') {
            selMesh.visible = ev.value
        }
        if (ev.target.key === 'renderOrder') {
            selMesh.renderOrder = ev.value
        }
        if (ev.target.key === 'castShadow') {
            selMesh.castShadow = ev.value
        }
        if (ev.target.key === 'receiveShadow') {
            selMesh.receiveShadow = ev.value
        }
        const index = curMeshList.selectedMeshIndex
        if (index !== null) {
            const mesh = toRaw(seek(curMeshList.tresGroup as any, 'meshListIndex', index)) as any
            const mObject = toRaw(curMeshList.mlist[index]) as any
            if (mesh && ev.target.key !== 'uuid') {
                console.log(ev.target.key, index, mesh, mObject)
                if (mesh[ev.target.key] && mObject[ev.target.key]) {
                    if (ev.target.key === 'position' || ev.target.key === 'rotation' || ev.target.key === 'scale') {
                        mObject[ev.target.key][0] = mesh[ev.target.key].x
                        mObject[ev.target.key][1] = mesh[ev.target.key].y
                        mObject[ev.target.key][2] = mesh[ev.target.key].z
                    } else {
                        mObject[ev.target.key] = mesh[ev.target.key]
                    }
                }
            }
        }
    })
})
</script>
<style lang="scss" scoped>
.selMeshInfo-div {
    .title {
        color: var(--f-text-color-caption);
        text-align: center;
        display: block;
        margin-bottom: 10px;
    }
}
</style>
<style lang="scss"></style>
