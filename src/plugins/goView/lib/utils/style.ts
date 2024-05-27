import { PickCreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { EditCanvasConfigType } from 'PLS/goView/stores/chartEditStore.d'

type AttrType = PickCreateComponentType<'attr'>
type StatusType = PickCreateComponentType<'status'>
type PreviewConfig = PickCreateComponentType<'preview'>

// 设置位置
export const getComponentAttrStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

// 设置大小
export const getSizeStyle = (attr: AttrType, scale?: number) => {
  return {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`
  }
}

// 设置状态样式
export const getStatusStyle = (attr: StatusType) => {
  return {
    display: attr.hide ? 'none' : 'block'
  }
}

// 设置预览配置样式
export const getPreviewConfigStyle = (previewConfig: PreviewConfig) => {
  const previewStyle: Partial<CSSStyleDeclaration> = {}
  if (previewConfig) {
    if (previewConfig.overFlowHidden) {
      previewStyle.overflow = 'hidden'
    }
  }
  return previewStyle
}

// 全局样式
export const getEditCanvasConfigStyle = (canvas: EditCanvasConfigType) => {
  // 背景
  const computedBackground = canvas.selectColor
    ? { background: canvas.background }
    : {
        background: `url(${canvas.backgroundImage}) center center / cover no-repeat !important`
      }
  return {
    position: 'relative' as const,
    width: canvas.width ? `${canvas.width || 100}px` : '100%',
    height: canvas.height ? `${canvas.height}px` : '100%',
    ...computedBackground
  }
}

export const animationsClass = (animations: string[]) => {
  if (animations.length) {
    return `animate__animated  animate__${animations[0]}`
  }
  return ''
}

export const getTransformStyle = (styles: any) => {
  const { rotateZ, rotateX, rotateY, skewX, skewY } = styles
  return {
    transform: `rotateZ(${rotateZ || 0}deg) rotateX(${rotateX || 0}deg) rotateY(${rotateY || 0}deg) skewX(${
      skewX || 0
    }deg) skewY(${skewY || 0}deg)`
  }
}

export const getBlendModeStyle = (styles: any) => {
  if (!styles || !styles.filterShow) return {}
  const { blendMode } = styles
  return {
    'mix-blend-mode': blendMode
  }
}
import { chartColors } from 'PLS/goView/lib/gSettings/chartThemes/index'
export const colorCustomMerge = (customColor?: any) => {
  type FormateCustomColorType = {
    [T: string]: {
      color: string[]
      name: string
    }
  }
  const formateCustomColor: FormateCustomColorType = {}
  customColor?.forEach(item => {
    formateCustomColor[item.id] = {
      color: item.color,
      name: item.name
    }
  })
  return { ...formateCustomColor, ...chartColors }
}
