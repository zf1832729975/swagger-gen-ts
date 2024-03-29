const toString = Object.prototype.toString

export function isNil(val: unknown): val is null | undefined {
  return val === undefined || val === null
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isUnDef(v: any): v is undefined | null {
  return v === undefined || v === null
}

export function isDef<T>(v: T): v is NonNullable<T> {
  return v !== undefined && v !== null
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isNotEmpty(val: any): boolean {
  return !isNil(val) && !isEmpty(val)
}

/**
 * 是否是空
 * value is (undefined | null | '' | {} | [])
 * @returns { value is (undefined | null | '' | {} | [])}
 * @example
    isEmpty('')  // => true
    isEmpty() // => true
    isEmpty(null) // => true
    isEmpty({}) // => true
    isEmpty([]) // => true
    isEmpty(Date) // => false
    isEmpty(false) // => false
    isEmpty(true) // => false
    isEmpty(()=>{}) // => false
    isEmpty(1) // => false
    isEmpty(0) // => false
 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isNil(val)) {
    return true
  }

  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  )
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  return reg.test(path)
}

export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  return reg.test(path)
}
