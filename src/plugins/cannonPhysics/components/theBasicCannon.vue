<template></template>

<script setup lang="ts">
import { World, Sphere, Body, Material, ContactMaterial, Plane, NaiveBroadphase } from 'cannon-es'
import { useRenderLoop } from '@tresjs/core'

const props = defineProps({
    sphere: {
        default: null as any,
    },
    sphere2: {
        default: null as any,
    },
    plane: {
        default: null as any,
    },
})

const world = new World()
world.gravity.set(0, -9.82, 0)
// 使用 NaiveBroadphase 进行宽相位碰撞检测
world.broadphase = new NaiveBroadphase()
// 设置默认接触材料的松弛和刚度
world.defaultContactMaterial.contactEquationRelaxation = 5
world.defaultContactMaterial.contactEquationStiffness = 1e7

const sphereSize = props.sphere.geometry.parameters.radius
const mass = 10

const sphereShape = new Sphere(sphereSize)

const sphere1Body = new Body({ mass })
sphere1Body.addShape(sphereShape)
sphere1Body.position.copy(props.sphere.position)
sphere1Body.material = new Material({ restitution: 10 })

const sphere2Body = new Body({ mass })
sphere2Body.addShape(sphereShape)
sphere2Body.position.copy(props.sphere2.position)
sphere2Body.material = new Material({ restitution: 1 })

const planeShape = new Plane()
const planeBody = new Body({ mass: 0 })
planeBody.addShape(planeShape)
planeBody.position.copy(props.plane.position)
planeBody.quaternion.set(...(props.plane.quaternion.toArray() as [number, number, number, number]))
// planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
planeBody.material = new Material()

// 创建接触材料，定义球体和平面之间的摩擦力和弹性
const sph1_plane = new ContactMaterial(planeBody.material, sphere1Body.material, { friction: 0.0, restitution: 0.7 })
const sph2_plane = new ContactMaterial(planeBody.material, sphere2Body.material, { friction: 0.0, restitution: 0.9 })
// friction 摩擦力
// restitution 弹性

world.addContactMaterial(sph1_plane)
world.addContactMaterial(sph2_plane)
world.addBody(sphere1Body)
world.addBody(sphere2Body)
world.addBody(planeBody)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    // 以固定时间步长更新物理世界
    world.step(1 / 120, delta)
    // world.fixedStep(1 / 120, delta)

    props.sphere.position.copy(sphere1Body.position)
    props.sphere2.position.copy(sphere2Body.position)
})
</script>
