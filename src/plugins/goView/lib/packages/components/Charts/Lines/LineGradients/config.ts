import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { LineGradientsConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { graphic } from 'echarts/core'
import { defaultTheme, chartColorsSearch } from 'PLS/goView/lib/gSettings/chartThemes/index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

const option = {
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
      smooth: false,
      symbolSize: 5, //设定实心点的大小
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        width: 3,
        type: 'solid'
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chartColorsSearch[defaultTheme][3]
          },
          {
            offset: 1,
            color: 'rgba(0,0,0,0)'
          }
        ])
      }
    },
    {
      type: 'line',
      smooth: false,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        width: 3,
        type: 'solid'
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chartColorsSearch[defaultTheme][4]
          },
          {
            offset: 1,
            color: 'rgba(0,0,0,0)'
          }
        ])
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineGradientsConfig.key
  public chartConfig = cloneDeep(LineGradientsConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
