import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { WaterPoloConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const shapes = [
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '正方形',
    value: 'rect'
  },
  {
    label: '带圆角的正方形',
    value: 'roundRect'
  },
  {
    label: '正三角形',
    value: 'triangle'
  },
  {
    label: '菱形',
    value: 'diamond'
  },
  {
    label: '水滴',
    value: 'pin'
  },
  {
    label: '箭头',
    value: 'arrow'
  },
]

export const includes = []

export const option = {
  dataset: 0.5,
  series: [
    {
      type: 'liquidFill',
      shape: shapes[0].value,
      radius: '90%',
      data: [0],
      center: ['50%', '50%'],
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#446bf5',
            },
            {
              offset: 1,
              color: '#2ca3e2',
            },
          ],
          globalCoord: false,
        },
      ],
      backgroundStyle: {
        borderWidth: 1,
        color: 'rgba(51, 66, 127, 0.7)',
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 50,
            color: '#fff',
          },
        },
      },
      outline: {
        show: false,
        borderDistance: 10,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#112165'
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = WaterPoloConfig.key
  public chartConfig = cloneDeep(WaterPoloConfig)
  public option = echartOptionProfixHandle(option, includes)
}
