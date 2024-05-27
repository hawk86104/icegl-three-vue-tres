import { BaseEvent, EventLife, InteractEvents, InteractEventOn, InteractActionsType } from 'PLS/goView/lib/enums/eventEnum'
import type { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import type { RequestConfigType } from 'PLS/goView/stores/chartEditStore.d'

export enum ChartFrameEnum {
  // 支持 dataset 的 echarts 框架
  ECHARTS = 'echarts',
  // UI 组件框架
  NAIVE_UI = 'naiveUI',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static'
}

// 组件配置
export type ConfigType = {
  // 组件 key
  key: string
  // 画布组件 key
  chartKey: string
  // 右侧设置面板组件 key
  conKey: string
  // 标题
  title: string
  // 分类
  category: string
  // 分类名称
  categoryName: string
  // 所属包
  package: string
  // 归类
  chartFrame?: ChartFrameEnum
  // 预览图
  image: string
  // 从指定路径创建创建该组件
  redirectComponent?: string
  // 组件预设的 dataset 值(图片/图标)
  dataset?: any
  // 禁用 拖拽或双击生成组件
  disabled?: boolean
  // 图标
  icon?: string
  // 事件
  configEvents?: { [T: string]: Function }
}

// 数据请求
interface requestConfig {
  request: RequestConfigType
}

// Echarts 数据类型
interface EchartsDataType {
  dimensions: string[]
  source: any[]
}

// 组件状态
export interface StatusType {
  lock: boolean
  hide: boolean
}

// 滤镜/变换枚举
export enum FilterEnum {
  // 是否启用
  FILTERS_SHOW = 'filterShow',

  // 透明度
  OPACITY = 'opacity',
  // 饱和度
  SATURATE = 'saturate',
  // 对比度
  CONTRAST = 'contrast',
  // 色相
  HUE_ROTATE = 'hueRotate',
  // 亮度
  BRIGHTNESS = 'brightness',

  // 旋转
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // 倾斜
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',

  // 混合模式
  BLEND_MODE = 'blendMode'
}

export const BlendModeEnumList = [
  { label: '正常', value: 'normal' },
  { label: '正片叠底', value: 'multiply' },
  { label: '叠加', value: 'overlay' },
  { label: '滤色', value: 'screen' },
  { label: '变暗', value: 'darken' },
  { label: '变亮', value: 'lighten' },
  { label: '颜色减淡', value: 'color-dodge' },
  { label: '颜色加深', value: 'color-burn;' },
  { label: '强光', value: 'hard-light' },
  { label: '柔光', value: 'soft-light' },
  { label: '差值', value: 'difference' },
  { label: '排除', value: 'exclusion' },
  { label: '色相', value: 'hue' },
  { label: '饱和度', value: 'saturation' },
  { label: '颜色', value: 'color' },
  { label: '亮度', value: 'luminosity' }
]

// 组件实例类
export interface PublicConfigType {
  id: string
  isGroup: boolean
  attr: { x: number; y: number; w: number; h: number; zIndex: number; offsetX: number; offsetY: number }
  styles: {
    [FilterEnum.FILTERS_SHOW]: boolean
    [FilterEnum.OPACITY]: number
    [FilterEnum.SATURATE]: number
    [FilterEnum.CONTRAST]: number
    [FilterEnum.HUE_ROTATE]: number
    [FilterEnum.BRIGHTNESS]: number

    [FilterEnum.ROTATE_Z]: number
    [FilterEnum.ROTATE_X]: number
    [FilterEnum.ROTATE_Y]: number

    [FilterEnum.SKEW_X]: number
    [FilterEnum.SKEW_Y]: number
    [FilterEnum.BLEND_MODE]: string
    // 动画
    animations: string[]
  }
  preview?: {
    // 预览超出隐藏
    overFlowHidden?: boolean
  }
  filter?: string
  status: StatusType
  interactActions?: InteractActionsType[]
  events: {
    baseEvent: {
      [K in BaseEvent]?: string
    }
    advancedEvents: {
      [K in EventLife]?: string
    }
    interactEvents: {
      [InteractEvents.INTERACT_ON]: InteractEventOn | undefined
      [InteractEvents.INTERACT_COMPONENT_ID]: string | undefined
      [InteractEvents.INTERACT_FN]: { [name: string]: string }
    }[]
  }
}

export interface CreateComponentType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: ConfigType
  option: GlobalThemeJsonType
  groupList?: Array<CreateComponentType>
}

// 组件成组实例类
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  PHOTOS = 'Photos',
  ICONS = 'Icons',
  DECORATES = 'Decorates'
}

// 包分类名称
export enum PackagesCategoryName {
  CHARTS = '图表',
  TABLES = '列表',
  INFORMATIONS = '信息',
  PHOTOS = '图片',
  ICONS = '图标',
  DECORATES = '小组件'
}

// 获取组件
export enum FetchComFlagType {
  VIEW,
  CONFIG
}

// 图表包类型
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATIONS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.PHOTOS]: ConfigType[]
  [PackagesCategoryEnum.ICONS]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
