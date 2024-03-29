import { SwaggerJson, GenerateConfig, ParseResult, OperationObject, Method, ParseResultFull, ApiRegExp } from '../types'
import { toUpperCaseCamelCase, isObject, isString, isRegExp, normalizeUrl, isFunction } from '../utils/index'

const checkoutSwaggerJson = (swaggerJson: SwaggerJson) => {
  if (isObject(swaggerJson) && swaggerJson.swagger) {
    return
  }
  console.log('swagger 类型', typeof swaggerJson)
  throw new Error('swagger.json格式错误')
}

export const parseSwaggerJson = (swaggerJson: SwaggerJson, userConfig: GenerateConfig) => {
  const { include = [], exclude = [], generateApiName, generateFilePath } = userConfig

  checkoutSwaggerJson(swaggerJson)

  let parseResultList: ParseResultFull[] = []
  for (let [path, pathItem] of Object.entries(swaggerJson.paths)) {
    if ('$ref' in pathItem) {
      continue
    }

    const pathItemConfig = pathItem as { [method: string]: OperationObject }

    const isRepeatUrl = Object.keys(pathItemConfig).length > 1
    for (let [method, methodConfig] of Object.entries(pathItemConfig)) {
      if (typeof methodConfig === 'string') {
        continue
      }
      if ('$ref' in methodConfig) {
        // TODO:
        continue
      }

      const basePath = swaggerJson.basePath
      const url = normalizeUrl(`/${basePath || ''}/${path}`)

      const parseResult: ParseResult = {
        swaggerJson,
        methodConfig,
        url,
        path,
        basePath,
        method: method.toLowerCase() as Method,
        tagName: methodConfig.tags[0],
        tags: methodConfig.tags,
        isRepeatUrl,
        config: userConfig,
        maxFolderDepth: userConfig.maxFolderDepth,
        title: methodConfig.summary,
        description: methodConfig.description,
      }

      // 存在
      if (include.length) {
        const exist = checkApiExist(include, url)
        if (!exist) {
          continue
        }
      }
      // 排除
      if (exclude.length) {
        const exist = checkApiExist(exclude, url)
        if (exist) {
          continue
        }
      }

      // TODO: 先生成还是先排除，

      // 生成文件路径
      const filePath = generateFilePath(url, parseResult)
      const apiFunctionName = transformApiFunctionName(generateApiName(url, parseResult))

      const result: ParseResultFull = {
        ...parseResult,
        filePath,
        apiFunctionName,
        requestTypeName: toUpperCaseCamelCase(`${apiFunctionName}Request`),
        responseTypeName: toUpperCaseCamelCase(`${apiFunctionName}Response`),
      }

      parseResultList.push(result)
    }
  }

  return parseResultList
}

function checkApiExist(include: ApiRegExp[], url: string) {
  return include.some(reg => {
    if (isString(reg)) {
      return url === reg
    }
    if (isRegExp(reg)) {
      return reg.test(url)
    }
    if (isFunction(reg)) {
      return reg(url)
    }
    return false
  })
}

function transformApiFunctionName(apiFunctionName: string) {
  // 如果以数字开头
  if (/^\d+/.test(apiFunctionName)) {
    return `fetch${apiFunctionName}`
  }
  return apiFunctionName
}
