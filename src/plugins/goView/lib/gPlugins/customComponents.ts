import type { App } from 'vue'
import { GoSkeleton } from 'PLS/goView/lib/gComponents/GoSkeleton'
import { GoLoading } from 'PLS/goView/lib/gComponents/GoLoading'
import { SketchRule } from 'vue3-sketch-ruler'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GoSkeleton', GoSkeleton)
  app.component('GoLoading', GoLoading)
  app.component('SketchRule', SketchRule)
}
