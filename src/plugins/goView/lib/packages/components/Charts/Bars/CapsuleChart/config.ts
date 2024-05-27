import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CapsuleChartConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'

import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  colors: ['#c4ebad', '#6be6c1', '#a0a7e6', '#96dee8', '#3fb1e3' ],
  unit: '',
  itemHeight: 10,
  valueFontSize: 16,
  paddingRight: 50,
  paddingLeft: 50,
  showValue: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = CapsuleChartConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(CapsuleChartConfig)
  public option = cloneDeep(option)
}
