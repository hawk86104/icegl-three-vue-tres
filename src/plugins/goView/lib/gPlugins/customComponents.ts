/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-28 15:17:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-28 18:15:17
 */
import type { App } from 'vue'
import { GoSkeleton } from 'PLS/goView/lib/gComponents/GoSkeleton'
import { GoLoading } from 'PLS/goView/lib/gComponents/GoLoading'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GoSkeleton', GoSkeleton)
  app.component('GoLoading', GoLoading)
}
