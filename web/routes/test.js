const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'test'))
const { permission } = require(global.MIDDLEWAREPATH)

// test api
router.post('/', permission('POST_TEST'), controller.testApi)
router.get('/', permission('GET_TEST'), controller.testListApi)

module.exports = router
