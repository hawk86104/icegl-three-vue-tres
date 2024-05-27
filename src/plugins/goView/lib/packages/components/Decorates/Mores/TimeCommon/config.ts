import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { TimeCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗'
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  // 数据说明
  timeSize: 24,
  timeLineHeight: 50,
  timeTextIndent: 2,
  timeColor: '#E6F7FF',
  fontWeight: 'normal',

  //阴影
  showShadow:  true,
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TimeCommonConfig.key
  public attr = { ...chartInitConfig, w: 300, h: 50, zIndex: -1 }
  public chartConfig = cloneDeep(TimeCommonConfig)
  public option = cloneDeep(option)
}
