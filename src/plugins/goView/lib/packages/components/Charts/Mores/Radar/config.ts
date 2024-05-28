import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { RadarConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 雷达形状
export const RadarShapeEnumList = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' }
]

export const option = {
  tooltip: {
    show: true
  },
  legend: {
    data: dataJson.seriesData.map(i => i.name)
  },
  dataset: { ...dataJson },
  radar: {
    shape: 'polygon',
    radius: ['0%', '60%'],
    center: ['50%', '55%'],
    splitArea: { show: true },
    splitLine: { show: true },
    axisName: { show: true, color: '#eee', fontSize: 12 },
    axisLine: { show: true },
    axisTick: { show: true },
    indicator: dataJson.radarIndicator
  },
  series: [
    {
      name: 'radar',
      type: 'radar',
      areaStyle: {
        opacity: 0.1
      },
      data: dataJson.seriesData
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = RadarConfig.key
  public chartConfig = cloneDeep(RadarConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
