import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { PieCircleConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = []

const option = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
  },
  dataset: 0.25,
  title: {
    text: 25 + "%",
    x: "center",
    y: "center",
    textStyle: {
      color: "#56B9F8",
      fontSize: 30
    }
  },
  series: [
    {
      type: "pie",
      radius: ["75%", "80%"],
      center: ["50%", "50%"],
      hoverAnimation: true,
      color: ["#00bcd44a", "transparent"],
      label: {
        show: false
      },
      data: [
        {
          value: [25],
          itemStyle: {
            color: "#03a9f4",
            shadowBlur: 10,
            shadowColor:"#97e2f5"
          }
        },
        {
          value: [75],
          itemStyle: {
            color: "#00bcd44a",
            shadowBlur: 0,
            shadowColor:"#00bcd44a"
          }
        }
      ]
    },
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieCircleConfig.key

  public chartConfig = cloneDeep(PieCircleConfig)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
