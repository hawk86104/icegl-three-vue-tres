import { ConfigType, PackagesCategoryEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PipelineVConfig: ConfigType = {
  key: 'PipelineV',
  chartKey: 'VPipelineV',
  conKey: 'VCPipelineV',
  title: '管道-纵向',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image: 'Pipeline_V.png'
}

