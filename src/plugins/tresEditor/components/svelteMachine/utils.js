import * as THREE from 'three'
import conveyorBeltPathJson from './svelte-conveyor-belt-path.json'

function createCurveFromJSON(json) {
    const vertices = json.points
    const points = []
    for (const element of vertices) {
        const x = element.x
        const y = element.y
        const z = element.z
        points.unshift(new THREE.Vector3(x, y, z))
    }
    const curve = new THREE.CatmullRomCurve3(points)
    curve.closed = json.closed
    return curve
}
const conveyorBeltPath = createCurveFromJSON(conveyorBeltPathJson)
const _matrix = new THREE.Matrix4()
export function initBeltFots(mesh) {
    const count = conveyorBeltPath.points.length / 2
    const beltDotsItem = new THREE.InstancedMesh(mesh.geometry, mesh.material, count)
    beltDotsItem.userData = { progresses: [] }
    for (let i = 0; i < count; i++) {
        const progress = i / (count - 1)
        const point = conveyorBeltPath.getPointAt(progress)
        beltDotsItem.userData.progresses[i] = progress
        _matrix.setPosition(point)
        beltDotsItem.setMatrixAt(i, _matrix)
    }
    return beltDotsItem
}

export function updateBeltFots(beltDotsItemInstanced) {
    const beltDotsItemProgresses = beltDotsItemInstanced.userData.progresses

    for (let i = 0; i < beltDotsItemInstanced.count; i++) {
        const position = conveyorBeltPath.getPointAt(beltDotsItemProgresses[i])
        _matrix.setPosition(position)
        beltDotsItemInstanced.setMatrixAt(i, _matrix)

        beltDotsItemProgresses[i] += 0.0005
        if (beltDotsItemProgresses[i] > 1) beltDotsItemProgresses[i] = 0
    }

    beltDotsItemInstanced.instanceMatrix.needsUpdate = true
    beltDotsItemInstanced.computeBoundingSphere()
}

export function initRawItemsPool(object) {
    // 共计 8 个物体
    const rawItems = []
    rawItems.push(object[2].clone())
    rawItems.push(object[4].clone())
    rawItems.push(object[5].clone())
    rawItems.push(object[2].clone())
    rawItems.push(object[5].clone())
    rawItems.push(object[4].clone())
    rawItems.push(object[2].clone())
    rawItems.push(object[4].clone())
    for (let i = 0; i < rawItems.length; i++) {
        const progress = (i / rawItems.length) * 0.6
        rawItems[i].userData = { progress }
        const point = conveyorBeltPath.getPointAt(progress)
        rawItems[i].position.copy(point)
        rawItems[i].visible = true
    }
    return rawItems
}

export function updateRawItemsPool(object) {
    for (let i = 0; i < object.length; i++) {
        object[i].userData.progress += 0.0005
        if (object[i].userData.progress > 0.6) object[i].userData.progress = 0
        const progress = object[i].userData.progress
        const point = conveyorBeltPath.getPointAt(progress)
        if (object[i].name === 'flat_item') {
            point.y = 1.5
        }
        object[i].position.copy(point)
    }
}

export function initBoxesPool(object) {
    // 共计 8 个物体
    const boxItems = []
    for (let i = 0; i < 6; i++) {
        boxItems.push(object[3].clone())
        const progress = 1 - (i / 6) * 0.4 - 0.04
        boxItems[i].userData = { progress }
        const point = conveyorBeltPath.getPointAt(progress)
        boxItems[i].position.copy(point)
        boxItems[i].visible = true
    }
    return boxItems
}

export function updateBoxesPool(object) {
    for (let i = 0; i < object.length; i++) {
        object[i].userData.progress += 0.0005
        if (object[i].userData.progress > 1) object[i].userData.progress = 1 - (5 / 6) * 0.4 - 0.04
        const progress = object[i].userData.progress
        const point = conveyorBeltPath.getPointAt(progress)
        object[i].position.copy(point)
    }
}
