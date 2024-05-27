import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { GraphConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

// 关系图布局
export const GraphLayout = [
  { label: '无', value: 'none' },
  { label: '环形', value: 'circular' },
  { label: '力引导', value: 'force' }
]

// 标签开关
export const LabelSwitch = [
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
]

// 标签位置
export const LabelPosition = [
  { label: '左侧', value: 'left' },
  { label: '右侧', value: 'right' },
  { label: '顶部', value: 'top' },
  { label: '底部', value: 'bottom' },
  { label: '内部', value: 'inside' }
]

// 图-迭代动画
export const LayoutAnimation = [
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
]

export const option = {
  dataset: { ...dataJson },
  tooltip: {},
  legend: {
    show: true,
    textStyle: {
      color: '#eee',
      fontSize: 14
    },
    data: dataJson.categories.map(function (a) {
      return a.name
    })
  },
  series: [
    {
      type: 'graph',
      layout: 'none', // none circular环形布局
      data: dataJson.nodes,
      links: dataJson.links,
      categories: dataJson.categories,
      label: {
        show: 1,
        position: 'right',
        formatter: '{b}'
      },
      labelLayout: {
        hideOverlap: true
      },
      lineStyle: {
        color: 'source', // 线条颜色
        curveness: 0.2 // 线条卷曲程度
      },
      force: {
        repulsion: 100,
        gravity: 0.1,
        edgeLength: 30,
        layoutAnimation: 1,
        friction: 0.6
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GraphConfig.key
  public chartConfig = cloneDeep(GraphConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
