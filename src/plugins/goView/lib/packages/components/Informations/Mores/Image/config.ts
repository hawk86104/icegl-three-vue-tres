import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { ImageConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'


export const option = {
  // 图片路径
  dataset: logo,
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = ImageConfig.key
  public chartConfig = cloneDeep(ImageConfig)
  public option = cloneDeep(option)
}
