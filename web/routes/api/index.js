const router = require('koa-router')()
const home = require('./home')
const fs = require('fs')

const routes = fs.readdirSync('routes/')
router.use('/', home.routes(), home.allowedMethods())
routes.forEach((route) => {
  let regex = /\w*.js/i
  if (regex.test(route)) {
    route = route.split('.')[0]
    let mode = require('../' + route)
    router.use('/' + route, mode.routes(), mode.allowedMethods())
  }
})

module.exports = router
