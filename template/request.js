/**
 * 请求配置文件
 */
import axios from 'axios'

/**
 *
 * @param {*} param0
 * @param {import('axios').AxiosRequestConfig} options
 * @returns
 */
async function requestAdapter({ url, method, data, params, headers }, options) {
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
