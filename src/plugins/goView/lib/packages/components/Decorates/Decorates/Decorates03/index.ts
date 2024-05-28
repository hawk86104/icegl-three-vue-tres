import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates03Config: ConfigType = {
  key: 'Decorates03',
  chartKey: 'VDecorates03',
  conKey: 'VCDecorates03',
  title: '装饰-03',
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'decorates03.png'
}
