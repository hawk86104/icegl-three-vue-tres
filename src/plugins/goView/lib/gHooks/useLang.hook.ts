/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-22 20:54:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 17:06:18
 */
import { computed } from 'vue'
import { LangEnum } from 'PLS/goView/lib/enums/styleEnum'
import { zhCN, enUS, dateEnUS, dateZhCN } from 'naive-ui'

type LangStoreType = typeof useLangStore

// 语言切换
export const useLang = () => {
  const lang = {
    getLang : LangEnum.ZH
  }
  
  const locale = computed(() => {
    return lang.getLang === LangEnum.ZH ? zhCN : enUS
  })

  const dateLocale = computed(() => {
    return lang.getLang === LangEnum.ZH ? dateZhCN : dateEnUS
  })

  return {
    locale,
    dateLocale
  }
}
