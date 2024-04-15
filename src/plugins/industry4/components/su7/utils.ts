/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-14 17:23:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-14 17:27:24
 */
import {Mesh, Object3D} from 'three'

const flatModel =
    (scene: Object3D) => {
      const modelArr: Mesh[] = []
      scene.traverse((child) => {modelArr.push(child as Mesh)})
      return modelArr
    }

export {
  flatModel
}