const { swaggerToTs } = require('./dist/main')
// const { generate } = require('openapi-typescript-codegen')

swaggerToTs({
  output: './apis',
  clean: true,
  maxFolderDepth: 1,
  requestFilePath: './apis/request',
  lang: 'js',
  apiFunctionContainFileName: false,
  group: [
    // {
    //   output: 'weyqu',
    //   source: 'http://www.weyqu.com/api/v2/api-docs',
    //   maxFolderDepth: 0,
    //   generateNameUrlReplace: url => url.replace('/c-', '/'),
    // },
    // {
    //   output: 'yunyuntong',
    //   group: [
    //     {
    //       output: '3.0/order-center',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=520&status=all&isWiki=false&token=5806f9230cd1129ead1f795c38fec80cbab7f1df7d9fde84d95ca94a109faa30',
    //     },
    //     {
    //       output: '3.0/customer',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=529&status=all&isWiki=false&token=a5576aaaf3ce8491f6c689dbadfa11fa54cec0638286db15315001d90c648597',
    //     },
    //     {
    //       output: '2.0/finance-center',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=70&status=all&isWiki=false&token=50e6d5dca36cc27a84d7e9fa84f33cdfb08018a29106ec7918f6d8eeba61a857',
    //     },
    //     {
    //       output: '2.0/basefunc',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=62&status=all&isWiki=false&token=20459cba45138a0b84cd989aa3fb61312e56edc8e37ea677e869b9cfb8038bf2',
    //     },
    //     {
    //       output: '2.0/order-center',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=67&status=all&isWiki=false&token=fae8db9cd092f28bc905a630a77c8b7de2fb90970f76d9a4c255e01b81fe257a',
    //     },
    //     {
    //       output: '1.0/order-center',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=6&status=all&isWiki=false&token=d92f36ba1999094d5e32ef6fadf3c5e0e90dbf56b7e235dbe10228582800d4ef',
    //     },
    //     {
    //       output: 'auth',
    //       source:
    //         'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=5283&status=all&isWiki=false&token=2925d424f041867e8401e742dccaed56bd7e3c0014a82bd897161d5e330ec584',
    //     },
    //   ],
    // },
    {
      output: 'swaggerV2',
      source: './test/swagger.v2.json',
    },
    {
      output: 'swagger-doc',
      source: './source/swagger.json',
      generateNameUrlReplace: url => url.replace('/c-', '/'),
    },
    {
      output: 'apipost',
      source: './test/apipost.json',
      generateNameUrlReplace: url => url.replace('/c-', '/'),
    },
    // {
    //   output: 'hyxt',
    //   source:
    //     'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=585&status=all&isWiki=false&token=eec2c321ff39eaa444266640518671ed660596d020f50edcdebcf31c3113dab8',
    // },
  ],
})

// generate({
//   input: './test/swagger.v2.json',
//   output: './generated/',
// })
// generate({
//   input: './source/order-center-swagger.json',
//   output: './generated/order-center-swagger',
// })
// generate({
//   input: './source/swagger.json',
//   output: './generated/swagger',
// })
