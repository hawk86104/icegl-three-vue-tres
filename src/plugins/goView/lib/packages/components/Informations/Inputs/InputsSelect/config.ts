import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from 'PLS/goView/lib/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { InputsSelectConfig } from './index'

export const option = {
  // 时间组件展示类型，必须和 interactActions 中定义的数据一致
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  // 默认值
  selectValue: '1',
  // 暴露配置内容给用户
  dataset: [
    {
      label: '选项1',
      value: '1'
    },
    {
      label: '选项2',
      value: '2'
    },
    {
      label: '选项3',
      value: '3'
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsSelectConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsSelectConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
