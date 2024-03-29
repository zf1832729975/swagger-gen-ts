const { swaggerToTs } = require('./dist/main')

swaggerToTs({
  source: './source/swagger.json', // 大层级
  // source: './source/order-center-swagger.json',
  output: './apis/ex/index',
  lang: 'js',
  requestFilePath: './request',
  // exclude: ['/?'],

  // include: [
  //   function (url) {
  //     return url.startsWith('/base/') || url.startsWith('/order-center/')
  //   },
  // ],
  generateNameUrlReplace: url => {
    return url.replace('/api/', '/')
  },
  clean: true,
  maxFolderDepth: 0, // 大曾经没有问题
  apiFunctionContainFileName: false,
})

swaggerToTs({
  // source: './source/swaggerApi2.json',
  source: './source/swiggerLevelMax.json', // 大层级
  // source: './source/order-center-swagger.json',
  output: './apis/order-center/index',
  lang: 'js',
  requestFilePath: './request',
  // exclude: ['/?'],

  // include: [
  //   function (url) {
  //     return url.startsWith('/base/') || url.startsWith('/order-center/')
  //   },
  // ],
  generateNameUrlReplace: url => {
    return url.replace('/order-center/', '/')
  },
  clean: true,
  maxFolderDepth: 0, // 大曾经没有问题
  apiFunctionContainFileName: false,
})

swaggerToTs({
  // source: './source/swaggerApi2.json',
  source: './source/customer.json', // 大层级
  // source: './source/order-center-swagger.json',
  output: './apis/customer/index',
  lang: 'js',
  requestFilePath: './request',
  // exclude: ['/?'],

  // include: [
  //   function (url) {
  //     return url.startsWith('/base/') || url.startsWith('/order-center/')
  //   },
  // ],
  // generateNameUrlReplace: url => {
  //   return url.replace('/order-center/', '/')
  // },
  clean: true,
  maxFolderDepth: 0, // 大曾经没有问题
  apiFunctionContainFileName: false,
})

// swaggerToTs({
//   source: 'http://www.weyqu.com/api/v2/api-docs',
//   output: './apis/socialize',
//   lang: 'js',
//   requestFilePath: './apis/request',
//   clean: false,
//   maxFolderDepth: 2,

//   generateNameUrlReplace: url => {
//     console.log('url', url)
//     const ret = url.replace('/api/c-', '/').replace('/api/', '/')
//     console.log(ret)
//     return ret
//   },
// })
