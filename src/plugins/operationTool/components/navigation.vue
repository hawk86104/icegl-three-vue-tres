<template>
    <canvas id="containerNav"></canvas>
</template>
 
<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue'
import * as THREE from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const props = withDefaults(
    defineProps<{
        message: any
    }>(),
    {},
)
let scene = null
let camera = null
let renderer = null
let container = null
let cube = null
let initSence = () => {
    container = document.getElementById('containerNav')
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#f7f7f9')
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000)
    camera.position.z = 2500
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: container,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)

    renderer.setPixelRatio(window.devicePixelRatio)
    // container.appendChild(renderer.domElement);
    // 添加光源
    var light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    // 添加平行光源
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.enableDamping = true // 启用阻尼
    orbit.dampingFactor = 0.05 // 设置阻尼因子
    orbit.enabled = true //scope.enableZoom = true;
    orbit.enableZoom = true //enableRotate enablePan
    orbit.enableRotate = true
    orbit.enablePan = false
    // 添加 AxesHelper
    const axesHelper = new THREE.AxesHelper(5) // 参数为轴的长度
    scene.add(axesHelper)

    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    // 启动动画循环
    animate()
}
let createNav = () => {
    let geometry = new THREE.BoxGeometry(1800, 1800, 1800)
    let materials = createMetrial()
    cube = new THREE.Mesh(geometry, materials)
    cube.position.set(0, 0, 0)
    scene.add(cube)
    initEvent(materials)
}
let createMetrial = () => {
    // 创建立方体的每个面的材质
    const CANVAS_SIZE = 256
    let materials = []
    let aa = ['右', '左', '上', '下', '前', '后']
    aa.forEach(function (text) {
        // 创建一个canvas元素
        var canvas = document.createElement('canvas')
        canvas.width = CANVAS_SIZE
        canvas.height = CANVAS_SIZE
        // 获取canvas的2d绘图上下文
        var context = canvas.getContext('2d')
        // context.fillStyle = '#f0f0f0';  // 设置填充颜色为白色
        context.fillStyle = '#f6fcff' // 设置填充颜色为白色
        context.fillRect(0, 0, canvas.width, canvas.height) // 填充整个canvas
        // 在canvas上绘制文字
        context.fillStyle = 'black' // 将文字颜色改为红色
        // context.font = 'bold 200px serif';  // 将文字大小改为96px
        context.font = 'bold 100px arial'
        context.textAlign = 'center' // 设置文字对齐方式为居中
        context.textBaseline = 'middle' // 设置文字基线为中线
        context.fillText(text, canvas.width / 2, canvas.height / 2) // 将文字绘制在canvas的中心
        // 创建一个纹理
        // 使用canvas作为纹理
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true

        // 使用MeshStandardMaterial以支持高光效果
        var material = new THREE.MeshStandardMaterial({
            map: texture,
            color: 0xffffff,
            emissive: 0x000000,
            side: THREE.DoubleSide,
        })
        materials.push(material)
    })
    return materials
}
let initEvent = (materials) => {
    // 鼠标悬停高亮效果
    var raycaster = new THREE.Raycaster()
    var mouse = new THREE.Vector2()
    function onClick(event) {
        // document.getElementById("containerNav").style =
        //   "cursor: grabbing !important";
        // 计算鼠标位置的归一化设备坐标
        mouse.x = (event.offsetX / container.clientWidth) * 2 - 1
        mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1

        // 通过相机和鼠标位置更新射线
        raycaster.setFromCamera(mouse, camera)

        // 计算物体和射线的交点
        var intersects = raycaster.intersectObjects([cube])

        // 遍历交点，将相应面的材质高亮
        for (var i = 0; i < materials.length; i++) {
            materials[i].emissive.set(0x000000) // 清除之前的高亮
        }

        if (intersects.length > 0) {
            let index = intersects[0].face.materialIndex
            updateMainCamera(index)
            materials[index].emissive.set('#eb780a') // 设置高亮
        }
    }
    renderer.domElement.addEventListener('click', onClick, false)
}
let updateMainCamera = (index) => {
    console.log('message', props.message)
    // return
    let initCameraPos = 50
    if (index == 4) {
        //前
        props.message.position.set(0, 0, initCameraPos)
    } else if (index == 5) {
        //后
        props.message.position.set(0, 0, -initCameraPos)
    } else if (index == 1) {
        //下
        props.message.position.set(-initCameraPos, 0, 0)
    } else if (index == 0) {
        //上
        props.message.position.set(initCameraPos, 0, 0)
    } else if (index == 3) {
        //下
        props.message.position.set(0, -initCameraPos, 0)
    } else if (index == 2) {
        //右
        props.message.position.set(0, initCameraPos, 0)
    }

    props.message.lookAt(new THREE.Vector3(0, 0, 0))
}
onMounted(() => {
    initSence()
    createNav()
})
watchEffect(() => {})
</script>
<style  scoped>
#containerNav {
    position: absolute;
    /* background: red; */

    left: 15px;
    bottom: 15px;
    width: 96px;
    height: 96px;
    cursor: grabbing !important;
}
</style>
