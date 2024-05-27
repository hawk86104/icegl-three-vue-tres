import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { TablesBasicConfig } from './index'
import dataJson from './data.json'

const { dimensions, source } = dataJson
export const option = {
  dataset: { dimensions, source },
  pagination: {
    page: 1,
    pageSize: 5
  },
  align: 'center',
  style: {
    border: 'on',
    singleColumn: 'off',
    singleLine: 'off',
    bottomBordered: 'on',
    striped: 'on',
    fontSize: 16,
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  inputShow: 'none'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TablesBasicConfig.key
  public attr = { ...chartInitConfig, w: 600, h: 300, zIndex: -1 }
  public chartConfig = cloneDeep(TablesBasicConfig)
  public option = cloneDeep(option)
}
