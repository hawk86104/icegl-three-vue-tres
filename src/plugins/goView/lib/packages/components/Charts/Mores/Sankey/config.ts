import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { SankeyConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 图表方向
export const orientList = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' }
]

// 标签展示
export const toolTipSwitch = [
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
]

export const option = {
  dataset: { ...dataJson },
  tooltip: {
    show: 1,
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: {
    type: 'sankey',
    layout: 'none',
    orient:'horizontal',
    data: dataJson.label,
    links: dataJson.links,
    levels: dataJson.levels
  }
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = SankeyConfig.key
  public chartConfig = cloneDeep(SankeyConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
