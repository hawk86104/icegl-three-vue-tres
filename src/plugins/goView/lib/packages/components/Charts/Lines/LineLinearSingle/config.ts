import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { LineLinearSingleConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { defaultTheme, chartColorsSearch } from 'PLS/goView/lib/gSettings/chartThemes/index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

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
  series: [
    {
      type: 'line',
      symbolSize: 5, //设定实心点的大小
      lineStyle: {
        type: 'solid',
        width: 3,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: chartColorsSearch[defaultTheme][0] // 0% 处的颜色
            },
            {
              offset: 1,
              color: chartColorsSearch[defaultTheme][1] // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        shadowColor: chartColorsSearch[defaultTheme][2],
        shadowBlur: 10,
        shadowOffsetY: 20
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineLinearSingleConfig.key
  public chartConfig = cloneDeep(LineLinearSingleConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
