import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const HeatmapConfig: ConfigType = {
  key: 'Heatmap',
  chartKey: 'VHeatmap',
  conKey: 'VCHeatmap',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'heatmap.png'
}
