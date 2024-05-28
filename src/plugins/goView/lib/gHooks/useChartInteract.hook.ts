import { toRefs } from 'vue'
import { isPreview } from 'PLS/goView/lib/utils/global'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

// Params 参数修改触发 api 更新图表请求
export const useChartInteract = (
  chartConfig: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  param: { [T: string]: any },
  interactEventOn: string
) => {
  if (!isPreview()) return
  const chartEditStore = useChartEditStore()
  const { interactEvents } = chartConfig.events
  const fnOnEvent = interactEvents.filter(item => {
    return item.interactOn === interactEventOn
  })

  if (fnOnEvent.length === 0) return
  fnOnEvent.forEach(item => {

    const globalConfigPindAprndex = chartEditStore.requestGlobalConfig.requestDataPond.findIndex(cItem =>
      cItem.dataPondId === item.interactComponentId
    )
    if (globalConfigPindAprndex !== -1) {
      const { Params, Header } = toRefs(chartEditStore.requestGlobalConfig.requestDataPond[globalConfigPindAprndex].dataPondRequestConfig.requestParams)

      Object.keys(item.interactFn).forEach(key => {
        if (key in Params.value) {
          Params.value[key] = param[item.interactFn[key]]
        }
        if (key in Header.value) {
          Header.value[key] = param[item.interactFn[key]]
        }
      })
    } else {
      const index = chartEditStore.fetchTargetIndex(item.interactComponentId)
      if (index === -1) return
      const { Params, Header } = toRefs(chartEditStore.componentList[index].request.requestParams)

      Object.keys(item.interactFn).forEach(key => {
        if (key in Params.value) {
          Params.value[key] = param[item.interactFn[key]]
        }
        if (key in Header.value) {
          Header.value[key] = param[item.interactFn[key]]
        }
      })
    }
  })
}
// 联动事件触发的 type 变更时，清除当前绑定内容
export const clearInteractEvent = (chartConfig: CreateComponentType) => {

}
