输入

```json
{
  "CommonResponse": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "具体数据"
      },
      "encryptData": {
        "type": "string",
        "description": "加密后的数据"
      },
      "resultCode": {
        "type": "string",
        "description": "响应码"
      }
    },
    "title": "CommonResponse"
  },
  "CommonResponse«List«BaseUserVO»»": {
    "type": "object",
    "properties": {
      "data": {
        "type": "array",
        "description": "具体数据",
        "items": {
          "$ref": "#/definitions/BaseUserVO"
        }
      },
      "encryptData": {
        "type": "string",
        "description": "加密后的数据"
      },
      "resultCode": {
        "type": "string",
        "description": "响应码"
      }
    },
    "title": "CommonResponse«List«BaseUserVO»»"
  },
  "BaseUserVO": {
    "type": "object",
    "properties": {
      "age": {
        "type": "integer",
        "format": "int32",
        "description": "年龄"
      },
      "location": {
        "type": "string",
        "description": "位置"
      }
    },
    "title": "BaseUserVO"
  }
}
```

输出

```ts
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
```
