const moment = require('moment')
const config = require('config')
const router = require('koa-router')()
const jwt = require(global.UTILPATH + '/jwt')
const { permission } = require(global.MIDDLEWAREPATH)

// getOidcToken
router.get('/', permission('GET_OIDC'), async (ctx, next) => {
  try {
    const { token } = ctx.query

    const { user, authType, bdosDomain } = token ? jwt.decode(token, config.get('CROSS').SECRET) : {}

    const payload = { user, authType, bdosDomain, exp: moment().add(7, 'days').unix() }

    const tk = jwt.encode(payload)
    console.log('login payload: ', { payload, tk })

    ctx.redirect(`/#/auth?token=${tk}`)
  } catch (e) {
    console.log('error ', JSON.stringify(e))
    throw e
  }
})

module.exports = router
