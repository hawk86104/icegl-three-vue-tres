/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200,
  SERVER_ERROR = 500,
  SERVER_FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 60000
}

// 数据相关
export enum RequestDataTypeEnum {
  // 静态数据
  STATIC = 0,
  // 请求数据
  AJAX = 1,
  // 数据池
  Pond = 2
}

// 请求主体类型
export enum RequestContentTypeEnum {
  // 普通请求
  DEFAULT = 0,
  // SQL请求
  SQL = 1
}

/**
 * @description: 请求方法
 */
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete'
}

/**
 * @description: 请求间隔
 */
export enum RequestHttpIntervalEnum {
  // 秒
  SECOND = 'second',
  // 分
  MINUTE = 'minute',
  // 时
  HOUR = 'hour',
  // 天
  DAY = 'day'
}

/**
 * @description: 请求间隔名称
 */
export const SelectHttpTimeNameObj = {
  [RequestHttpIntervalEnum.SECOND]: '秒',
  [RequestHttpIntervalEnum.MINUTE]: '分',
  [RequestHttpIntervalEnum.HOUR]: '时',
  [RequestHttpIntervalEnum.DAY]: '天'
}

/**
 * @description: 请求头部类型
 */
export enum RequestBodyEnum {
  NONE = 'none',
  FORM_DATA = 'form-data',
  X_WWW_FORM_URLENCODED = 'x-www-form-urlencoded',
  JSON = 'json',
  XML = 'xml'
}

/**
 * @description: 请求头部类型数组
 */
export const RequestBodyEnumList = [
  RequestBodyEnum.NONE,
  RequestBodyEnum.FORM_DATA,
  RequestBodyEnum.X_WWW_FORM_URLENCODED,
  RequestBodyEnum.JSON,
  RequestBodyEnum.XML
]

/**
 * @description: 请求参数类型
 */
export enum RequestParamsTypeEnum {
  PARAMS = 'Params',
  BODY = 'Body',
  HEADER = 'Header',
}

/**
 * @description: 请求参数主体
 */
export type RequestParamsObjType = {
  [T: string]: string
}
export type RequestParams = {
  [RequestParamsTypeEnum.PARAMS]: RequestParamsObjType
  [RequestParamsTypeEnum.HEADER]: RequestParamsObjType
  [RequestParamsTypeEnum.BODY]: {
    [RequestBodyEnum.FORM_DATA]: RequestParamsObjType
    [RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType
    [RequestBodyEnum.JSON]: string
    [RequestBodyEnum.XML]: string
  }
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // xml
  XML = 'application/xml;charset=UTF-8',
  // application/x-www-form-urlencoded 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
