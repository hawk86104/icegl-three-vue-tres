import { toRaw, watch, computed, ComputedRef } from 'vue'
import { customizeHttp } from 'PLS/goView/lib/gApi/http'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { RequestGlobalConfigType, RequestDataPondItemType } from 'PLS/goView/stores/chartEditStore.d'
import { newFunctionHandle, intervalUnitHandle } from 'PLS/goView/lib/utils/global'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

// 数据池存储的数据类型
type DataPondMapType = {
  updateCallback: (...args: any) => any
  filter?: string | undefined
}

// 数据池 Map 中请求对应 callback
const mittDataPondMap = new Map<string, DataPondMapType[]>()

// 创建单个数据项轮询接口
const newPondItemInterval = (
  requestGlobalConfig: RequestGlobalConfigType,
  requestDataPondItem: ComputedRef<RequestDataPondItemType>,
  dataPondMapItem?: DataPondMapType[]
) => {
  if (!dataPondMapItem) return
  let fetchInterval: any = 0

  clearInterval(fetchInterval)

  // 请求
  const fetchFn = async () => {
    try {
      const res = await customizeHttp(toRaw(requestDataPondItem.value.dataPondRequestConfig), toRaw(requestGlobalConfig))
      if (res) {
        try {
          // 遍历更新回调函数
          dataPondMapItem.forEach(item => {
            item.updateCallback(newFunctionHandle(res?.data, res, item.filter))
          })
        } catch (error) {
          console.error(error)
          return error
        }
      }
    } catch (error) {
      return error
    }
  }

  watch(
    () => requestDataPondItem.value.dataPondRequestConfig.requestParams.Params,
    () => {
      fetchFn()
    },
    {
      immediate: false,
      deep: true
    }
  )


  // 立即调用
  fetchFn()


  const targetInterval = requestDataPondItem.value.dataPondRequestConfig.requestInterval
  const targetUnit = requestDataPondItem.value.dataPondRequestConfig.requestIntervalUnit

  const globalRequestInterval = requestGlobalConfig.requestInterval
  const globalUnit = requestGlobalConfig.requestIntervalUnit

  // 定时时间
  const time = targetInterval ? targetInterval : globalRequestInterval
  // 单位
  const unit = targetInterval ? targetUnit : globalUnit
  // 开启轮询
  if (time) fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
}

/**
 * 数据池接口处理
 */
export const useChartDataPondFetch = () => {
  // 新增全局接口
  const addGlobalDataInterface = (
    targetComponent: CreateComponentType,
    useChartEditStore: ChartEditStoreType,
    updateCallback: (...args: any) => any
  ) => {
    const chartEditStore = useChartEditStore()
    const { requestDataPond } = chartEditStore.getRequestGlobalConfig

    // 组件对应的数据池 Id
    const requestDataPondId = targetComponent.request.requestDataPondId as string
    // 新增数据项
    const mittPondIdArr = mittDataPondMap.get(requestDataPondId) || []
    mittPondIdArr.push({
      updateCallback: updateCallback,
      filter: targetComponent.filter
    })
    mittDataPondMap.set(requestDataPondId, mittPondIdArr)
  }

  // 清除旧数据
  const clearMittDataPondMap = () => {
    mittDataPondMap.clear()
  }

  // 初始化数据池
  const initDataPond = (useChartEditStore: ChartEditStoreType) => {
    const { requestGlobalConfig } = useChartEditStore()
    const chartEditStore = useChartEditStore()
    // 根据 mapId 查找对应的数据池配置
    for (let pondKey of mittDataPondMap.keys()) {
      const requestDataPondItem = computed(() => {
        return requestGlobalConfig.requestDataPond.find(item => item.dataPondId === pondKey)
      }) as ComputedRef<RequestDataPondItemType>
      if (requestDataPondItem) {
        newPondItemInterval(chartEditStore.requestGlobalConfig, requestDataPondItem, mittDataPondMap.get(pondKey))
      }
    }
  }

  return {
    addGlobalDataInterface,
    clearMittDataPondMap,
    initDataPond
  }
}
