import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { EchartsDataType } from '../index.d'
import { globalThemeJson } from 'PLS/goView/lib/gSettings/chartThemes/index'
import type VChart from 'vue-echarts'

/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
export const mergeTheme = <T, U>(option: T, themeSetting: U, includes: string[]) => {
  return (option = merge({}, pick(themeSetting, includes), option))
}

/**
 * * ECharts option 统一前置处理
 * @param option
 * @return option
 */
export const echartOptionProfixHandle = (option: any, includes: string[]) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return mergeTheme(option, globalThemeJson, includes)
}

/**
 * * 设置数据
 * @param option
 * @return option
 */
export const setData = (option: any, data: EchartsDataType) => {
  option.dataset = data
  return option
}

/**
 * * 配置公共 setOption 方法
 * @param instance
 * @param data
 */
export const setOption = <T extends typeof VChart | undefined, D>(instance: T, data: D) => {
  if (!instance) return
  const option = instance.getOption()
  option.dataset = null
  instance.setOption(data)
}
