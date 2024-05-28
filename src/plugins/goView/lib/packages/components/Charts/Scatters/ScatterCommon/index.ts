import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ScatterCommonConfig: ConfigType = {
  key: 'ScatterCommon',
  chartKey: 'VScatterCommon',
  conKey: 'VCScatterCommon',
  title: '散点图',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'scatter-multi.png'
}
