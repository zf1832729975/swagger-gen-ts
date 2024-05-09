import { Schema, SwaggerJson, GenerateConfig, ParameterObject } from '../types'
import { isArray, isObject, isString } from '../utils/index'

const defaultMap = {
  string: '',
  number: 0,
  integer: 0,
  boolean: false,
  null: null,
}

type ReturnResult = { code: string; defaultValue?: Object | string }

function schemaToTsCode(
  schema: Schema,
  swaggerJson: SwaggerJson,
  userConfig: GenerateConfig,
  indent: number = 0
): ReturnResult {
  if (!schema) {
    return {
      code: '{}',
      defaultValue: '',
    }
  }
  let tsType = ''
  const {} = userConfig
  const indentBlock = userConfig.indent || '  '
  const baseIndent = indentBlock.repeat(indent)

  const definitions = swaggerJson.definitions

  if (isObject(schema) && '$ref' in schema) {
    const refName = schema.$ref.split('/').pop() || ''
    const refSchema = definitions[refName]
    if (refSchema) {
      // TODO: 循环引用
      return schemaToTsCode(refSchema, swaggerJson, userConfig, indent)
    }
    return
  }

  let defaultValue = defaultMap[isArray(schema.type) ? schema.type[0] : schema.type]
  if (schema.enum) {
    return {
      code: schema.enum.map(text => (isString(text) ? `"${text}"` : String(text))).join(' | '),
      defaultValue,
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
        const result = schemaToTsCode(prop, swaggerJson, userConfig, indent + 1)
        defaultValue[key] = result.defaultValue
        tsType += `${baseIndent}${indentBlock}${key}${required}: ${result.code};`

        tsType += '\n'
      }
      tsType += `${baseIndent}}`
      break

    case 'array':
      defaultValue = []
      if (schema.items) {
        const result = schemaToTsCode(schema.items, swaggerJson, userConfig, indent)
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

  try {
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
  } catch (err) {
    console.error(err)
    return {
      code: `/* 这个生成错误\nerror: ${err} */\nexport type ${interfaceName} = any`,
      defaultValue: '',
    }
  }
}
