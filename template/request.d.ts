/**
 * 请求配置文件
 */
import { AxiosRequestConfig } from 'axios'

export interface RequestOptions extends AxiosRequestConfig {}

interface RequestParams {
  url: string
  method: string
  data?: any
  params?: any
  headers?: any
}

// 传入泛型，方便包装处理返回的类型
export declare function requestAdapter<Response>(
  { url, method, data, params, headers }: RequestParams,
  options?: RequestOptions
): Promise<Response>
export default requestAdapter
