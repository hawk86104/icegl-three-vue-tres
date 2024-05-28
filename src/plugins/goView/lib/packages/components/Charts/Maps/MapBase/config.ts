import { echartOptionProfixHandle, PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { MapBaseConfig } from './index'
import { chartInitConfig } from 'PLS/goView/lib/gSettings/designSetting'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

export const option = {
  dataset: dataJson,
  mapRegion: {
    adcode: 'china',
    showHainanIsLands: true,
    enter: false,
    backSize: 20,
    backColor: '#ffffff'
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  visualMap: {
    show: true,
    orient: 'vertical',
    pieces: [
      { gte: 1000, label: '>1000' }, // 不指定 max，表示 max 为无限大（Infinity）。
      { gte: 600, lte: 999, label: '600-999' },
      { gte: 200, lte: 599, label: '200-599' },
      { gte: 50, lte: 199, label: '49-199' },
      { gte: 10, lte: 49, label: '10-49' },
      { lte: 9, label: '<9' } // 不指定 min，表示 min 为无限大（-Infinity）。
    ],
    inRange: {
      // 渐变颜色，从小到大
      color: ['#c3d7df', '#5cb3cc', '#8abcd1', '#66a9c9', '#2f90b9', '#1781b5']
    },
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    show: false,
    type: 'map',
    roam: false,
    map: 'china',
    selectedMode: false, //是否允许选中多个区域
    zoom: 1
  },
  series: [
    {
      name: '',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: 4,
      legendHoverLink: true,
      showEffectOn: 'render',
      rippleEffect: {
        scale: 6,
        color: '#FFFFFF',
        brushType: 'fill'
      },
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0,0,0,.6)',
        borderColor: 'rgba(147, 235, 248, .8)',
        textStyle: {
          color: '#FFF'
        }
      },
      label: {
        formatter: '{b}',
        fontSize: 11,
        offset: [0, 2],
        position: 'bottom',
        textBorderColor: '#fff',
        textShadowColor: '#000',
        textShadowBlur: 10,
        textBorderWidth: 0,
        color: '#FFFFFF',
        show: true
      },
      itemStyle: {
        color: '#FFFFFF',
        borderColor: 'rgba(225,255,255,2)',
        borderWidth: 4,
        shadowColor: '#E1FFFF',
        shadowBlur: 10
      },
      data: [],
      encode: {
        value: 2
      }
    },
    {
      name: '区域',
      type: 'map',
      map: 'china',
      data: [],
      selectedMode: false,
      zoom: 1,
      geoIndex: 1,
      tooltip: {
        show: true,
        backgroundColor: '#00000060',
        borderColor: 'rgba(147, 235, 248, 0.8)',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 12
        }
      },
      label: {
        show: false,
        color: '#FFFFFF',
        fontSize: 12
      },
      emphasis: {
        disabled: false,
        label: {
          color: '#FFFFFF',
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#389BB7',
          shadowColor: '#389BB7',
          borderWidth: 1
        }
      },
      itemStyle: {
        borderColor: '#93EBF8',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: '#93ebf800' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#93ebf820' // 100% 处的颜色
            }
          ],
          globalCoord: false
        },
        shadowColor: '#80D9F842',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10
      }
    },
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: 7 //图标大小
      },
      lineStyle: {
        normal: {
          color: '#4fb6d2',
          width: 1, //线条宽度
          opacity: 0.1, //尾迹线条透明度
          curveness: 0.3 //尾迹线条曲直度
        }
      },
      data: []
    }
  ]
}
export const MapDefaultConfig = { ...option }
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = MapBaseConfig.key
  public attr = { ...chartInitConfig, w: 750, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapBaseConfig)
  public option = echartOptionProfixHandle(option, includes)
}
