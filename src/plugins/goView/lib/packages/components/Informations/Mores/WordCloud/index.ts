import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const WordCloudConfig: ConfigType = {
  key: 'WordCloud',
  chartKey: 'VWordCloud',
  conKey: 'VCWordCloud',
  title: '词云',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'words_cloud.png'
}
