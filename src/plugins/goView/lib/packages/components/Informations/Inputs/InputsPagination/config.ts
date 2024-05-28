import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { COMPONENT_INTERACT_EVENT_KET } from 'PLS/goView/lib/enums/eventEnum'
import { interactActions, ComponentInteractEventEnum } from './interact'
import {InputsPaginationConfig} from "./index";

export const option = {
    // 时间组件展示类型，必须和 interactActions 中定义的数据一致
    [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
    // 默认值
    pageValue:1,
    sizeValue:[2,4,8,10,20],
    pageSize:4,
    // 暴露配置内容给用户
    dataset: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = InputsPaginationConfig.key
    public attr = { ...chartInitConfig, w: 395, h: 32, zIndex: -1 }
    public chartConfig = cloneDeep(InputsPaginationConfig)
    public interactActions = interactActions
    public option = cloneDeep(option)
}