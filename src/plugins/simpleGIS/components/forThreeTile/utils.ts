/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-18 17:13:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-20 10:26:07
 */
import * as THREE from 'three'
import * as tt from 'three-tile'
// 显示地理位置信息
export const showLocation = (camera: any, domElement: DOMElement, map: tt.TileMap, id: string = '#informationDiv') => {
    const el = document.querySelector(id)
    if (el) {
        const pointer = new THREE.Vector2()
        domElement.addEventListener('pointermove', (evt) => {
            // 计算屏幕坐标（-0.5到+0.5范围）
            pointer.x = (evt.clientX / domElement.clientWidth) * 2 - 1
            pointer.y = -(evt.clientY / domElement.clientHeight) * 2 + 1
            // 取得该坐标的信息
            const info = map.getLocalInfoFromScreen(camera, pointer)
            if (info) {
                el.innerHTML = `经度:${info.location.x.toFixed(3)}°  
                            纬度:${info.location.y.toFixed(3)}°  
                            海拔:${(info.location.z * 1000).toFixed(1)}m
                            离摄像机距离:${info.distance.toFixed(3)}km `
            } else {
                el.innerHTML = ''
            }
        })
    }
}

const fogFactor = 1.0
export const controlsEvents = (controls: any, camera: any, scene: any) => {
    controls.addEventListener('change', () => {
        // camera polar
        const polar = Math.max(controls.getPolarAngle(), 0.1)
        // dist of camera to controls
        const dist = Math.max(controls.getDistance(), 0.1)

        // set zoom speed on dist
        controls.zoomSpeed = Math.max(Math.log(dist), 1.8)

        if (camera) {
            camera.far = THREE.MathUtils.clamp((dist / polar) * 8, 100, 50000)
            camera.near = camera.far / 1000
            camera.updateProjectionMatrix()
        }

        // set fog density on dist/polar
        if (scene.fog instanceof THREE.FogExp2) {
            scene.fog.density = (polar / (dist + 5)) * fogFactor * 0.25
        }

        // set azimuth to 0 when dist>800
        if (dist > 8000) {
            controls.minAzimuthAngle = 0
            controls.maxAzimuthAngle = 0
        } else {
            controls.minAzimuthAngle = -Infinity
            controls.maxAzimuthAngle = Infinity
        }

        // limit the max polar on dist
        controls.maxPolarAngle = Math.min(Math.pow(10000, 4) / Math.pow(dist, 4), 1.2)
    })
}

// 根据地理范围的西南、东北角经纬度，计算模型变换矩阵
export const getMatrixFromBounds = (map: tt.TileMap, sw: THREE.Vector2, ne: THREE.Vector2, alt: number) => {
    // 经纬度转换为场景坐标
    const p1 = map.geo2pos(new THREE.Vector3(sw.x, sw.y))
    const p2 = map.geo2pos(new THREE.Vector3(ne.x, ne.y))
    // 计算缩放和位置
    const scale = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, 1)
    const pos = new THREE.Vector3(p1.x + scale.x / 2, p2.y - scale.y / 2, alt)

    const matrix = new THREE.Matrix4()
    matrix.setPosition(pos)
    matrix.scale(scale)
    return matrix
}

export const scaleImg = (map: tt.TileMap, sw: THREE.Vector2, ne: THREE.Vector2, height: number) => {
    const p1 = map.geo2pos(new THREE.Vector3(sw.x, sw.y))
    const p2 = map.geo2pos(new THREE.Vector3(ne.x, ne.y))
    const scale = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, height)
    return scale
}
