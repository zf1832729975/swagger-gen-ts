const { swaggerToTs } = require('./dist/main')

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
      generateNameUrlReplace: url => url.replace('/c-', '/')
    },
    {
      output: 'yunyuntong',
      group: [
        {
          output: '3.0/order-center',
          source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=520&status=all&isWiki=false&token=5806f9230cd1129ead1f795c38fec80cbab7f1df7d9fde84d95ca94a109faa30',
        },
        {
          output: '3.0/customer',
          source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=529&status=all&isWiki=false&token=a5576aaaf3ce8491f6c689dbadfa11fa54cec0638286db15315001d90c648597',
        },
        {
          output: '2.0/finance-center',
          source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=70&status=all&isWiki=false&token=a5576aaaf3ce8491f6c689dbadfa11fa54cec0638286db15315001d90c648597',
        },
        {
          output: '2.0/order-center',
          source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=67&status=all&isWiki=false&token=a5576aaaf3ce8491f6c689dbadfa11fa54cec0638286db15315001d90c648597',
        },
        {
          output: '1.0/order-center',
          source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=6&status=all&isWiki=false&token=d92f36ba1999094d5e32ef6fadf3c5e0e90dbf56b7e235dbe10228582800d4ef',
        },
      ],
     
    },
    {
      output: 'swaggerV2',
      source: './test/swagger.v2.json',
    },
    {
      output: 'hyxt',
      source: 'https://api.zaitugongda.com/api/plugin/exportSwagger?type=OpenAPIV2&pid=585&status=all&isWiki=false&token=eec2c321ff39eaa444266640518671ed660596d020f50edcdebcf31c3113dab8'
    }
  ],
})
