import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { TableScrollBoardConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  header: ['列1', '列2', '列3'],
  dataset: dataJson,
  index: true,
  columnWidth: [30, 100, 100],
  align: ['center', 'right', 'right', 'right'],
  rowNum: 5,
  waitTime: 2,
  headerHeight: 35,
  carousel: 'single',
  headerBGC: '#00BAFF',
  oddRowBGC: '#003B51',
  evenRowBGC: '#0A2732'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TableScrollBoardConfig.key
  public chartConfig = cloneDeep(TableScrollBoardConfig)
  public option = cloneDeep(option)
}
