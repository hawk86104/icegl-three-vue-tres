<template></template>
<script setup lang="ts">
import { World, Sphere, Body, Heightfield, Vec3 } from 'cannon-es'
import { useRenderLoop } from '@tresjs/core'

const props = defineProps({
    sphereGroup: {
        default: null as any,
    },
    plane: {
        default: null as any,
    },
})

const world = new World()
world.gravity.set(0, -9.82, 0)

const sphereBodyList = [] as any[]
props.sphereGroup.children.forEach((sphere: any) => {
    const sphereSize = sphere.geometry.parameters.radius
    const mass = 1

    const sphereShape = new Sphere(sphereSize)

    const sphereBody = new Body({ mass })
    sphereBody.addShape(sphereShape)
    sphereBody.position.copy(sphere.position)
    // sphereBody.material = new Material({ restitution: 10 })

    sphereBodyList.push(sphereBody)
    world.addBody(sphereBody)
})

// 不太建议用 planeGeometry
let planeData = [] as any[]
const pos = props.plane.geometry.getAttribute('position')
const widthSegments = props.plane.geometry.parameters.widthSegments + 1
const heightSegments = props.plane.geometry.parameters.heightSegments + 1

for (let i = 0; i < heightSegments; i++) {
    planeData.push([])
}
for (let i = 0; i < widthSegments; i++) {
    for (let j = 0; j < heightSegments; j++) {
        planeData[j][i] = pos.getZ((widthSegments - 1 - i) * heightSegments + j)
    }
}

// planeData[0] = [0, 10, -10]
// planeData[1] = [0, 0, 0]
// planeData[2] = [0, 0, 0]
// console.log(planeData)
const terrainShape = new Heightfield(planeData, { elementSize: props.plane.geometry.parameters.width / (widthSegments - 1) })
const terrainBody = new Body({ mass: 0 })
terrainBody.addShape(
    terrainShape,
    new Vec3(
        -props.plane.geometry.parameters.width / 2, // X 偏移到左下角
        -props.plane.geometry.parameters.height / 2,
        0,
    ),
)
terrainBody.quaternion.set(...(props.plane.quaternion.toArray() as [number, number, number, number]))
// terrainBody.quaternion.setFromEuler(-Math.PI * 0.5, 0, 0, 'XYZ')
// terrainBody.position.set(-50, 0, 50)
world.addBody(terrainBody)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    world.step(1 / 120, delta)

    sphereBodyList.forEach((sphereBody, index) => {
        props.sphereGroup.children[index].position.copy(sphereBody.position)
    })

    // props.plane.position.copy(terrainBody.position)
})
</script>
