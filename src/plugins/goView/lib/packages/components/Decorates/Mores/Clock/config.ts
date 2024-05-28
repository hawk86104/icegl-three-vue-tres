import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { ClockConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  border: 6,
  color: '#ffffff',
  bgColor: '#84a5e9',
  borderColor: '#ffffff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ClockConfig.key
  public chartConfig = cloneDeep(ClockConfig)
  public option = cloneDeep(option)
}
