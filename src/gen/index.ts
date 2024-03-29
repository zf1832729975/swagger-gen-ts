import { SwaggerJson, GenerateConfig, ParameterBody, ParameterObject } from '../types'
import {
  writeFileInMultiLevelDirectorySync,
  getRelativePath,
  deleteFilesInDirectory,
  isObject,
  toUpperCaseCamelCase,
  isEmpty,
} from '../utils/index'
import path from 'path'
import { genInterfaceCode } from './interface'
import { genApiFunctionCode } from './function'
import { parseSwaggerJson } from '../parse/index'
import fs from 'fs'

const INSERT_LINE = '\n\n'

// 两个代码片段拼接
function codeSplicing(...args: string[]): string {
  return args.map(text => text.trim()).join(INSERT_LINE)
}

export const startGenerateCode = (swaggerJson: SwaggerJson, config: GenerateConfig) => {
  const isGenJS = config.lang === 'js'
  const isGenTS = config.lang === 'ts'
  const { requestFilePath = './request' } = config

  const outDir = path.resolve(config.output)
  const apiDir = outDir
  if (config.clean) {
    cleanOutDir(outDir)
  }
  const parseResultList = parseSwaggerJson(swaggerJson, config)

  const map: Record<string, string> = {}

  for (let parseResult of parseResultList) {
    const { requestTypeName, responseTypeName, filePath: _filePath, methodConfig } = parseResult
    const { responses, parameters = [] } = methodConfig

    const filePath = path.resolve(apiDir, _filePath)

    // 请求 ===============
    const query: ParameterObject[] = []
    const body: ParameterBody[] = []
    for (let parameter of parameters) {
      // parameter.$ref
      // TODO: ref 方式的
      if (isObject(parameter) && '$ref' in parameter) {
        continue
      }
      if (parameter.in === 'body') {
        // @ts-ignore TODO
        body.push(parameter)
      }
      // "in": "query"
      // 有 in formData 就不可能两个都有了
      if (parameter.in === 'query' || parameter.in === 'formData') {
        // @ts-ignore TODO
        query.push(parameter)
      }
    }
    let requestTypeCode = ''

    // 两种都有
    let requestQueryTypeName = ''
    if (body.length && query.length) {
      requestQueryTypeName = toUpperCaseCamelCase(parseResult.apiFunctionName + 'RequestByQuery')
      console.log(`注意: 请求参数有body和query`)
      console.log(`${parseResult.url} ${requestTypeName} ${requestQueryTypeName}`)
    }
    parseResult.requestQueryTypeName = requestQueryTypeName

    // post 请求体
    requestTypeCode +=
      INSERT_LINE +
      body
        .map(parameter => {
          return genInterfaceCode({
            schema: parameter.schema,
            swaggerJson,
            interfaceName: requestTypeName,
            userConfig: config,
          })
        })
        .join(INSERT_LINE)

    // get
    if (query.length) {
      // 请求 params
      requestTypeCode +=
        INSERT_LINE +
        genInterfaceCode({
          schema: query,
          swaggerJson,
          interfaceName: requestQueryTypeName || requestTypeName,
          userConfig: config,
        })
    }

    if (isEmpty(query) && isEmpty(body)) {
      // 没有参数
      requestTypeCode +=
        INSERT_LINE +
        genInterfaceCode({
          schema: undefined,
          swaggerJson,
          interfaceName: requestTypeName,
          userConfig: config,
        })
    }

    // 响应 ===============
    const responseTypeCode = genInterfaceCode({
      schema: (responses['200'] as any)?.schema,
      swaggerJson,
      interfaceName: responseTypeName,
      userConfig: config,
    })

    const interfaceCode = codeSplicing(requestTypeCode, responseTypeCode)

    const reP = getRelativePath(filePath, requestFilePath)
    // 没有./的时候需要添加
    const relativePath = /^[A-Za-z]/.test(reP) ? './' + reP : reP

    // js
    if (isGenJS) {
      const jsFunctionCode = genApiFunctionCode(parseResult, 'js')
      const typeFunctionCode = genApiFunctionCode(parseResult, 'interface')
      // .d.ts
      const dtsFilePath = filePath + '.d.ts'
      if (!map[dtsFilePath]) {
        map[dtsFilePath] = getHeadInterfaceCode(relativePath)
      }
      map[dtsFilePath] = codeSplicing(map[dtsFilePath], interfaceCode, typeFunctionCode)

      const jsFilePath = filePath + '.js'
      if (!map[jsFilePath]) {
        map[jsFilePath] = getHeadJsCode(relativePath)
      }
      map[jsFilePath] = codeSplicing(map[jsFilePath], jsFunctionCode)
    }
    // ts
    else if (isGenTS) {
      const tsFunctionCode = genApiFunctionCode(parseResult, 'ts')
      const tsFilePath = filePath + '.ts'
      if (!map[tsFilePath]) {
        map[tsFilePath] = getHeadInterfaceCode(relativePath)
      }
      const insetCode = codeSplicing(interfaceCode, tsFunctionCode)
      map[tsFilePath] = codeSplicing(map[tsFilePath], insetCode)
    }
  }

  const writePath = requestFilePath.includes('.ts') ? requestFilePath : requestFilePath + '.ts'

  if (!fs.existsSync(writePath)) {
    writeFileInMultiLevelDirectorySync(
      path.resolve(writePath),
      fs.readFileSync(path.resolve(__dirname, '../template/request.d.ts'))
    )
  }

  console.log('\n写入文件:')
  for (let [path, content] of Object.entries(map)) {
    console.log(path)
    writeFileInMultiLevelDirectorySync(path, content.trim() + '\n')
  }
  console.log()
}

// const noCheckComment = `/* eslint-disable */\n// @ts-nocheck`
const noCheckComment = ''

export const getHeadInterfaceCode = (importPath: string) => {
  const comment = noCheckComment
  return `${comment}\n\nimport request, { RequestOptions } from '${importPath}'\n`
}

export const getHeadJsCode = (importPath: string) => {
  const comment = noCheckComment
  return `${comment}\n\nimport request from '${importPath}'\n`
}

// 清空
export const cleanOutDir = (deletePath: string) => {
  const cwd = process.cwd()
  // 能删除
  if (deletePath == cwd) {
    throw new Error('和工作目录相同不能删除')
  }
  if (deletePath.startsWith(cwd) && cwd !== deletePath) {
    deleteFilesInDirectory(deletePath)
  } else {
    throw new Error('不能删除要删除的目录必须是当前目录的子目录')
  }
}
