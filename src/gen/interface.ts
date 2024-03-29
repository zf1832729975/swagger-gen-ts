import { Schema, SwaggerJson, GenerateConfig, ParameterObject } from '../types'
import { isArray, isObject } from '../utils/index'

function schemaToTsCode(
  schema: Schema,
  swaggerJson: SwaggerJson,
  userConfig: GenerateConfig,
  indent: number = 0
): string {
  if (!schema) {
    return '{}'
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
      return schemaToTsCode(refSchema, swaggerJson, userConfig, indent)
    }
    return
  }

  switch (schema.type) {
    case 'object':
      // 空对象
      if (!Object.keys(schema.properties || {}).length) {
        tsType += '{}'
        break
      }
      tsType += '{\n'
      for (const key in schema.properties) {
        const prop = schema.properties[key]
        if (prop.description || prop.title) {
          // tsType += ` // ${prop.description}`;
          const split = prop.title && prop.description ? `\n${baseIndent}${indentBlock} * ` : ''
          tsType += `${baseIndent}${indentBlock}/** ${prop.title || ''}${split}${prop.description || ''} */\n`
        }

        const isRequired = isArray(schema.required) ? schema.required.includes(key) : schema.required

        const required = isRequired ? '' : '?'

        tsType += `${baseIndent}${indentBlock}${key}${required}: ${schemaToTsCode(
          prop,
          swaggerJson,
          userConfig,
          indent + 1
        )};`

        tsType += '\n'
      }
      tsType += `${baseIndent}}`
      break

    case 'array':
      if (schema.items) {
        tsType += `Array<${schemaToTsCode(schema.items, swaggerJson, userConfig, indent)}>`
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

  return tsType
}

interface GenInterfaceCode {
  schema: Schema | Array<ParameterObject> | undefined
  swaggerJson: SwaggerJson
  interfaceName: string
  userConfig: GenerateConfig
}

export const genInterfaceCode = ({ schema, swaggerJson, interfaceName, userConfig }: GenInterfaceCode) => {
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
        }
        const type = map[prop.type] || prop.type
        tsType += `${indentBlock}${key}${required}: ${type}`
        return tsType
      })
      .join('\n')
    return `export interface ${interfaceName} {\n${code}\n}`
  }

  const code = schemaToTsCode(schema, swaggerJson, userConfig)
  // 只要不是 { 开头
  if (!code.trimStart().startsWith('{')) {
    return `export type ${interfaceName} = ${code}`
  }
  return `export interface ${interfaceName} ${code}`
}
