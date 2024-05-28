import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Decorates03Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'

export const option = {
  dataset: '我是标题',
  textColor: '#fff',
  textSize: 32,
  colors: ['#1dc1f5', '#1dc1f5']
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates03Config.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: 1 }
  public chartConfig = cloneDeep(Decorates03Config)
  public option = cloneDeep(option)
}
