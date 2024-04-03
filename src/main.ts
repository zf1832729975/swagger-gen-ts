import { startGenerateCode } from './gen'
import { UserConfig, SwaggerJson } from './types'
import axios from 'axios'
import { isObject, isString, isUrl } from './utils/index'
import fs from 'fs'
import path from 'path'
import { defaultUserConfig } from './default'

const loadSource = async (source: string | SwaggerJson): Promise<SwaggerJson> => {
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
  if ('group' in config && config.group) {
    const group = config.group
    if (group.length) {
      for (let i = 0; i < group.length; i++) {
        const childConfig = group[i]
        await swaggerToTs({
          ...config,
          group: undefined,
          ...childConfig,
          include: [...(config.include || []), ...(childConfig.include || [])],
          exclude: [...(config.exclude || []), ...(childConfig.exclude || [])],
          output: path.resolve(config.output, childConfig.output),
        })
      }
      return
    }
  }

  // @ts-ignore
  const { source } = config
  const swaggerJson = await loadSource(source)
  await startGenerateCode(swaggerJson, {
    ...defaultUserConfig,
    ...config,
  })
  return
}
