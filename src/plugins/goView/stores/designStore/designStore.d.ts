import { ThemeEnum } from '@/enums/styleEnum'

export type AppThemeColorType = {
  CMYK: number[]
  RGB: number[]
  hex: string
  name: string
  pinyin: string
}

export interface DesignStateType {
  // 是否是深色主题
  darkTheme: boolean
  // 主题名称
  themeName: ThemeEnum
  //色号
  appTheme: string
  appThemeDetail: AppThemeColorType | null
}
