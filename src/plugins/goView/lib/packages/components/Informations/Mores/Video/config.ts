import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { VideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 视频路径
  dataset: '',
  // 循环播放
  loop: true,
  // 静音
  muted: true,
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VideoConfig.key
  public chartConfig = cloneDeep(VideoConfig)
  public option = cloneDeep(option)
}
