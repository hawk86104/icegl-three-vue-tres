/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 16:29:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 17:24:45
 */
import { App } from 'vue';
import VueLazyLoad from 'vue3-lazyload'
// import { requireErrorImg } from 'PLS/goView/lib/utils'
export const requireErrorImg = () => {
  return ''
}
// import { x } from '@/directives';

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  // 图片懒加载
  app.use(VueLazyLoad, {
    error: requireErrorImg(),
  })
  // app.directive('x', x);
}
