import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Border06Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#3140ad', '#1089ff'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border06Config.key
  public chartConfig = cloneDeep(Border06Config)
  public option = cloneDeep(option)
}
