import { computed, toRefs } from 'vue'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useDesignStore } from 'PLS/goView/stores/designStore/designStore'
import { borderRadius } from 'PLS/goView/lib/gSettings/designSetting'
import { alpha, lighten } from 'PLS/goView/lib/utils/global'

/**
 * * 设置全局主题
 */
export const useThemeOverridesHook = () => {
  const designStore = useDesignStore()
  const { getAppTheme } = toRefs(designStore)
  const darkTheme = computed(
    (): GlobalThemeOverrides => {
      // 通用
      const commonObj = {
        common: {
          primaryColor: getAppTheme.value,
          primaryColorHover: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorPressed: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorSuppl: getAppTheme.value,
          borderRadius
        }
      }
      // 亮色主题
      const lightObject = {
        common: {
          ...commonObj.common
        }
      }
      // 暗色主题
      const dartObject = {
        common: {
          ...commonObj.common
        },
        LoadingBar: {
          colorLoading: getAppTheme.value
        }
      }
      return designStore.getDarkTheme ? dartObject : lightObject
    }
  )
  return darkTheme
}

// 返回暗黑主题
export const useDarkThemeHook = () => {
  const designStore = useDesignStore()
  return computed(() => (designStore.getDarkTheme ? darkTheme : undefined))
}
