const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'user'))
const { permission } = require(global.MIDDLEWAREPATH)

// get/set uid
router.get('/', permission('GET_USER'), controller.user)

module.exports = router
