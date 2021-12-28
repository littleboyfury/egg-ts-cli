import { Context } from 'egg'

interface Logger {
  method?: string;
  url?: string;
  body?: string;
  headers?: object;
  status_code?: number;
  host?: string;
  result?: string;
}

export default () => {
  return async function logger(ctx: Context, next) {
    const logger: Logger = {}
    logger.method = ctx.request.method
    logger.body = ctx.request.body
    logger.headers = ctx.request.headers
    logger.host = ctx.request.host

    await next()

    logger.status_code = ctx.status
    logger.result = ctx.body

    // 使用<<>>方便提取
    ctx.logger.info('<<%%j>>', logger)
  }
}
