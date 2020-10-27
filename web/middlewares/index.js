// auto middlewares
const validate = require('./validate')
const timeout = require('./timeout')
const interceptor = require('./interceptor')
const permission = require('./permission')

module.exports = {
  validate,
  interceptor,
  permission,
  timeout
}
