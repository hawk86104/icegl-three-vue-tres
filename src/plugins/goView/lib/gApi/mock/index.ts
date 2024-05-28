import test from './test.mock'
import { MockMethod } from 'vite-plugin-mock'
import { RequestHttpEnum } from 'PLS/goView/lib/enums/httpEnum'

// 单个X数据
export const chartDataUrl = '/mock/chartData'
export const chartSingleDataUrl = '/mock/chartSingleData'
export const numberFloatUrl = '/mock/number/float'
export const numberIntUrl = '/mock/number/int'
export const textUrl = '/mock/text'
export const imageUrl = '/mock/image'
export const rankListUrl = '/mock/rankList'
export const scrollBoardUrl = '/mock/scrollBoard'
export const radarUrl = '/mock/radarData'
export const heatMapUrl = '/mock/heatMapData'
export const scatterBasicUrl = '/mock/scatterBasic'
export const mapUrl = '/mock/map'
export const capsuleUrl = '/mock/capsule'
export const wordCloudUrl = '/mock/wordCloud'
export const treemapUrl = '/mock/treemap'
export const threeEarth01Url = '/mock/threeEarth01Data'
export const sankeyUrl = '/mock/sankey'
export const graphUrl = '/mock/graphData'

const mockObject: MockMethod[] = [
  {
    // 正则
    // url: /\/mock\/mockData(|\?\S*)$/,
    url: chartDataUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchMockData
  },
  {
    url: chartSingleDataUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchMockSingleData
  },
  {
    url: numberFloatUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchNumberFloat
  },
  {
    url: numberIntUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchNumberInt
  },
  {
    url: textUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchText
  },
  {
    url: imageUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchImage(Math.round(Math.random() * 10))
  },
  {
    url: rankListUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchRankList
  },
  {
    url: scrollBoardUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchScrollBoard
  },
  {
    url: radarUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchRadar
  },
  {
    url: heatMapUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchHeatmap
  },
  {
    url: scatterBasicUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchScatterBasic
  },
  {
    url: mapUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchMap
  },
  {
    url: capsuleUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchCapsule
  },
  {
    url: wordCloudUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchWordCloud
  },
  {
    url: treemapUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchTreemap
  },
  {
    url: threeEarth01Url,
    method: RequestHttpEnum.GET,
    response: () => test.threeEarth01Data
  },
  {
    url: sankeyUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchSankey
  },
  {
    url: graphUrl,
    method: RequestHttpEnum.GET,
    response: () => test.graphData
  },
]

export default mockObject
