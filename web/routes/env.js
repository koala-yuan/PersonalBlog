const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'env'))
const { permission } = require(global.MIDDLEWAREPATH)

// get business flow
router.get('/', permission('GET_ENV'), controller.env)

module.exports = router
