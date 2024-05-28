import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const WaterPoloConfig: ConfigType = {
  key: 'WaterPolo',
  chartKey: 'VWaterPolo',
  conKey: 'VCWaterPolo',
  title: '水球图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'water_WaterPolo.png'
}
