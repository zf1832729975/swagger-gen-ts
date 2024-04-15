import { OpenAPIV2 } from 'openapi-types'

export type Schema = OpenAPIV2.Schema
export type Parameter = OpenAPIV2.Parameter
export type ParameterBody = OpenAPIV2.InBodyParameterObject
export type ParameterObject = OpenAPIV2.GeneralParameterObject
export type SchemaObject = OpenAPIV2.SchemaObject
export type Response = OpenAPIV2.Response

export type SwaggerJson = OpenAPIV2.Document

export type OperationObject = OpenAPIV2.OperationObject

export type ApiRegExp = RegExp | string | ((url: string) => string)

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface ParseResult {
  url: string
  method: Method
  /**
   * 是否是重复的URL，url相同method不同的情况
   */
  isRepeatUrl: boolean

  path: string
  basePath?: string

  swaggerJson: SwaggerJson
  methodConfig: OperationObject
  config: GenerateConfig
  maxFolderDepth: number

  title: string
  description?: string
  tags: string[]
  tagName: string
}

export interface ParseResultFull extends ParseResult {
  filePath: string
  apiFunctionName: string

  requestTypeName: string
  responseTypeName: string

  requestQueryTypeName?: string
}

export interface UserGroupConfig extends BaseUserConfig {
  group: UserConfig[]
}

export interface SourceConfig extends BaseUserConfig {
  /**
   * url 或者 json，本地path
   */
  source: string
}

export interface BaseUserConfig {
  /**
   * 输出目录
   * @default './services'
   */
  output?: string

  /**
   * 请求文件的路径
   * @default "./request"
   * @example "./request"
   */
  requestFilePath?: string

  /**
   * 输出模板
   * @default 'ts'
   */
  lang?: 'js' | 'ts'
  /**
   * 包含哪些接口
   */
  include?: ApiRegExp[]
  /**
   * 排除哪些接口
   */
  exclude: ApiRegExp[]

  /**
   * 缩进
   * @default "\t"
   */
  indent?: string

  /**
   * 是否清空目录
   * @default false
   */
  clean?: boolean

  /**
   * 最大生成文件层级
   * @default 1
   */
  maxFolderDepth?: number
  // /**
  //  * 更加URL来生成api的级别
  //  * @description
  //  * 比如/api/system/user/detail
  //  * 传2生成的函数名为 userDetail
  //  * 传3生成的函数名为 systemUserDetail
  //  * @default 2
  //  */
  // urlToApiNameLevel?: number;

  /**
   * 生成的api函数名包含文件名
   * @default true
   */
  apiFunctionContainFileName?: boolean
  /**
   * 接口名最大深度
   * @default 5
   */
  apiFunctionNameMaxDepth?: number

  generateNameUrlReplace?: (url: string) => string

  /**
   * 生成的文件路径
   * @description ${outDir}目录到文件的路径，不含文件后缀名  a/b => `${outDir}/a/b`
   */
  generateFilePath?: (url: string, options: any) => string

  /**
   * 生成的函数名
   */
  generateApiName?: (url: string, options: any) => string
}

export type UserConfig = UserGroupConfig | SourceConfig

export type GenerateConfig = Required<UserConfig>
