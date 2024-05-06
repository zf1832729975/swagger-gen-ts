import { Schema, SwaggerJson, GenerateConfig, ParameterObject } from '../types'
import { isArray, isObject, isString } from '../utils/index'

const defaultMap = {
  string: '',
  number: 0,
  integer: 0,
  boolean: false,
  null: null,
}

type ReturnResult = {
  code: string
  defaultValue?: Object | string
  isRef?: boolean
  genericKeys?: string[]
}

const AlternateGenericKey = ['T', 'U', 'P', 'V']

interface GenerateOptions {
  indent?: number
  isDefinition?: boolean
  genericKeys?: string[]
}

export const addGenericKey = (arr: string[]) => {
  const key = AlternateGenericKey[arr.length]
  arr.push(key)
  return key
}

function schemaToTsCode(
  schema: Schema,
  swaggerJson: SwaggerJson,
  userConfig: GenerateConfig,
  options?: GenerateOptions
): ReturnResult {
  options = {
    indent: 0,
    isDefinition: false,
    genericKeys: [],
    ...options,
  }
  const { indent = 0, isDefinition, genericKeys = [] } = options
  if (!schema) {
    return {
      code: '{}',
      defaultValue: '',
      genericKeys: genericKeys,
    }
  }
  let tsType = ''
  const {} = userConfig
  const indentBlock = userConfig.indent || '  '
  const baseIndent = indentBlock.repeat(indent)

  // CommonResponse«List«BaseUserVO»»
  if (isObject(schema) && '$ref' in schema) {
    const refName = schema.$ref.split('/').pop() || ''
    const typeName = refName
      .replace(/«/g, '<')
      .replace(/»/g, '>')
      .replace('<List<', '<Array<')
      .replace(/^List</, 'Array<')

    const name = refNameToArray(refName)[0]
    const definitionsMap = getDefinitionsMap(swaggerJson)
    // let genericKey = ''
    // if (isDefinition) {
    //   genericKey = addGenericKey(genericKeys)
    // }
    return {
      isRef: true,
      genericKeys,
      code: isDefinition ? addGenericKey(genericKeys) : `types.${typeName}`,
      defaultValue: definitionsMap[name]?.defaultValue,
    }
  }

  let defaultValue = defaultMap[isArray(schema.type) ? schema.type[0] : schema.type]
  if (schema.enum) {
    return {
      code: schema.enum.map(text => (isString(text) ? `"${text}"` : String(text))).join(' | '),
      defaultValue,
      genericKeys: genericKeys,
    }
  }
  // schema.enum
  switch (schema.type) {
    case 'object':
      // 空对象
      if (!Object.keys(schema.properties || {}).length) {
        tsType += '{}'
        break
      }
      tsType += '{\n'
      defaultValue = {}
      for (const key in schema.properties) {
        const prop = schema.properties[key]
        if (prop.description || prop.title) {
          // tsType += ` // ${prop.description}`;
          const split = prop.title && prop.description ? `\n${baseIndent}${indentBlock} * ` : ''
          tsType += `${baseIndent}${indentBlock}/** ${prop.title || ''}${split}${prop.description || ''} */\n`
        }

        const isRequired = isArray(schema.required) ? schema.required.includes(key) : schema.required

        const required = isRequired ? '' : '?'
        const result = schemaToTsCode(prop, swaggerJson, userConfig, { ...options, indent: options.indent + 1 })
        defaultValue[key] = result.defaultValue
        tsType += `${baseIndent}${indentBlock}${key}${required}: ${result.code};`

        tsType += '\n'
      }
      tsType += `${baseIndent}}`
      break

    case 'array':
      defaultValue = []
      if (schema.items) {
        const result = schemaToTsCode(schema.items, swaggerJson, userConfig, options)
        defaultValue.push(result.defaultValue)
        tsType += `Array<${result.code}>`
      } else {
        tsType += 'Array<any>'
      }
      break

    case 'string':
      tsType += 'string'
      break

    case 'integer':
    case 'number':
      tsType += 'number'
      break

    case 'boolean':
      tsType += 'boolean'
      break

    case 'null':
      tsType += 'null'
      break

    default:
      tsType += 'any'
      break
  }

  return {
    code: tsType,
    defaultValue,
    genericKeys: genericKeys,
  }
}

