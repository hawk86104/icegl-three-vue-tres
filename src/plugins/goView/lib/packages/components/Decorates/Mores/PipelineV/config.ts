import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { PipelineVConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  color_type: 1,
  o_color: '#0a7ae2',
  i_color: '#119bfa',
  line_class: 'svg_ani_flow'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = PipelineVConfig.key
  public attr = { ...chartInitConfig, w: 15, h: 500, zIndex: -1 }
  public chartConfig = cloneDeep(PipelineVConfig)
  public option = cloneDeep(option)
}
