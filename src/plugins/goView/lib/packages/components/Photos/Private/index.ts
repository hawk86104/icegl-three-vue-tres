/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 15:34:25
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 16:47:38
 */
import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from 'PLS/goView/lib/packages/index.d'
import { ImageConfig } from 'PLS/goView/lib/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'
import { setLocalStorage, getLocalStorage, goDialog } from 'PLS/goView/lib/utils/global'
import { StorageEnum } from 'PLS/goView/lib/enums/storageEnum'
import { FileTypeEnum } from 'PLS/goView/lib/enums/fileTypeEnum'
import { backgroundImageSize } from 'PLS/goView/lib/gSettings/designSetting'
// import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'

const StoreKey = StorageEnum.GO_USER_MEDIA_PHOTOS

/**
 * 上传完成事件类型
 */
type UploadCompletedEventType = {
  fileName: string
  url: string
}

const userPhotosList: ConfigType[] = getLocalStorage(StoreKey) || []

const uploadFile = (callback: Function | null = null) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png,.jpg,.jpeg,.gif' // 这里只允许部分图片类型
  input.onchange = async () => {
    if (!input.files || !input.files.length) return
    const file = input.files[0]
    const { name, size, type } = file
    if (size > 1024 * 1024 * backgroundImageSize) {
      window['$message'].warning(`图片超出 ${backgroundImageSize}M 限制，请重新上传！`)
      return false
    }
    if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
      window['$message'].warning('文件格式不符合，请重新上传！')
      return false
    }
    const reader = new FileReader()
    reader.onload = () => {
      const eventObj: UploadCompletedEventType = { fileName: name, url: reader.result as string }
      callback && callback(eventObj)
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

const addConfig = {
  ...ImageConfig,
  category: ChatCategoryEnum.PRIVATE,
  categoryName: ChatCategoryEnumName.PRIVATE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  title: '点击上传图片',
  image: 'upload.png',
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}`, // 跳转组件路径规则：packageName/categoryName/componentKey
  disabled: true,
  configEvents: {
    // 点击上传事件
    addHandle: (photoConfig: ConfigType) => {
      goDialog({
        message: `图片需小于 ${backgroundImageSize}M 且只暂存在浏览器中。当前图片暂存上限5M，超过不再缓存新图片，请自行对接后端接口！现编译成 base64 进行渲染，对接后端后请使用【URL地址】进行交互！`,
        transformOrigin: 'center',
        onPositiveCallback: () => {
          uploadFile((e: UploadCompletedEventType) => {
            console.log('不考虑上传图片')
            // 和上传组件一样配置，更换标题，图片，预设数据
            // const packagesStore = usePackagesStore()
            // const newPhoto = {
            //   ...ImageConfig,
            //   category: ChatCategoryEnum.PRIVATE,
            //   categoryName: ChatCategoryEnumName.PRIVATE,
            //   package: PackagesCategoryEnum.PHOTOS,
            //   chartFrame: ChartFrameEnum.STATIC,
            //   title: e.fileName,
            //   image: e.url,
            //   dataset: e.url,
            //   redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
            // }
            // userPhotosList.unshift(newPhoto)
            // // 存储在本地数据中
            // setLocalStorage(StoreKey, userPhotosList)
            // // 插入到上传按钮前的位置
            // packagesStore.addPhotos(newPhoto, 1)
          })
        }
      })
    }
  }
}

export default [addConfig, ...userPhotosList]
