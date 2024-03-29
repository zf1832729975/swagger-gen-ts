import { ParseResultFull, GenerateConfig } from '../types'
import { isObject } from '../utils'
import { MimeTypes } from '../enum'

// 生成函数

/**
 * 生成多行注释
 * @param content 内容
 */
function genMultilineComment(
  ...rowContents: Array<
    | string
    | {
        show?: boolean
        content?: string | false | number
        meta?: string
      }
  >
): string {
  const content = rowContents
    .map(item => {
      if (isObject(item)) {
        const show = item.show ?? true
        if (!show) {
          return ''
        }
        if (item.content && item.meta) {
          return item.meta + ' ' + item.content
        }
        return item.content || ''
      }
      return item
    })
    .filter(Boolean)
    .join('\n * ')

  return `/**\n * ${content}\n */`
}

function highlightComment(comment: string): string {
  return '`' + comment + '`'
}

function getMimeType(str: string = '') {
  if (str.includes('*')) {
    str = ''
  }
  return str || MimeTypes.Json
}

function genObject(
  list: {
    key?: string
    type?: string
  }[],
  indent: number
) {
  return list.filter(item => {})
}

export function genApiFunctionCode(result: ParseResultFull, genType: 'interface' | 'js' | 'ts' = 'ts') {
  const {
    method: _method,
    apiFunctionName,
    title,
    description,
    requestTypeName,
    responseTypeName,
    requestQueryTypeName,
    url,
    tagName,
    methodConfig,
  } = result

  const method = _method.toLowerCase()
  const paramsKey = method === 'get' ? 'params' : 'data'

  // multipart/form-data application/json
  // MimeTypes
  // consumes 请求内容类型（MIME类型
  // produces 响应内容类型
  const reqMimeType = getMimeType(methodConfig.consumes?.[0])
  const resMimeType = getMimeType(methodConfig.produces?.[0])
  // const isJson = reqMimeType === MimeTypes.ApplicationJson
  // const isFormData = reqMimeType === MimeTypes.MultipartFormData
  // const isUrlencoded = reqMimeType == MimeTypes.ApplicationXWwwFormUrlencoded

  const payloadRequired = requestQueryTypeName ? '' : '?'
  const optionsRequired = requestQueryTypeName ? '' : '?'

  let functionCommon = genMultilineComment(
    {
      meta: highlightComment(tagName),
      content: title,
    },
    {
      meta: '- ' + highlightComment(method.toUpperCase()),
      content: highlightComment(url),
    },
    {
      meta: '- **请求类型**',
      show: reqMimeType !== MimeTypes.Json,
      content: highlightComment(reqMimeType),
    },
    {
      show: reqMimeType == MimeTypes.FormData,
      content:
        '- **注意** 该请求类型是👉🏻 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData) 格式',
    },
    {
      meta: '- 响应类型',
      show: resMimeType !== MimeTypes.Json,
      content: highlightComment(resMimeType),
    },
    { meta: '@description', content: description }
  )

  let headersCode = reqMimeType === MimeTypes.Json ? '' : ` , headers: { 'Content-Type': '${reqMimeType}' }`
  // 实体文件内容
  let entityFunctionCode =
    `return request({ url: \`${url}\`, method: '${method}', ${paramsKey}` +
    `${requestQueryTypeName ? `, params: options.params` : ''}${headersCode} }, options)`

  // 仅仅生成类型
  if (genType == 'interface') {
    return `
${functionCommon}
export function ${apiFunctionName}(
  ${paramsKey}${payloadRequired}: ${requestTypeName},
  options${optionsRequired}: RequestOptions${requestQueryTypeName ? ` & { params: ${requestQueryTypeName} }` : ''}
): Promise<${responseTypeName}>
`.trim()
  }

  // 仅仅实现js代码
  if (genType === 'js') {
    return `
// ${tagName} ${title}
export function ${apiFunctionName}(${paramsKey}, options) {
  ${entityFunctionCode}
}`.trim()
  }

  // 有类型，有实体
  return `
${functionCommon}
export function ${apiFunctionName}(
  ${paramsKey}${payloadRequired}: ${requestTypeName},
  options${optionsRequired}: RequestOptions${requestQueryTypeName ? ` & { params: ${requestQueryTypeName} }` : ''}
): Promise<${responseTypeName}> {
  ${entityFunctionCode}
}`.trim()
}

function getDescription(description: string) {
  description = description.replace(/\\\n(\d)/, '\n * - $1')
  if (description.length > 80) {
    return '\n' + description
  }
  return description
}
