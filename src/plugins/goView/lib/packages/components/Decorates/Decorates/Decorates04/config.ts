import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Decorates04Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#1dc1f5', '#1dc1f5'],
  // 是否翻转
  reverse: false
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates04Config.key
  public chartConfig = cloneDeep(Decorates04Config)
  public option = cloneDeep(option)
}
