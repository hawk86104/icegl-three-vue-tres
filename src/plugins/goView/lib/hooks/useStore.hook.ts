import { useChartEditStore } from '../../stores/chartEditStore'
const REQUEST_GLOBAL_CONFIG = 'requestGlobalConfig'

// store 相关
export const useStore = (localStorageInfo: any) => {
  const chartEditStore = useChartEditStore()
  chartEditStore.requestGlobalConfig = localStorageInfo[REQUEST_GLOBAL_CONFIG]
}
