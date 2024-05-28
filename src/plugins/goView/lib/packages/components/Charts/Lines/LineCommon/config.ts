import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { LineCommonConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'line',
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  symbolSize: 5, //设定实心点的大小
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  lineStyle: {
    type: 'solid',
    width: 3,
    color: null
  }
}

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineCommonConfig.key
  public chartConfig = cloneDeep(LineCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
