import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const DialConfig: ConfigType = {
  key: 'Dial',
  chartKey: 'VDial',
  conKey: 'VCDial',
  title: '表盘',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image:'dial.png'
}
