import { InteractEventOn, InteractActionsType } from 'PLS/goView/lib/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATE = 'date',
  DATE_TIME = 'datetime',
  DATE_RANGE = 'daterange',
  DATE_TIME_RANGE = 'datetimerange',
  MONTH = 'month',
  MONTH_RANGE = 'monthrange',
  YEAR = 'year',
  YEAR_RANGE = 'yearrange',
  QUARTER = 'quarter',
  QUARTER_RANGE = 'quarterrange'
}

// 联动参数
export enum ComponentInteractParamsEnum {
  DATE = 'date',
  DATE_START = 'dateStart',
  DATE_END = 'dateEnd',
  DATE_RANGE = 'daterange'
}

export enum DefaultTypeEnum {
  NONE = "none",
  STATIC = "static",
  DYNAMIC = "dynamic"
}

export enum DifferUnitEnum {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'M',
  QUARTER = 'Q',
  YEAR = 'y',
  HOUR = 'h',
  MINUTE = 'm',
  SECOND = 's',
  MILLISECOND = 'ms',
}

export const DifferUnitObject = {
  // https://day.js.org/docs/en/manipulate/add
  [DifferUnitEnum.DAY]: '天',
  [DifferUnitEnum.WEEK]: '周',
  [DifferUnitEnum.MONTH]: '月',
  [DifferUnitEnum.QUARTER]: '季度',
  [DifferUnitEnum.YEAR]: '年',
  [DifferUnitEnum.HOUR]: '小时',
  [DifferUnitEnum.MINUTE]: '分钟',
  [DifferUnitEnum.SECOND]: '秒',
  [DifferUnitEnum.MILLISECOND]: '毫秒',
}

const time = [
  {
    value: ComponentInteractParamsEnum.DATE,
    label: '日期'
  }
]

const timeRange = [
  {
    value: ComponentInteractParamsEnum.DATE_START,
    label: '开始时间'
  },
  {
    value: ComponentInteractParamsEnum.DATE_END,
    label: '结束时间'
  },
  {
    value: ComponentInteractParamsEnum.DATE_RANGE,
    label: '日期范围'
  }
]

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: '选择完成',
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATE]: time,
      [ComponentInteractEventEnum.DATE_TIME]: time,
      [ComponentInteractEventEnum.DATE_RANGE]: timeRange,
      [ComponentInteractEventEnum.MONTH]: time,
      [ComponentInteractEventEnum.MONTH_RANGE]: timeRange,
      [ComponentInteractEventEnum.QUARTER]: time,
      [ComponentInteractEventEnum.QUARTER_RANGE]: timeRange,
      [ComponentInteractEventEnum.YEAR]: time,
      [ComponentInteractEventEnum.YEAR_RANGE]: timeRange,
    }
  }
]
