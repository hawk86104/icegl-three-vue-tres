import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FullScreenConfig: ConfigType = {
  key: 'FullScreen',
  chartKey: 'VFullScreen',
  conKey: 'VCFullScreen',
  title: '全屏按钮',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'fullScreen.png'
}
