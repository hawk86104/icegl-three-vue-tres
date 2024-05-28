import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from 'PLS/goView/lib/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const CirclePointConfig: ConfigType = {
    key: 'CirclePoint',
    chartKey: 'VCirclePoint',
    conKey: 'VCCirclePoint',
    title: '圆点光环',
    category: ChatCategoryEnum.MORE,
    categoryName: ChatCategoryEnumName.MORE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'flow-circle.png'
}
