/**
 * 请求配置文件
 */
// import { request } from "@/utils";
import axios, { AxiosRequestConfig } from 'axios'

export interface RequestOptions extends AxiosRequestConfig {}

interface RequestParams {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  data?: any
  params?: any
  headers?: any
}

async function requestAdapter(
  { url, method, data, params, headers }: RequestParams,
  options?: RequestOptions
): Promise<any> {
  // axios
  const axiosResponse = await axios({
    url,
    method,
    data,
    params,
    ...options,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...headers,
      ...options?.headers,
    },
  })
  const apiResponse = axiosResponse.data
  return apiResponse

  // return request({
  //   url,
  //   method,
  //   data,
  //   params,
  //   ...options,
  //   headers: {
  //     ...headers,
  //     ...options?.headers,
  //   },
  // });
}
export default requestAdapter
