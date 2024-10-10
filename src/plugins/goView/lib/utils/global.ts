/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 15:23:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-10 11:40:46
 */
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { excludeParseEventKeyList, excludeParseEventValueList } from 'PLS/goView/lib/enums/eventEnum'
import { useRouter } from '@fesjs/fes' //fesJS的路由被他自己封装了
import { ErrorPageNameMap } from 'PLS/goView/lib/enums/pageEnum'
import { RequestHttpIntervalEnum } from 'PLS/goView/lib/enums/httpEnum'

// * 滤镜
export const getFilterStyle = (styles?: any) => {
  if (!styles || !styles.filterShow) return {}
  const { opacity, saturate, contrast, hueRotate, brightness } = styles
  return {
    opacity: opacity,
    filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
  }
}

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}

export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) })
}

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`
      }
      // 处理 undefined 丢失问题
      if (typeof val === 'undefined') {
        return null
      }
      return val
    },
    2
  )
}
export const evalFn = (fn: string) => {
  var Fun = Function // 一个变量指向Function，防止前端编译工具报错
  return new Fun('return ' + fn)()
}
export const JSONParse = (data: string) => {
  return JSON.parse(data, (k, v) => {
    // 过滤函数字符串
    if (excludeParseEventKeyList.includes(k)) return v
    // 过滤函数值表达式
    if (typeof v === 'string') {
      const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
      if (someValue) return v
    }
    // 还原函数值
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return evalFn(`(function(){return ${v}})()`)
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(')
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return evalFn(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}

export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取本地会话数据
 * @param k 键名
 * @returns any
 */
export const getLocalStorage = (k: string) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 清除本地会话数据
 * @param name
 */
export const clearLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}

import Color from 'color'

export const openNewWindow = (url: string) => {
  return window.open(url, '_blank')
}

export function alpha(color: string, alpha = 1) {
  return Color(color).alpha(alpha).toString()
}
export function lighten(color: string, concentration: number) {
  return Color(color).lighten(concentration).toString()
}
const router = useRouter()
export const fetchPathByName = (pageName: string, p?: string) => {
  try {
    const pathData = router.resolve({
      name: pageName,
    })
    return p ? (pathData as any)[p] : pathData
  } catch (error) {
    window['$message'].warning('查询路由信息失败，请联系管理员！')
  }
}
export const routerTurnByName = (
  pageName: string,
  isReplace?: boolean,
  windowOpen?: boolean
) => {
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href')
    openNewWindow(path)
    return
  }
  if (isReplace) {
    router.replace({
      name: pageName,
    })
    return
  }
  router.push({
    name: pageName,
  })
}

export const redirectErrorPage = (code: ResultEnum) => {
  if (!code) return false
  const pageName = ErrorPageNameMap.get(code)
  if (!pageName) return false
  routerTurnByName(pageName)
}


export const intervalUnitHandle = (num: number, unit: RequestHttpIntervalEnum) => {
  switch (unit) {
    // 秒
    case RequestHttpIntervalEnum.SECOND:
      return num * 1000
    // 分
    case RequestHttpIntervalEnum.MINUTE:
      return num * 1000 * 60
    // 时
    case RequestHttpIntervalEnum.HOUR:
      return num * 1000 * 60 * 60
    // 天
    case RequestHttpIntervalEnum.DAY:
      return num * 1000 * 60 * 60 * 24
    default:
      return num * 1000
  }
}

export const isPreview = () => {
  return true
}
import cloneDeep from 'lodash/cloneDeep'
export const newFunctionHandle = (
  data: any,
  res: any,
  funcStr?: string,
  isToString?: boolean,
  errorCallBack?: Function,
  successCallBack?: Function
) => {
  try {
    if (!funcStr) return data
    const fn = new Function('data', 'res', funcStr)
    const fnRes = fn(cloneDeep(data), cloneDeep(res))
    const resHandle = isToString ? toString(fnRes) : fnRes
    // 成功回调
    successCallBack && successCallBack(resHandle)
    return resHandle
  } catch (error) {
    // 失败回调
    errorCallBack && errorCallBack(error)
    return '函数执行错误'
  }
}
export function fade(color: string, fade: number) {
  return Color(color).fade(fade).toString()
}

import { chartColorsSearch } from 'PLS/goView/lib/gSettings/chartThemes/index'

export const colorGradientCustomMerge = (customColor?: any) => {
  type FormateGradientCustomColorType = {
    [T: string]: string[]
  }
  const formateGradientCustomColor: FormateGradientCustomColorType = {}
  customColor?.forEach(item => {
    formateGradientCustomColor[item.id] = [
      item.color[0],
      item.color[1],
      fade(item.color[0], 0.3),
      fade(item.color[0], 0.5),
      fade(item.color[1], 0.5)
    ]
  })

  return { ...formateGradientCustomColor, ...chartColorsSearch }
}

import isObject from 'lodash/isObject'

export function isString(p: any): p is string {
  return typeof p === 'string'
}

export function isNumber(p: any): p is number {
  return typeof p === 'number'
}

export function isBoolean(p: any): p is boolean {
  return typeof p === 'boolean'
}

export function isUndefined(p: any): p is undefined {
  return typeof p === 'undefined'
}

export function isNull(p: any): p is null {
  return p === null
}

export function isArray(p: any): p is [] {
  return Array.isArray(p)
}

export const toNumber = (number: number | string, toFixedNumber: number = 2) => {
  return isString(number) ? parseFloat(parseFloat(number).toFixed(toFixedNumber)) : number
}

export const toString = (str: any) => {
  return isNumber(str) ? `${str}` : (isObject(str) ? JSON.stringify(str) : str)
}
export const loadingError = () => {
  setTimeout(() => {
    window['$loading'].error()
  })
}
// * 开启加载
export const loadingStart = () => {
  window['$loading'].start()
}

// * 加载结束
export const loadingFinish = () => {
  setTimeout(() => {
    window['$loading'].finish()
  })
}

export const requireErrorImg = () => {
  return ''
}

export const goDialog = ()=>{}