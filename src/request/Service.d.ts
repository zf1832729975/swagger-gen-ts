import { AxiosRequestConfig, AxiosResponse } from 'axios'
type DefaultType = any
export declare namespace Service {
  // 配置项，下面的选项都可以在独立的接口请求中覆盖

  type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
  type SuccessMessageMode = ErrorMessageMode
  interface ExtraConf {
    /**
     * 是否返回原生响应头 比如：需要获取响应头时使用该属性
     * @default false
     */
    isReturnNativeResponse?: boolean

    /**
     * 需要对返回数据进行处理
     * @default true
     */
    isTransformResponse?: boolean

    /** 错误消息提示类型 */
    errorMessageMode?: ErrorMessageMode
    /** 成功 消息提示类型 */
    successMessageMode?: SuccessMessageMode
  }
  /** 基础请求配置 */
  interface Conf<Data = any> extends AxiosRequestConfig<Data>, ExtraConf {}
  interface Response<Res, Req> extends AxiosResponse<Res, Req> {}

  // 1. 是否返回原生响应内容 比如：需要获取响应头 时使用该属性
  interface ReturnNativeConfig<Data> extends Conf<Data> {
    /**
     * 是否返回原生响应头 比如：需要获取响应头时使用该属性
     * @default false
     */
    isReturnNativeResponse: true
  }

  interface ReturnNativeResponse<Req, Res> extends AxiosResponse<Res, Req> {}

  //  需要对返回数据进行处理
  interface NotTransformRequestResultConfig<Data> extends Conf<Data> {
    /**
     * 需要对返回数据进行处理
     * @default true
     */
    isTransformResponse: false
  }

  interface NormalRequestConfig<Data> extends Conf<Data> {}

  //  文件
  type FileType = 'blob' | 'arraybuffer' | 'stream'
  interface FileRequest<Data> extends Conf<Data> {
    responseType: FileType
  }
  interface FileResponse<Req> extends Response<Blob, Req> {
    /**
     * 文件名，默认在 响应头 content-disposition 里面读取的
     */
    filename?: string
  }

  interface request {
    // 不做任何处理，直接返回请求的的内容
    <Res = DefaultType, Req = DefaultType>(config: ReturnNativeConfig<Req>): Promise<ReturnNativeResponse<Req, Res>>

    <D = DefaultType, Req = DefaultType>(config: NotTransformRequestResultConfig<Req>): Promise<D>

    // 文件的、要拿文件名，请求头等信息呢
    <T>(config: Conf & { responseType: FileType }): Response<Blob & { filename?: string }>

    // 默认
    <D, R>(config: Request<R>): Promise<D>
  }
}
