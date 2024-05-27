import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { DialConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = []
const option = {
  backgroundColor: '#0E1327',
  dataset:70,
  series: [{
      type: "gauge",
      data: [{
          value: 70,
          itemStyle: { // 指针样式
              color: '#2AF4FF'
          }
      }],
      min: 0, //最小刻度
      max: 100, //最大刻度
      splitNumber: 10, //刻度数量
      center: ['50%', '55%'],
      radius: '80%',
      axisLine: {
        lineStyle: {
        color: [
            [0, 'rgba(0,212,230,0.5)'],
            [1, 'rgba(28,128,245,0)']
          ],
          width: 170
        }
      },
      axisLabel: { // 文字样式
        color: '#eee', 
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      detail: {
        show: false,
      },
      pointer: {
        length: '80%',
        width: 4
      },
      animationDuration: 2000,
    },
    {
      name: '外部刻度',
      type: 'gauge',
      center: ['50%', '55%'],
      radius: '90%',
      axisLine: {
        show: true,
        lineStyle: {
          width: 25,
          color: [ // 表盘外部颜色
            [0, '#1369E380'],
            [1, '#1369E380']
          ],
        }
      }, 
      axisLabel: {
        show:false,
      },
      axisTick: {
        splitNumber: 5,
        lineStyle: { //刻度颜色
          color: '#42E5FB',
          width: 2,
        },
      },
      splitLine: {
        length: 15,
        lineStyle: {
          color: '#42E5FB',
        }
      },
    },
  ]
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = DialConfig.key
  public chartConfig = cloneDeep(DialConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
