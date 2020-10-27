const path = require('path')
const axios = require('axios')
const config = require('config')

const jwt = require(path.join(global.UTILPATH, 'jwt'))
const Fetch = require(path.join(global.UTILPATH, 'fetch'))
const { ApiErrorNames, ApiError } = require(path.join(global.UTILPATH, 'error'))
const { BACKEND = {}, WEBUI = {} } = require(global.CONSTANTPATH)

const backend = async (ctx, options) => {
  const { user } = ctx.state || {}
  const Authorization = jwt.encode(user, config.get('BACKEND').SECRET)
  const headers = { Authorization }

  try {
    const { name, params, form } = options || {}
    if (!name) throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, `The API name cannot be empty`)

    const API_FUNC = BACKEND[name]
    if (typeof API_FUNC !== 'function') throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, `The API ${name} does not exist`)

    const fetch = new Fetch(ctx, { headers })

    const { method, path } = API_FUNC(params)
    console.log(`Request backend api: `, { method, path, form })

    const rsp = await fetch[method](path, form) || {}
    console.log(`Backend api ${method} ${path} response: `, JSON.stringify(rsp))
    if (rsp.status !== 200) throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, rsp && rsp.message)

    return rsp.data
  } catch (e) {
    const errorStr = JSON.stringify(e)
    console.log(errorStr)
    throw e
  }
}

const webui = async (ctx, options) => {
  const { user, authType } = ctx.state || {}
  const { uid } = user || {}
  const Authorization = jwt.encode({ uid, authType }, config.get('CROSS').SECRET)
  const headers = {
    Authorization,
    'X-Special-Proxy-Header': config.get('CROSS').XHeader
  }

  try {
    const { name, params, form } = options || {}
    if (!name) throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, `The API name cannot be empty`)

    const API_FUNC = WEBUI[name]
    if (typeof API_FUNC !== 'function') throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, `The API ${name} does not exist`)

    const fetch = new Fetch(ctx, { headers, auth: true })

    const { method, path } = API_FUNC(params)
    console.log(`Request backend api: `, { method, path, form })

    const rsp = await fetch[method](path, form) || {}
    console.log(`WebUI api ${method} ${path} response: `, JSON.stringify(rsp))
    if (rsp.status !== '100000') throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, rsp && rsp.message && rsp.message.desc)

    return rsp.data
  } catch (e) {
    const errorStr = JSON.stringify(e)
    console.log(errorStr)
    throw e
  }
}

const test = async (options) => {
  try {
    const { url, data, method = 'get' } = options || {}
    if (!url) throw new ApiError(ApiErrorNames.INTERNAL_CALL_ERROR, `The API url cannot be empty`)

    const resource = {
      method,
      url
    }

    if (method === 'get') {
      resource.params = data
    } else {
      resource.data = data
    }

    const rsp = await axios(resource).then(rsp => rsp.data || {})
    console.log(`Test backend api ${method} ${url} with`, data, `, response status: `, rsp.status)

    return rsp
  } catch (e) {
    const errorStr = JSON.stringify(e)
    console.log(errorStr)
    return e
  }
}

module.exports = { backend, webui, test }
