import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapBaseConfig: ConfigType = {
    key: 'MapBase',
    chartKey: 'VMapBase',
    conKey: 'VCMapBase',
    title: '地图(可选省份)',
    category: ChatCategoryEnum.MAP,
    categoryName: ChatCategoryEnumName.MAP,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'map.png'
}