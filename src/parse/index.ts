import { SwaggerJson, GenerateConfig, ParseResult, OperationObject, Method, ParseResultFull, ApiRegExp } from '../types'
import { toUpperCaseCamelCase, isObject, isString, isRegExp, normalizeUrl, isFunction } from '../utils/index'

const checkoutSwaggerJson = (swaggerJson: SwaggerJson) => {
  if (isObject(swaggerJson) && swaggerJson.swagger) {
    return
  }
  throw new Error('swagger.json格式错误')
}

export const parseSwaggerJson = (swaggerJson: SwaggerJson, userConfig: GenerateConfig) => {
  const { include = [], exclude = [], generateApiName, generateFilePath } = userConfig

  try {
    checkoutSwaggerJson(swaggerJson)
  } catch (err) {
    console.log()
    console.log(JSON.stringify(swaggerJson).slice(0, 400))
    console.log(userConfig)
    throw err
  }

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

function isValidFunctionName(name) {
  // 检查是否为空或undefined
  if (name === undefined || name === null || name.trim() === '') {
    return false
  }

  // 使用正则表达式检查格式，允许中文字符、字母、数字、美元符号($)和下划线(_)
  const isValidIdentifier = /^[$\w\u4e00-\u9fa5]+$/
  return isValidIdentifier.test(name)
}

function transformApiFunctionName(apiFunctionName: string) {
  // 如果以数字开头
  if (!isValidFunctionName(apiFunctionName)) {
    return `fetch${apiFunctionName}`
  }
  return apiFunctionName
}
