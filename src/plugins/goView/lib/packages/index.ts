import { ChartList } from 'PLS/goView/lib/packages/components/Charts/index'
import { DecorateList } from 'PLS/goView/lib/packages/components/Decorates/index'
import { InformationList } from 'PLS/goView/lib/packages/components/Informations/index'
import { TableList } from 'PLS/goView/lib/packages/components/Tables/index'
import { PhotoList } from 'PLS/goView/lib/packages/components/Photos/index'
import { IconList } from 'PLS/goView/lib/packages/components/Icons/index'
import { PackagesCategoryEnum, PackagesType, ConfigType, FetchComFlagType } from 'PLS/goView/lib/packages/index.d'

const configModules: Record<string, { default: string }> = import.meta.glob('./components/**/config.vue', {
  eager: true
})
const indexModules: Record<string, { default: string }> = import.meta.glob('./components/**/index.vue', {
  eager: true
})
const imagesModules: Record<string, { default: string }> = import.meta.glob('../assets/images/chart/**', {
  eager: true
})

// * 所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATIONS]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList,
  [PackagesCategoryEnum.PHOTOS]: PhotoList,
  [PackagesCategoryEnum.ICONS]: IconList
}

// 组件缓存, 可以大幅度提升组件加载速度
const componentCacheMap = new Map<string, any>()
const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
  const key = packageName + categoryName + keyName
  if (!componentCacheMap.has(key)) {
    componentCacheMap.set(key, import(`./components/${packageName}/${categoryName}/${keyName}/config.ts`))
  }
  return componentCacheMap.get(key)
}

/**
 * * 获取目标组件配置信息
 * @param targetData
 */
export const createComponent = async (targetData: ConfigType) => {
  const { redirectComponent, category, key } = targetData
  // redirectComponent 是给图片组件库和图标组件库使用的
  if (redirectComponent) {
    const [packageName, categoryName, keyName] = redirectComponent.split('/')
    const redirectChart = await loadConfig(packageName, categoryName, keyName)
    return new redirectChart.default()
  }
  const chart = await loadConfig(targetData.package, category, key)
  return new chart.default()
}

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
  const module = flag === FetchComFlagType.VIEW ? indexModules : configModules
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

/**
 * * 获取展示组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchChartComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.VIEW)?.default
}

/**
 * * 获取配置组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchConfigComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.CONFIG)?.default
}

/**
 * * 获取图片内容
 * @param {ConfigType} targetData 配置项
 */
export const fetchImages = async (targetData?: ConfigType) => {
  if (!targetData) return ''
  // 正则判断图片是否为 url，是则直接返回该 url
  if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(targetData.image)) return targetData.image
  // 新数据动态处理
  const { image } = targetData
  // 兼容旧数据
  if (image.includes('@') || image.includes('base64')) return image

  const imageName = image.substring(image.lastIndexOf('/') + 1)
  for (const key in imagesModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 1] === imageName) {
      return imagesModules[key]?.default
    }
  }
  return ''
}
