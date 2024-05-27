import heatmapJson from './heatMapData.json'
import scatterJson from './scatter.json'
import mapJson from './map.json'
import tTreemapJson from './treemap.json'
import sankeyJson from './sankey.json'
import graphDataJson from './graph.json'

export default {
  // 单图表
  fetchMockSingleData: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: {
    dimensions: ['product', 'dataOne'],
      'source|20': [
        {
          product: '@name',
          'dataOne|0-900': 3
        }
      ]
    }
  },
  // 胶囊图
  fetchCapsule: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: {
      dimensions: ['name', 'value'],
      "source|2-5": [
        { 'name|+1': ["厦门","福州","北京","上海","新疆","郑州","湖南","内蒙古"], 'value|0-40': 20 },
      ]
    }
  },
  // 图表
  fetchMockData: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: {
      dimensions: ['product', 'dataOne', 'dataTwo', 'dataThree'],
      'source|20': [
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
          'dataThree|100-900': 3
        }
      ]
    }
  },
  // 排名列表
  fetchRankList: {
    code: 0,
    status: 200,
    msg: '请求成功',
    'data|50': [{ name: '@name', 'value|100-900': 5 }]
  },
  // 轮播表格
  fetchScrollBoard: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: [
      ['行1列1', '行1列2', '1'],
      ['行2列1', '行2列2', '2'],
      ['行3列1', '行3列2', '3'],
      ['行4列1', '行4列2', '4'],
      ['行5列1', '行5列2', '5'],
      ['行6列1', '行6列2', '6'],
      ['行7列1', '行7列2', '行7列3'],
      ['行8列1', '行8列2', '行8列3'],
      ['行9列1', '行9列2', '行9列3'],
      ['行10列1', '行10列2', '行10列3']
    ]
  },
  // 获取数字-浮点型
  fetchNumberFloat: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@float(0, 0.99, 1, 4)'
  },
  // 获取数字-整型
  fetchNumberInt: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@integer(0, 100)'
  },
  // 文字
  fetchText: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@paragraph(1, 10)'
  },
  // 图片
  fetchImage: (num: number) => ({
    code: 0,
    status: 200,
    msg: '请求成功',
    data: `https://robohash.org/${num}`
  }),
  // 雷达
  fetchRadar: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: {
      radarIndicator: [
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 },
        { name: '@name', max: 10000 }
      ],
      seriesData: [
        {
          value: [
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)'
          ],
          name: 'data1'
        },
        {
          value: [
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)',
            '@integer(0, 10000)'
          ],
          name: 'data2'
        }
      ]
    }
  },
  // 热力图
  fetchHeatmap: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: heatmapJson
  },
  // 散点图
  fetchScatterBasic: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: scatterJson
  },
  // 中国地图
  fetchMap: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: mapJson
  },
  // 词云
  fetchWordCloud: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: [
      {
        name: '@name',
        value: 8000,
        textStyle: {
          color: '#78fbb2'
        },
        emphasis: {
          textStyle: {
            color: 'red'
          }
        }
      },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' },
      { name: '@name', value: '@integer(10, 8000)' }
    ]
  },
  // 树图
  fetchTreemap: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: tTreemapJson
  },
  // 三维地球
  threeEarth01Data: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: [
      {
        startArray: { name: '@name', N: '@integer(10, 100)', E: '@integer(10, 100)' },
        'endArray|10': [{ name: '@name', N: '@integer(10, 100)', E: '@integer(10, 100)' }]
      }
    ]
  },
  // 桑基图
  fetchSankey: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: sankeyJson
  },
  // 关系图
  graphData: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: graphDataJson
  },
}
