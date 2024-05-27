/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-22 20:54:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 11:59:33
 */
import { useChartEditStore } from '../../stores/chartEditStore'

//@ts-ignore
// import dataJson from './test.json'
import dataJson from './1716775459252.json'

const chartEditStore = useChartEditStore()

export const getSessionStorageInfo = () => {
  console.log(dataJson)
  const { editCanvasConfig, requestGlobalConfig, componentList } = dataJson as any
  chartEditStore.editCanvasConfig = editCanvasConfig
  chartEditStore.requestGlobalConfig = requestGlobalConfig
  chartEditStore.componentList = componentList
  return dataJson
}