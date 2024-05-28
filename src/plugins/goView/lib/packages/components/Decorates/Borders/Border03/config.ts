import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Border03Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#6586ec', '#2cf7fe'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border03Config.key
  public chartConfig = cloneDeep(Border03Config)
  public option = cloneDeep(option)
}
