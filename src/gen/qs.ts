// {
//   CommonResponse: '',

//   CommonResponse: {

//   }
// }

// CommonResponse List BaseUserVO
//

// interface UserInfo {
//   id: string
//   name: string
//   sex: Sex
//   other: {
//     avatar: string
//   }
//   isBoolean: boolean
//   age: number
//   roles: Array<'admin' | 'user'>
//   pet?: Pet[]
// }

interface ParsedField {
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

  /**
   * ref的类型
   */
  ref?: string
}

interface ParsedInterface {
  /** 接口名 */
  name: string
  // type Object
  type?: string | string[]
  /** 属性 props */
  props: {
    [key: string]: ParsedField
  }
  /** 数组的 */
  items?: Array<ParsedField>
}

interface SchemaParseResult {}

interface DefinitionsParseResultItem {
  /** 接口名 */
  name: string
  // type Object
  type?: string | string[]
  /** 属性 props */
  props: {
    [key: string]: ParsedField
  }
  /** 数组的 */
  items?: Array<ParsedField>

  // 泛型
  generics?: string[]
}

interface CommonResponse<T> {
  data?: T
  encryptData?: string
}

interface CommonResponse<T> {
  data?: T
  encryptData?: string
}
