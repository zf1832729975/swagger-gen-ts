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
import { genInterfaceCode, definitionsGenCode } from './interface'
import { genApiFunctionCode } from './function'
import { parseSwaggerJson } from '../parse/index'
import fs from 'fs'

const INSERT_LINE = '\n\n'

// 两个代码片段拼接
function codeSplicing(...args: string[]): string {
  return args.map(text => (text || '').trim()).join(INSERT_LINE)
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

  //
  const swaggerJsonPath = path.resolve(
    apiDir,
    ((apiDir.split('/').pop() || swaggerJson.basePath)?.split('/').shift() || 'by') + '.swagger.json'
  )
  writeFileInMultiLevelDirectorySync(swaggerJsonPath, JSON.stringify(swaggerJson, undefined, 2))

  const parseResultList = parseSwaggerJson(swaggerJson, config)

  const files: Record<
    string,
    {
      code: string
      suffix: '.d.ts' | '.ts' | '.js'
    }
  > = {}

  const defaultJson = {}

  const definitionResult = definitionsGenCode(swaggerJson, config)

  for (let parseResult of parseResultList) {
    const { requestTypeName, responseTypeName, filePath: _filePath, methodConfig, url, apiFunctionName } = parseResult
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
      else if (parameter.in === 'query' || parameter.in === 'formData') {
        // @ts-ignore TODO
        query.push(parameter)
      }
      // in path
      else if (parameter.in === 'path') {
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
          const result = genInterfaceCode({
            schema: parameter.schema,
            swaggerJson,
            interfaceName: requestTypeName,
            userConfig: config,
          })
          defaultJson[`${url} Request`] = result.defaultValue
          return result.code
        })
        .join(INSERT_LINE)

    // get
    if (query.length) {
      const result = genInterfaceCode({
        schema: query,
        swaggerJson,
        interfaceName: requestQueryTypeName || requestTypeName,
        userConfig: config,
      })
      // 请求 params
      requestTypeCode = codeSplicing(requestTypeCode, result.code)
    }

    if (isEmpty(query) && isEmpty(body)) {
      const result = genInterfaceCode({
        schema: undefined,
        swaggerJson,
        interfaceName: requestTypeName,
        userConfig: config,
      })
      // 没有参数
      requestTypeCode = codeSplicing(requestTypeCode, result.code)
    }

    // 响应 ===============
    const responseTypeResult = genInterfaceCode({
      schema: (responses['200'] as any)?.schema,
      swaggerJson,
      interfaceName: responseTypeName,
      userConfig: config,
    })

    defaultJson[`${url} Response`] = responseTypeResult.defaultValue

    const interfaceCode = codeSplicing(requestTypeCode, responseTypeResult.code)

    const reP = getRelativePath(filePath, requestFilePath)
    // 没有./的时候需要添加
    const relativePath = /^[A-Za-z]/.test(reP) ? './' + reP : reP

    // js
    if (isGenJS) {
      const jsFunctionCode = genApiFunctionCode(parseResult, 'js')
      const typeFunctionCode = genApiFunctionCode(parseResult, 'interface')
      // .d.ts
      const dtsFilePath = transformFilePath(filePath, '.d.ts')
      if (!files[dtsFilePath]) {
        files[dtsFilePath] = {
          code: getHeadInterfaceCode(relativePath),
          suffix: '.d.ts',
        }
      }
      files[dtsFilePath] = {
        code: codeSplicing(files[dtsFilePath].code, interfaceCode, typeFunctionCode),
        suffix: '.d.ts',
      }

      const jsFilePath = transformFilePath(filePath, '.js')
      if (!files[jsFilePath]) {
        files[jsFilePath] = {
          code: getHeadJsCode(relativePath),
          suffix: '.js',
        }
      }
      files[jsFilePath] = {
        suffix: '.js',
        code: codeSplicing(files[jsFilePath].code, jsFunctionCode),
      }
    }
    // ts
    else if (isGenTS) {
      const tsFunctionCode = genApiFunctionCode(parseResult, 'ts')
      const tsFilePath = filePath + '.ts'
      if (!files[tsFilePath]) {
        files[tsFilePath] = {
          code: getHeadInterfaceCode(relativePath),
          suffix: '.ts',
        }
      }
      const insetCode = codeSplicing(interfaceCode, tsFunctionCode)
      files[tsFilePath] = {
        code: codeSplicing(files[tsFilePath].code, insetCode),
        suffix: '.ts',
      }
    }
  }

  // 写入 types
  const typingsIndexTs = path.resolve(apiDir, 'typings/index.d.ts')
  if (definitionResult.code) {
    writeFileInMultiLevelDirectorySync(typingsIndexTs, definitionResult.code)
  }

  if (isGenJS) {
    templateWrite(requestFilePath, '.js')
    templateWrite(requestFilePath, '.d.ts')
  } else if (isGenTS) {
    templateWrite(requestFilePath, '.ts')
  }

  console.log('\n写入文件:')
  for (let [path, content] of Object.entries(files)) {
    console.log(path)
    let typingsImport = ''
    if ((definitionResult.code && content.suffix === '.d.ts') || content.suffix == '.ts') {
      const typePath = getRelativePath(path, typingsIndexTs)
      typingsImport = `import * as types from "./${typePath}";\n`
    }
    writeFileInMultiLevelDirectorySync(path, typingsImport + (content.code || '').trim() + '\n')
  }
  console.log(apiDir)
  const testJsonName = (apiDir.split('/').pop() || swaggerJson.basePath?.split('/').shift() || 'default').replace(
    '/',
    ''
  )
  const testJsonPath = path.resolve(apiDir, testJsonName + '.default.test.json')
  console.log(testJsonPath)
  writeFileInMultiLevelDirectorySync(
    testJsonPath,
    JSON.stringify(
      {
        title: '*** 请求的默认值json文件 ***',
        description: '当后端提交字段特别多的时候，就可以直接拷贝，方便映射，知道要提交哪些字段',
        ...defaultJson,
      },
      undefined,
      2
    )
  )
}

const noCheckComment = `/* eslint-disable */\n// @ts-nocheck`
// const noCheckComment = ''

const getHeadInterfaceCode = (importPath: string) => {
  const comment = noCheckComment
  return `${comment}\n\nimport request, { RequestOptions } from '${importPath}'\n`
}

const getHeadJsCode = (importPath: string) => {
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

function transformFilePath(filePath: string, ext?: string) {
  filePath = path.resolve(filePath)
  if (!ext) {
    return filePath
  }
  if (filePath.endsWith(ext)) {
    return filePath
  }
  return filePath + ext
}

// 模板写入
function templateWrite(requestFilePath: string, ext) {
  const filePath = transformFilePath(requestFilePath, ext)
  if (!fs.existsSync(filePath)) {
    let templateContent = fs.readFileSync(path.resolve(__dirname, '../../template/request' + ext))
    writeFileInMultiLevelDirectorySync(filePath, templateContent)
  }
}
