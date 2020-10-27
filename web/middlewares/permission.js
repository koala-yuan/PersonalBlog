module.exports = (APIName) => {
  return async (ctx, next) => {
    const url = ctx.originalUrl
    const { query, body } = ctx.request
    const { reqData } = body || {}

    console.log(`Fetching api: ${APIName}:`, { url, query, reqData })

    await next()
  }
}
