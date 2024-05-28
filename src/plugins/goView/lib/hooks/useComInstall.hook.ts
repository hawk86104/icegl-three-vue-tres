import { ref } from 'vue'
import { fetchChartComponent } from '../packages/index'

export const useComInstall = (localStorageInfo: any) => {
  const show = ref(false)

  // 注册组件(一开始无法获取window['$vue'])
  const intervalTiming = setInterval(() => {
    if (window['$vue'].component) {
      clearInterval(intervalTiming)

      const intComponent = (target: any) => {
        if (!window['$vue'].component(target.chartConfig.chartKey)) {
          window['$vue'].component(target.chartConfig.chartKey, fetchChartComponent(target.chartConfig))
        }
      }

      localStorageInfo.componentList.forEach(async (e: any) => {
        if (e.isGroup) {
          e.groupList.forEach(groupItem => {
            intComponent(groupItem)
          })
        } else {
          intComponent(e)
        }
      })
      show.value = true
    }
  }, 200)

  return {
    show
  }
}
