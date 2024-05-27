
import { inject, type Ref } from 'vue'
import { EchartsRenderer } from 'PLS/goView/lib/gSettings/chartThemes'
import { SCALE_KEY } from 'PLS/goView/lib/hooks/useScale.hook'
import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

use([CanvasRenderer, SVGRenderer])

type InitOptions = {
  renderer: EchartsRenderer
  devicePixelRatio?: number
}

// 获取需要给当前echarts组件设置什么初始值
export function useCanvasInitOptions(option: any, themeSetting: any) {
  const renderer = option.renderer || themeSetting.renderer
  const initOptions: InitOptions = { renderer }
  const scaleRef = inject<Ref<{ width: number; height: number }>>(SCALE_KEY) || { value: { width: 1, height: 1 } }

  if (renderer === 'canvas') {
    initOptions.devicePixelRatio = Math.ceil(
      Math.max(window.devicePixelRatio, scaleRef.value.width, scaleRef.value.height)
    )
  }
  return initOptions
}
