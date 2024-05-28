import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { TextBarrageConfig } from './index'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  dataset: '让数字化看得见',
  fontSize: 32,
  fontColor: '#ffffff',
  fontWeight: 'normal',
  // 字间距
  letterSpacing: 5,
  //阴影
  showShadow:  true,
  boxShadow: 'none',
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff',
  //动画
  animationTime: 0,
  animationSpeed: 50,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextBarrageConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(TextBarrageConfig)
  public option = cloneDeep(option)
  public preview = { overFlowHidden: true } 
}
