# swagger-gen-ts

swagger 转 ts 类型

```js
const { swaggerToTs } = require('swagger-gen-ts')

swaggerToTs({
  output: './apis',
  clean: true,
  maxFolderDepth: 0, // 大曾经没有问题
  requestFilePath: './apis/request',
  lang: 'js',
  apiFunctionContainFileName: false,
  group: [
    {
      output: 'weyqu',
      source: 'http://www.weyqu.com/api/v2/api-docs',
      maxFolderDepth: 0,
      generateNameUrlReplace: url => url.replace('/c-', '/'),
    },
    {
      output: 'yunyuntong',
      group: [
        {
          output: '3.0/order-center',
          source:
            'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=520&status=all&isWiki=false&token=5806f9230cd1129ead1f795c38fec80cbab7f1df7d9fde84d95ca94a109faa30',
        },
      ],
    },
    {
      output: 'swaggerV2',
      source: './test/swagger.v2.json',
    },
    {
      output: 'hyxt',
      source:
        'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=585&status=all&isWiki=false&token=eec2c321ff39eaa444266640518671ed660596d020f50edcdebcf31c3113dab8',
    },
  ],
})
```
