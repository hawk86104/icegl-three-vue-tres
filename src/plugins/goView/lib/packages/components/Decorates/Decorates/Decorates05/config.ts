import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Decorates05Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#00c2ff', '#00c2ff4d'],
  dur: 3
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Decorates05Config.key
  public chartConfig = cloneDeep(Decorates05Config)
  public option = cloneDeep(option)
}
