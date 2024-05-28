import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border09Config: ConfigType = {
  key: 'Border09',
  chartKey: 'VBorder09',
  conKey: 'VCBorder09',
  title: '边框-09',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border09.png'
}
