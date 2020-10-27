const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'auth'))
const { permission } = require(global.MIDDLEWAREPATH)

// get auth token
router.get('/token', permission('GET_AUTH_TOKEN'), controller.authToken)

// get auth type
router.get('/type', permission('GET_AUTH_TYPE'), controller.authType)

// logout
router.post('/logout', permission('POST_AUTH_LOGOUT'), controller.logout)

module.exports = router
