import { SettingStoreEnums, ToolsStatusEnum } from '@/store/modules/settingStore/settingStore.d'

// * 用户配置项
export const systemSetting = {
  // 侧边栏折叠是否隐藏全部
  [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: true,
  // 拖拽页面左侧表单分类只有一项的时候是否隐藏
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: true,
  // 切换语言是否进行路由刷新
  [SettingStoreEnums.CHANGE_LANG_RELOAD]: false,
  // 图表移动时按方向键移动的距离
  [SettingStoreEnums.CHART_MOVE_DISTANCE]: 5,
  // 图表拖拽时的吸附距离（px）
  [SettingStoreEnums.CHART_ALIGN_RANGE]: 10,
  // 图表工具栏状态（侧边工具状态）
  [SettingStoreEnums.CHART_TOOLS_STATUS]: ToolsStatusEnum.ASIDE,
  // 图表工具栏状态隐藏（刚开始不隐藏）
  [SettingStoreEnums.CHART_TOOLS_STATUS_HIDE]: false,
}