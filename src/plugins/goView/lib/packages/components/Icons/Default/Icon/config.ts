import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { IconConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 图标名称
  dataset: 'uim:apple',
  color: '#03A9F4',
  size: 64,
  rotate: 0 // 旋转角度
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = IconConfig.key
  public attr = { ...chartInitConfig, w: 64, h: 64, zIndex: 1 }
  public chartConfig = cloneDeep(IconConfig)
  public option = cloneDeep(option)
}