function refNameToArray(refName: string) {
  refName = refName.split('/').pop() || ''
  return refName.split(/[«»]/).filter(Boolean)
}

let allDefinitionsMap = new Map<SwaggerJson, Record<string, ReturnResult>>()
const getDefinitionsMap = (swaggerJson: SwaggerJson) => {
  if (!allDefinitionsMap.has(swaggerJson)) {
    allDefinitionsMap.set(swaggerJson, {})
  }
  return allDefinitionsMap.get(swaggerJson)
}

// const

// 优先调用
export function definitionsGenCode(swaggerJson: SwaggerJson, userConfig: GenerateConfig) {
  const { definitions } = swaggerJson
  const result = Object.keys(definitions || {})
    .map(key => {
      const schema = definitions[key]
      const typeNames = refNameToArray(key)
      let genericsKeys = typeNames.length > 1 ? typeNames.slice(1) : undefined
      return {
        typeName: typeNames[0],
        typeNames,
        schema,
        length: typeNames.length,
        genericsKeys,
      }
    })
    .sort((a, b) => {
      // 大的在前面
      return b.length - a.length
    })

  const definitionsMap = getDefinitionsMap(swaggerJson)
  // 存在泛型
  const genResult = result.map(item => {
    // 存在就不解析了
    if (definitionsMap[item.typeName]) {
      return undefined
    }
    const parseResult = schemaToTsCode(item.schema, swaggerJson, userConfig, {
      indent: 0,
      isDefinition: true,
      genericsKeys: item.genericsKeys,
    })

    let genericCode = ''
    if (parseResult.genericKeys?.length) {
      genericCode = `<${parseResult.genericKeys.join(', ')}>`
    }

    definitionsMap[item.typeName] = parseResult
    return {
      code: `export interface ${item.typeName}${genericCode} ${parseResult.code}`,
      defaultValue: parseResult.defaultValue,
    }
  })
  return {
    genResult,
    code: genResult
      .filter(Boolean)
      .map(item => item.code)
      .join('\n'),
  }
}

interface GenInterfaceCode {
  schema: Schema | Array<ParameterObject> | undefined
  swaggerJson: SwaggerJson
  interfaceName: string
  userConfig: GenerateConfig
}

export const genInterfaceCode = ({
  schema,
  swaggerJson,
  interfaceName,
  userConfig,
}: GenInterfaceCode): ReturnResult => {
  // params
  if (isArray(schema)) {
    const indentBlock = userConfig.indent || '\t'

    let code = schema
      .map(prop => {
        let tsType = ''
        const required = prop.required ? '' : '?'
        const key = prop.name
        if (prop.description) {
          // tsType += ` // ${prop.description}`;
          const split = prop.title && prop.description ? `\n${indentBlock} * ` : ''
          tsType += `${indentBlock}/** ${prop.title || ''}${split}${prop.description || ''} */\n`
        }
        const map = {
          integer: 'number',
          file: 'File',
          array: 'Array<any>',
        }

        const type = map[prop.type] || prop.type
        tsType += `${indentBlock}${key}${required}: ${type}`
        return tsType
      })
      .join('\n')
    return {
      code: `export interface ${interfaceName} {\n${code}\n}`,
      defaultValue: undefined,
    }
  }

  const { code, defaultValue } = schemaToTsCode(schema, swaggerJson, userConfig)

  // 只要不是 { 开头
  if (!code.trimStart().startsWith('{')) {
    return {
      code: `export type ${interfaceName} = ${code}`,
      defaultValue,
    }
  }
  return {
    code: `export interface ${interfaceName} ${code}`,
    defaultValue,
  }
}

interface CommonResponse {
  data?: object
  /** 加密后的数据 */
  encryptData?: string
  /** 响应码 */
  resultCode?: string
}
interface CommonResponse<T = object> {
  data?: T
  /** 加密后的数据 */
  encryptData?: string
  /** 响应码 */
  resultCode?: string
}

interface BaseUserVO {
  /** 年龄 */
  age?: number
  /** 位置 */
  location?: string
}

type Res = CommonResponse<number>

const obk: Res = {
  data: [],
}
