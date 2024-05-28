import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { TreeMapConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

export const option = {
  dataset: dataJson,
  series: [
    {
      name: 'treemap',
      type: 'treemap',
      leafDepth: 1,
      roam: false,
      data: dataJson
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TreeMapConfig.key
  public chartConfig = cloneDeep(TreeMapConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
