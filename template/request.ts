/**
 * 请求配置文件
 */
import axios, { AxiosRequestConfig } from 'axios'

export interface RequestOptions extends AxiosRequestConfig {}

interface RequestParams {
  url: string
  method: string
  data?: any
  params?: any
  headers?: any
}

// 传入泛型，方便包装处理返回的类型
async function requestAdapter<Response>(
  { url, method, data, params, headers }: RequestParams,
  options?: RequestOptions
): Promise<Response> {
  // 👇🏻 业务的请求库

  const response = await axios({
    url,
    method,
    data,
    params,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })

  return response.data
}
export default requestAdapter
