
<template>
    <TresCanvas clearColor="#201919" window-size v-bind="state">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 10, -28]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <Suspense>
            <primitive :object="model" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { Pane } from 'tweakpane'
import * as TWEEN from '@tweenjs/tween.js'
import _ from 'Lodash'
import * as THREE from 'three'

const { scene: model, nodes } = await useGLTF('/plugins/operationTool/model/湖中小亭/湖中小亭.gltf')
    model.updateMatrixWorld(true) // 强制更新
let ifExplode = false
const state = reactive({
    // windowSize: true,
    alpha: true,
    antialias: true,
    autoClear: false,
    disableRender: true,
})
const buildingsLinesState = reactive({
    width: 1.0,
    color: '#000',
    opacity: 1.0,
    show: true,
})
const  disintegrate = function () {
    model.children.forEach((child, index) => {
        if (child.isMesh) {
            const boundingBox = new THREE.Box3().setFromObject(child)
            const childCenter = new THREE.Vector3()
            boundingBox.getCenter(childCenter)
            // let pos = childCenter.multiplyScalar(2);
            new TWEEN.Tween(childCenter)
                .to(new THREE.Vector3(0,0,0), 3000)
                .onUpdate((val) => {
                    child.position.copy(val)
                })
                .start()
                .onComplete((val) => {
                    
                })
        }
    })
}
const explode = function () {
    model.children.forEach((child, index) => {
        let origin = _.cloneDeep(child.position)
        child.userData.explode = {
            state: false,
            explode: origin,
        }
        if (child.isMesh) {
            const boundingBox = new THREE.Box3().setFromObject(child)
            const childCenter = new THREE.Vector3()
            boundingBox.getCenter(childCenter)
            let pos = childCenter.multiplyScalar(2);
            new TWEEN.Tween(origin)
                .to(pos, 3000)
                .onUpdate((val) => {
                    child.position.copy(val)
                })
                .start()
                .onComplete((val) => {
                    
                })
        }
    })
}
onMounted(() => {
   
    const paneControl = new Pane({
        title: '炸开与还原',
        expanded: true,
    })
    // paneControl.containerElem_.style.top = '54px'

    const f1 = paneControl.addFolder({
        title: '参数',
    })
 
    f1.addButton({
        title: '炸开',
        label: '炸开', // optional
    }).on('click', () => {
       explode()
    })
     f1.addButton({
        title: '还原',
        label: '还原', // optional
    }).on('click', () => {
       disintegrate()
    })
})
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    TWEEN.update()
    //循环render
})
</script>

<style scoped>
</style>