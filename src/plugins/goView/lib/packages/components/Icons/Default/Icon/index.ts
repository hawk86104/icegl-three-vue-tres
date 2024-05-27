import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const IconConfig: ConfigType = {
  key: 'Icon',
  chartKey: 'VIcon',
  conKey: 'VCIcon',
  title: '图标',
  category: ChatCategoryEnum.DEFAULT,
  categoryName: ChatCategoryEnumName.DEFAULT,
  package: PackagesCategoryEnum.ICONS,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'icon.png'
}
