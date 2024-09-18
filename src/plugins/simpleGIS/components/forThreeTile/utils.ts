/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-18 17:13:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-18 17:18:45
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
