import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.TIMEZONE = 'asia/shanghai'

  // TODO X_FORWARDED_TOKEN
  config.X_FORWARDED_TOKEN = '生成一个token'

  // TODO keys后面数字需要修改，改了之后就不能再次修改
  config.keys = appInfo.name + '_1595994970264_5625'
  config.proxy = true
  config.maxIpsCount = 1

  // 中间件
  config.middleware = [ 'logger' ]

  // // mongo 配置
  // config.mongoose = {
  //   url: process.env.MONGODB || 'mongodb://memo:memo@127.0.0.1/memo',
  //   options: {
  //     useFindAndModify: false,
  //   },
  // }
  //
  // // redis 配置
  // config.redis = {
  //   client: {
  //     host: process.env.REDIS_HOST || '127.0.0.1',
  //     port: 6379,
  //     password: process.env.REDIS_PWD || '',
  //     db: 0,
  //   },
  // }

  // config.security = {
  //   csrf: false,
  // }

  // config.validate = {
  //   convert: true,
  // }

  // config.logger = {
  //   disableConsoleAfterReady: false,
  // }

  // config.bodyParser = {
  //   jsonLimit: '20mb',
  //   formLimit: '20mb',
  // }
  //
  // config.multipart = {
  //   mode: 'file',
  //
  //   // 文件类型白名单
  //   fileExtensions: [ '.log' ],
  //   fileSize: '50mb',
  // }
  //
  // config.static = {
  //   prefix: '/api/public',
  //   dir: path.join(appInfo.baseDir, 'app/public'),
  // }

  return config
}
