import 'egg';

declare module 'egg' {
  interface Context {
    model: IModel,
    middleware: IMiddleware,
  }

  interface EggAppConfig {
    // TODO 添加配置需要在这里定义类型
    TIMEZONE: string
    X_FORWARDED_TOKEN: string
  }
}
