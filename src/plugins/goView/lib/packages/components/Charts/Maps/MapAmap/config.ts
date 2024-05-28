import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { MapAmapConfig } from './index'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export enum ThemeEnum {
  NORMAL = 'normal',
  DARK = 'dark',
  LIGHT = 'light',
  WHITES_MOKE = 'whitesmoke',
  FRESH = 'fresh',
  GREY = 'grey',
  GRAFFITI = 'graffiti',
  MACARON = 'macaron',
  BLUE = 'blue',
  DARKBLUE = 'darkblue',
  WINE = 'wine'
}

export enum LangEnum {
  ZH_CN = 'zh_cn',
  EN = 'en',
  ZH_EN = 'zh_en'
}

export enum ViewModeEnum {
  PLANE = '2D',
  STEREOSCOPIC = '3D'
}

export const ShowHideEnum = {
  SHOW: true,
  HIDE: false
}

export enum FeaturesEnum {
  BG = 'bg',
  POINT = 'point',
  ROAD = 'road',
  BUILDING = 'building'
}

export enum MarkerEnum {
  // 圆圈
  CIRCLE_MARKER = 'CircleMarker',
  // 定位标点
  MARKER = 'Marker',
  // 暂无
  NONE = 'none'
}

export const option = {
  dataset: dataJson,
  mapOptions: {
    pitch: 60,
    skyColor: '#53A9DE',
    amapKey: 'd5f3e16589dbecae64d05fe90e2ba4f2',
    amapStyleKey: ThemeEnum.DARK,
    amapStyleKeyCustom: '',
    amapLon: 116.397428,
    amapLat: 39.90923,
    amapZindex: 11,
    marker: {
      fillColor: '#E98984FF',
      fillOpacity: 0.5,
      strokeColor: 'white',
      strokeWeight: 2,
      strokeOpacity: 0.5,
      zIndex: 10,
      bubble: true,
      cursor: 'pointer',
      clickable: true
    },
    mapMarkerType: MarkerEnum.CIRCLE_MARKER,
    viewMode: ViewModeEnum.PLANE,
    showLabel: ShowHideEnum.SHOW,
    satelliteTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 1,
      opacity: 1,
      zooms: [3, 18]
    },
    roadNetTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 2,
      opacity: 1,
      zooms: [3, 18]
    },
    trafficTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 3,
      opacity: 1,
      zooms: [3, 18]
    },
    lang: LangEnum.ZH_CN,
    features: [FeaturesEnum.BG, FeaturesEnum.POINT, FeaturesEnum.ROAD, FeaturesEnum.BUILDING]
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MapAmapConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapAmapConfig)
  public option = cloneDeep(option)
}
