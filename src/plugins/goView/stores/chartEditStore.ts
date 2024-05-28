/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:39:08
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-28 14:39:29
 */
import { defineStore } from 'pinia'
import { globalThemeJson } from '../lib/settings'
import { PreviewScaleEnum } from '../lib/enums/styleEnum'
import { RequestHttpIntervalEnum } from '../lib/enums/httpEnum'
import { requestInterval, requestIntervalUnit } from 'PLS/goView/lib/gSettings/designSetting'
// export const requestIntervalUnit = RequestHttpIntervalEnum.SECOND

export const useChartEditStore = defineStore({
    id: 'useChartEditStore',
    state: (): any => ({
        // 画布属性（需存储给后端）
        editCanvasConfig: {
            // 项目名称
            projectName: undefined,
            // 默认宽度
            width: 1920,
            // 默认高度
            height: 1080,
            // 启用滤镜
            filterShow: false,
            // 色相
            hueRotate: 0,
            // 饱和度
            saturate: 1,
            // 对比度
            contrast: 1,
            // 亮度
            brightness: 1,
            // 透明度
            opacity: 1,
            // 变换（暂不更改）
            rotateZ: 0,
            rotateX: 0,
            rotateY: 0,
            skewX: 0,
            skewY: 0,
            // 混合模式
            blendMode: 'normal',
            // 默认背景色
            background: undefined,
            backgroundImage: undefined,
            // 是否使用纯颜色
            selectColor: true,
            // chart 主题色
            chartThemeColor: 'dark',
            // 自定义颜色列表
            chartCustomThemeColorInfo: undefined,
            // 全局配置
            chartThemeSetting: globalThemeJson,
            // 适配方式
            previewScaleType: PreviewScaleEnum.FIT,
        },
        // 数据请求处理（需存储给后端）
        requestGlobalConfig: {
            requestDataPond: [],
            requestOriginUrl: '',
            requestInterval: requestInterval,
            requestIntervalUnit: requestIntervalUnit,
            requestParams: {
                Body: {
                    'form-data': {},
                    'x-www-form-urlencoded': {},
                    json: '',
                    xml: '',
                },
                Header: {},
                Params: {},
            },
        },
        // 图表数组（需存储给后端）
        componentList: [],
    }),
    getters: {
        getMousePosition(): any {
          return this.mousePosition
        },
        getRightMenuShow(): boolean {
          return this.rightMenuShow
        },
        getEditCanvas(): any {
          return this.editCanvas
        },
        getEditCanvasConfig(): any {
          return this.editCanvasConfig
        },
        getTargetChart(): any {
          return this.targetChart
        },
        getRecordChart(): any | undefined {
          return this.recordChart
        },
        getRequestGlobalConfig(): any {
          return this.requestGlobalConfig
        },
        getComponentList(): any {
          return this.componentList
        }
      },
})
