import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from 'PLS/goView/lib/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum, DefaultTypeEnum, DifferUnitEnum } from './interact'
import { InputsDateConfig } from './index'

export const option = {
  // 时间组件展示类型，必须和 interactActions 中定义的数据一致
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATE,
  // 下拉展示
  isPanel: 0,
  // 默认值
  dataset: dayjs().valueOf() as number | number[] | null,
  // 默认值类型
  defaultType: DefaultTypeEnum.STATIC,
  // 动态默认值偏移单位
  differUnit: [DifferUnitEnum.DAY, DifferUnitEnum.DAY],
  // 动态默认值偏移值
  differValue: [0, 0]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsDateConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsDateConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
