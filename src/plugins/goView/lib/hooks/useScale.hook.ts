import { ref, provide, onMounted, onUnmounted } from 'vue'
import { usePreviewFitScale, usePreviewScrollYScale, usePreviewScrollXScale, usePreviewFullScale } from './usePreviewScale.hook'
import { PreviewScaleEnum } from '../enums/styleEnum'

export const SCALE_KEY = 'scale-value'

export const useScale = (localStorageInfo: any) => {
  const entityRef = ref()
  const previewRef = ref()
  const width = ref(localStorageInfo.editCanvasConfig.width)
  const height = ref(localStorageInfo.editCanvasConfig.height)
  const scaleRef = ref({ width: 1, height: 1 })

  provide(SCALE_KEY, scaleRef)

  // 监听鼠标滚轮 +ctrl 键
  const useAddWheelHandle = (removeEvent: Function) => {
    addEventListener(
      'wheel',
      (e: any) => {
        if (window?.$KeyboardActive?.ctrl) {
          e.preventDefault()
          e.stopPropagation()
          removeEvent()
          const transform = previewRef.value?.style.transform
          const regRes = transform.match(/scale\((\d+\.?\d*)*/) as RegExpMatchArray
          const width = regRes[1]
          const previewBoxDom = document.querySelector('.go-preview') as HTMLElement
          const entityDom = document.querySelector('.go-preview-entity') as HTMLElement
          if (previewBoxDom) {
            previewBoxDom.style.overflow = 'unset'
            previewBoxDom.style.position = 'absolute'
          }
          if (entityDom) {
            entityDom.style.overflow = 'unset'
          }

          if (e.wheelDelta > 0) {
            const resNum = parseFloat(Number(width).toFixed(2))
            previewRef.value.style.transform = `scale(${resNum > 5 ? 5 : resNum + 0.1})`
          } else {
            const resNum = parseFloat(Number(width).toFixed(2))
            previewRef.value.style.transform = `scale(${resNum < 0.2 ? 0.2 : resNum - 0.1})`
          }
        }
      },
      { passive: false }
    )
  }

  const updateScaleRef = (scale: { width: number; height: number }) => {
    // 这里需要解构，保证赋值给scaleRef的为一个新对象
    // 因为scale始终为同一引用
    scaleRef.value = { ...scale }
  }

  // 屏幕适配
  onMounted(() => {
    switch (localStorageInfo.editCanvasConfig.previewScaleType) {
      case PreviewScaleEnum.FIT:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
            width.value as number,
            height.value as number,
            previewRef.value,
            updateScaleRef
          )
          calcRate()
          windowResize()
          useAddWheelHandle(unWindowResize)
          onUnmounted(() => {
            unWindowResize()
          })
        })()
        break
      case PreviewScaleEnum.SCROLL_Y:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewScrollYScale(
            width.value as number,
            height.value as number,
            previewRef.value,
            scale => {
              const dom = entityRef.value
              dom.style.width = `${width.value * scale.width}px`
              dom.style.height = `${height.value * scale.height}px`
              updateScaleRef(scale)
            }
          )
          calcRate()
          windowResize()
          useAddWheelHandle(unWindowResize)
          onUnmounted(() => {
            unWindowResize()
          })
        })()

        break
      case PreviewScaleEnum.SCROLL_X:
        ; (() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewScrollXScale(
            width.value as number,
            height.value as number,
            previewRef.value,
            scale => {
              const dom = entityRef.value
              dom.style.width = `${width.value * scale.width}px`
              dom.style.height = `${height.value * scale.height}px`
              updateScaleRef(scale)
            }
          )
          calcRate()
          windowResize()
          useAddWheelHandle(unWindowResize)
          onUnmounted(() => {
            unWindowResize()
          })
        })()

        break
      case PreviewScaleEnum.FULL:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
            width.value as number,
            height.value as number,
            previewRef.value,
            updateScaleRef
          )
          calcRate()
          windowResize()
          useAddWheelHandle(unWindowResize)
          onUnmounted(() => {
            unWindowResize()
          })
        })()
        break
    }
  })

  return {
    entityRef,
    previewRef,
    scaleRef
  }
}
