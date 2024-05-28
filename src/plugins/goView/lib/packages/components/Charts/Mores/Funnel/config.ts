import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { FunnelConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 排序枚举
export const FunnelOrderEnumList = [
  { label: '倒三角', value: 'descending' },
  { label: '正三角', value: 'ascending' }
]
// 标签位置枚举
export const FunnelLabelPositionEnumList = [
  { label: '内部', value: 'inside' },
  { label: '外部', value: 'outside' },
  { label: '内部左侧', value: 'insideLeft' },
  { label: '内部右侧', value: 'insideRight' }
]

export const option = {
  tooltip: {},
  legend: {},
  dataset: { ...dataJson },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      top: 70,
      left: '10%',
      width: '80%',
      min: 0,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending', // descending | ascending
      gap: 5,
      label: {
        show: true,
        position: 'inside',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = FunnelConfig.key
  public chartConfig = cloneDeep(FunnelConfig)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
