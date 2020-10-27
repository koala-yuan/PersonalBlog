const router = require('koa-router')()
const path = require('path')
const download = require(path.join(global.CONTROLLERPATH, 'file'))

router.get('/', download)

module.exports = router
