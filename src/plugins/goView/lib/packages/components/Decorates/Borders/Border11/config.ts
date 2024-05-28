import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Border11Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#2862b7', '#2862b7'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border11Config.key
  public chartConfig = cloneDeep(Border11Config)
  public option = cloneDeep(option)
}
