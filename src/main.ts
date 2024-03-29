import { startGenerateCode } from './gen'
import { UserConfig, SwaggerJson } from './types'
import axios from 'axios'
import { isObject, isString, isUrl } from './utils/index'
import fs from 'fs'
import path from 'path'
import { defaultUserConfig } from './default'

const loadSource = async (
  source: string | SwaggerJson
): Promise<SwaggerJson> => {
  if (!source) {
    throw '没有配置source'
  }

  if (isObject(source)) {
    return source
  }

  if (isString(source) && isUrl(source)) {
    return axios
      .get<SwaggerJson>(source, {
        responseType: 'json',
      })
      .then(res => res.data)
  }

  return JSON.parse(fs.readFileSync(path.resolve(source), 'utf-8'))
}

export async function swaggerToTs(config: UserConfig) {
  const { source } = config
  const swaggerJson = await loadSource(source)
  await startGenerateCode(swaggerJson, {
    ...defaultUserConfig,
    ...config,
  })
}
