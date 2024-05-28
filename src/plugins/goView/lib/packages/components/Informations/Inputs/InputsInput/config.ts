import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from 'PLS/goView/lib/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import {InputsInputConfig} from "./index";

export const option = {
    // 时间组件展示类型，必须和 interactActions 中定义的数据一致
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
    // 默认值
    inputValue: "0",
    // 暴露配置内容给用户
    dataset: ""
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = InputsInputConfig.key
    public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
    public chartConfig = cloneDeep(InputsInputConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}