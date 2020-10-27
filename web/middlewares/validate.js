const config = require('config')
const path = require('path')

const jwt = require(path.join(global.UTILPATH, 'jwt'))
const { ApiErrorNames, ApiError } = require(path.join(global.UTILPATH, 'error'))

const USER = config.get('USER')
const LOGINMODE = config.get('LOGINMODE')
const { SETTINGS } = config.get('CLUSTER')
const { BDOS_DOMAIN } = config.get('CROSS')

const filters = {
  GET: [
    /^\/favicon\.ico/gi,
    /^\/static\/?.*/gi,
    /\/api\/auth\/type/gi,
    /\/api\/oidc/gi
  ],
  POST: [],
  DELETE: [],
  PUT: []
}

module.exports = async (ctx, next) => {
  try {
    const regexps = filters[ctx.method] || []
    const url = ctx.originalUrl
    let flag = -1

    for (let i = 0; i < regexps.length; i++) {
      if (new RegExp(regexps[i]).test(url)) {
        flag = 1
        break
      }
    }

    if (flag > -1) {
      await next()
    } else {
      if (LOGINMODE === 'auto') {
        ctx.state.user = {
          ...USER,
          groups: ['Admin'],
          isAdmin: true,
          isRoot: true
        }
        ctx.state.exp = Date.now() + 365 * 24 * 3600
        ctx.state.bdos = {
          authType: 'auto',
          bdosDomain: BDOS_DOMAIN
        }
      } else {
        let token = ctx.get('Authorization') || ''
        if (token.startsWith('Bearer ')) {
          token = token.substring(7)
        }

        const tokenDecoded = token ? jwt.decode(token) : {}
        const { user, exp, authType, bdosDomain } = tokenDecoded || {}

        console.log(`Validated user: `, { tokenDecoded })
        if (!user) throw new ApiError(ApiErrorNames.PERMISSION_DENIED, `User authentication faied`)

        ctx.state.user = user
        ctx.state.exp = exp
        ctx.state.bdos = {
          authType,
          bdosDomain
        }
      }

      ctx.state.cluster = {
        settings: SETTINGS
      }

      await next()
    }
  } catch (e) {
    console.log('Auth user error', e)
    ctx.status = 401
  }
}
