import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { NumberConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 数据说明
  dataset: 100000,
  from: 0,
  dur: 3,
  precision: 0,
  showSeparator: true,
  numberSize: 34,
  numberColor: '#4a9ef8',
  prefixText: '￥',
  prefixColor: '#4a9ef8',
  suffixText: '元',
  suffixColor: '#4a9ef8',
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = NumberConfig.key
  public chartConfig = cloneDeep(NumberConfig)
  public option = cloneDeep(option)
}
