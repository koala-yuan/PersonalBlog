// const path = require('path')
// const { ApiErrorNames, ApiError } = require(path.join(global.UTILPATH, 'error'))

// const filters = {
//   GET: ['/api/auth/type', '/api/file', '/api/oidc'],
//   POST: ['/api/auth/login', '/api/auth/ldap/login', '/api/auth/logout', '/api/users/reset'],
//   DELETE: [],
//   PUT: []
// }

// const USERNAME = 'dcos'

module.exports = async (ctx, next) => {
  // const urls = filters[ctx.method] || []
  // let url = ''
  // let flag = 1
  // if (!ctx.query.path) {
  //   url = ctx.url.split('?')[0]
  //   flag = urls.indexOf(url)
  // }
  try {
    // if (!USERNAME && flag < 0) throw new ApiError(ApiErrorNames.PERMISSION_DENIED)
    await next()
  } catch (e) {
    throw e
  }
}
