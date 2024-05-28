import { ChartFrameEnum, PackagesCategoryEnum } from 'PLS/goView/lib/packages/index.d'
import { ImageConfig } from 'PLS/goView/lib/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// 远程共享库（调接口获取图像列表）
const imageList = [
  { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' }
]

const photoConfigList = imageList.map(i => ({
  ...ImageConfig,
  category: ChatCategoryEnum.SHARE,
  categoryName: ChatCategoryEnumName.SHARE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  image: i.imageUrl,
  dataset: i.imageUrl,
  title: i.imageName,
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default photoConfigList
