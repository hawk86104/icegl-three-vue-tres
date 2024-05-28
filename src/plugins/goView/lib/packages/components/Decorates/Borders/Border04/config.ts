import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { Border04Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  borderTitle: '边框-04',
  borderTitleWidth: 250,
  borderTitleHeight: 32,
  borderTitleSize: 18,
  borderTitleColor: '#fff',
  colors: ['#8aaafb', '#1f33a2'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border04Config.key
  public chartConfig = cloneDeep(Border04Config)
  public option = cloneDeep(option)
}
