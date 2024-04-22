import { Schema, SwaggerJson, GenerateConfig, ParameterObject } from '../types'
import { isArray, isObject } from '../utils/index'
import { OpenAPIV2 } from 'openapi-types'

function parseSchema(schema: Schema, definitions?: OpenAPIV2.DefinitionsObject) {
  function parseDefinitions(ref: string) {
    if (!definitions) {
      throw new Error('没有definitions')
    }
    const refName = getRefName(ref)
    const schemaObject = definitions[refName]
    return parseSchemaObject(schemaObject)
  }

  // CommonResponse«List«BaseUserVO»»
  // CommonResponse<List<BaseUserVO>>
  function getRefName(ref: string) {
    const nameT = ref.split('/').pop().replace(/«/, '<').replace(/»/, '>')
    // return
    // 拿到最里面的
    return nameT.split('<').pop().split('>').shift()
  }

  function parseSchemaObject(schemaObject: OpenAPIV2.SchemaObject) {
    if (schemaObject.$ref) {
      return parseDefinitions(schemaObject.$ref)
    }

    let code = ''
    let parseSchema = {}
    switch (schemaObject.type) {
      case 'object':
        const result = Object.entries(schemaObject.properties).map(([field, chid]) => {
          const parseResult = parseSchemaObject(chid)
          const lineCode = transformField({
            field,
            required: schemaObject.required,
            description: chid.description,
            title: chid.title,
            typeCode: parseResult.code,
          })
          return lineCode
        })

        code = joinRowCode(
          result.map(item => item.code),
          0
        )

        parseSchema = {
          code,
          required: schemaObject.required,
          fields: [],
        }

        return parseSchema

      case 'array':
    }

    return schemaObject
  }
}

function transformField({ field, required, description, title, typeCode }) {
  let comment = [description, title].filter(Boolean).join('  ')
  if (comment) {
    comment = `/** ${description} */`
  }
  required = Boolean(isArray(required) ? required.includes(field) : required)
  return {
    required,
    type: typeCode,
    comment,
    code: `${field}${required ? ': ' : '? '} ${typeCode}`,
  }
}

function joinRowCode(codes: string[], indent: 0) {
  // ['中国', '日本]  \n'中国'\n  日本
  //  index
  //  '日本
  const indentBlock = '  '.repeat(indent)
  return indentBlock + codes.filter(Boolean).join(`${indentBlock}\n`)
}

enum Sex {
  Male = 'male',
  Female = 'female',
}
interface Pet {
  name: string
}

interface UserInfo {
  id: string
  name: string
  sex: Sex
  other: {
    avatar: string
  }
  isBoolean: boolean
  age: number
  roles: Array<'admin' | 'user'>
  pet?: Pet[]
}

// 字段
interface PropDesc {
  /** 字段 */
  field: string
  /** 注释 */
  comment?: string
  /** 是否必填 */
  required?: boolean
  /**
   * 类型
   * string就是可以直接输出的
   */
  type?: string | object | Array<string | object>
}

interface InterfaceDesc {
  /** 接口名 */
  name: string
  // type Object
  type?: string | string[]
  /** 属性 props */
  props: {
    [key: string]: PropDesc
  }
  /** 数组的 */
  items?: InterfaceDesc
}

type InterfaceArray = Array<[]>

const arrayDesc = {
  type: ['array', 'string'],
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
    },
  },
}

const petInterfaceDesc: InterfaceDesc = {
  name: 'Pet',
  props: {
    name: {
      field: 'name',
      comment: '宠物名称',
      required: true,
      type: 'string',
    },
  },
}

const userParsedInterface: InterfaceDesc = {
  name: 'UserInfo',
  type: 'object', // 下面
  props: {
    id: {
      field: 'id',
      comment: '用户id',
      required: true,
      type: 'string',
    },
    name: {
      field: 'name',
      comment: '用户名',
      required: true,
      type: 'string',
    },
    pet: {
      field: 'pet',
      comment: '宠物',
      required: false,
      // type: petInterfaceDesc,
      type: 'array',
      // items: petInterfaceDesc,
    },
  },
}
