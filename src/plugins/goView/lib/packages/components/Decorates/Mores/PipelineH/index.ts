import { ConfigType, PackagesCategoryEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PipelineHConfig: ConfigType = {
  key: 'PipelineH',
  chartKey: 'VPipelineH',
  conKey: 'VCPipelineH',
  title: '管道-横向',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image: 'Pipeline_H.png'
}
