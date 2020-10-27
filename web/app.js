const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const convert = require('koa-convert')
const json = require('koa-json')()
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')()
const cors = require('kcors')
const path = require('path')
const favicon = require('koa-favicon')
const serve = require('koa-static')
const compress = require('koa-compress')()

const faviconPath = path.resolve(__dirname, '/doc/img/favicon.ico')

// global variables
global.ROOTPATH = path.join(__dirname, '/')
global.PUBLICHOME = path.join(__dirname, 'public')

global.UTILPATH = path.join(__dirname, 'util')
global.CONTROLLERPATH = path.join(__dirname, 'controllers')
global.MIDDLEWAREPATH = path.join(__dirname, 'middlewares')
global.CONSTANTPATH = path.join(__dirname, 'constant')
global.ARTIFACTPATH = path.join(__dirname, '../artifact', '/')

// env variables
const getEnv = require(path.join(global.UTILPATH, 'env'))

// Directory ENV
global.LOCALMODE = getEnv('LOCALMODE', '0')

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err
  }
})

// auto middlewares
app.use(favicon(faviconPath))
app.use(convert(bodyparser))
app.use(convert(json))
app.use(convert(logger))
app.use(convert(cors({
  'allowHeaders': ['Accept', 'Authorization', 'Content-Type']
})))
app.use(compress)
app.use(serve('public'))

// manual middlewares
try {
  const {
    validate,
    timeout,
    interceptor
  } = require(global.MIDDLEWAREPATH)

  app.use(validate)
  app.use(interceptor)
  app.use(timeout)
} catch (err) {
  console.error(err)
}

// reload routes
const api = require('./routes/api')
const file = require('./routes/file')
router.use('/api', api.routes(), api.allowedMethods())
router.use('/file', file.routes(), file.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error
app.on('error', (err, ctx) => {
  console.error(err)
})

// unhandledRejection
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

module.exports = app
