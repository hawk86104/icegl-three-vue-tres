import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImageConfig: ConfigType = {
  key: 'Image',
  chartKey: 'VImage',
  conKey: 'VCImage',
  title: '图片',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'photo.png'
}
