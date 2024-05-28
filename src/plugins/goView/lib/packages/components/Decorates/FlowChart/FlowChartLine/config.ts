import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { FlowChartLineConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  endWidth: 15,
  lineWidth: 2, //线条粗细
  lineNum: 2, //向下数量
  lineNumUp: 2, //向上数量
  backgroundCol: '#303a4c', //线条背景
  animateCol: '#3788ea' //流动动画背景
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FlowChartLineConfig.key
  public chartConfig = cloneDeep(FlowChartLineConfig)
  public option = cloneDeep(option)
}
