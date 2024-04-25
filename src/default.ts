import { GenerateConfig } from './types'
import { snakeToCamel, toUpperCaseCamelCase } from './utils'

export const defaultUserConfig: GenerateConfig = {
  source: '', // url 或者 json，本地path
  output: './src/apis', // 输出目录
  lang: 'ts', // 输出模板、ts | js
  include: [], // 包含哪些接口
  exclude: [], // 排除哪些接口
  requestFilePath: './src/request',

  indent: '\t', // 缩进
  clean: false, // 是否清空目录
  maxFolderDepth: 1, // 生成的文件目录层级最多少层
  apiFunctionContainFileName: false, // 生成的api函数名包含文件名
  apiFunctionNameMaxDepth: 5, // 函数名最大深度、默认生成的函数名是通过url来生成的，那么URL很长时截取多少位的合理值
  generateNameUrlReplace: url => url, // 生成函数替换的url

  // 生成的文件目录
  // ${outDir}目录到文件的路径，不含文件后缀名  a/b => `${outDir}/a/b`
  generateFilePath(url, options) {
    // 处理路径参数 `/pet/{id}` => `/pet/${id}`
    url = url.replace(/{(.*?)}/g, '$1')

    const names = options.config.generateNameUrlReplace(url).split('/').filter(Boolean)
    // 最后一级不要
    if (names.length > 1) {
      names.pop()
    }
    // 最大层级 maxFileDepth = 3
    // /a => a
    // /a/a1 => a
    // /a/a1/a2 => a/a1
    // /a/a1/a2/a3/a4 => a/a1/a2
    // /a/a1/a2/a3/a4/a5 => a/a1/a2
    return names.slice(0, options.maxFolderDepth).join('/')
  },
  // 生成
  generateApiName(url, options) {
    // 处理路径参数 `/pet/{id}` => `/pet/${id}`
    url = url.replace(/{(.*?)}/g, '$1')

    const { apiFunctionContainFileName, apiFunctionNameMaxDepth } = options.config
    const urlNames = options.config.generateNameUrlReplace(url).split('/').filter(Boolean)
    const urlLength = urlNames.length
    const maxFolderDepth =
      options.maxFolderDepth <= 0 && !options.config.apiFunctionContainFileName ? 1 : options.maxFolderDepth
    // maxFolderDepth 1   urlLength = 4
    // /order-center/sender/order/detail [order-center, sender, order, detail]
    // order-center.ts  =>  orderCenterSenderOrderDetail
    // apiName slice(0, )  => 截 4 => 4 + 1 - 1

    // maxFolderDepth = 2
    // /order-center/sender.ts  => senderOorderDetail
    // apiName slice(1, )  => 截 3  => 4 + 1  - 2

    // maxFolderDepth = 3
    // /order-center/sender/order.ts  => orderDetail
    // apiName slice(2, ) =>  截 2   urlLength + 1 - maxFolderDepth

    // apiName slice(-)

    // ❎
    // maxFolderDepth = 4
    // /order-center/sender/order.ts  => orderDetail
    // apiName  slice(2, )

    // 结合: 推断，apiName 最少两个数组
    // apiName

    const minApiNameLevel = apiFunctionContainFileName ? 2 : 1

    let apiNameLength = urlLength + (apiFunctionContainFileName ? 1 : 0) - maxFolderDepth
    if (apiNameLength < minApiNameLevel) {
      apiNameLength = minApiNameLevel
    } else if (apiNameLength > apiFunctionNameMaxDepth) {
      apiNameLength = apiFunctionNameMaxDepth
    }
    // 要截多少位
    const apiNames = urlNames.slice(0 - apiNameLength)

    const suffix = options.isRepeatUrl ? toUpperCaseCamelCase(options.method) : ''

    return snakeToCamel(apiNames.join('-')) + suffix
  },
}
