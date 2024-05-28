// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from 'PLS/goView/lib/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ProcessConfig: ConfigType = {
  // 唯一key
  key: 'Process',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VProcess',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCProcess',
  // 名称
  title: 'NaiveUI-进度',
  // 子分类目录
  category: ChatCategoryEnum.MORE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.MORE,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'process.png'
}