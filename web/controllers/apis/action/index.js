const path = require('path')
const { get } = require('lodash')

const { backend } = require(path.join(global.UTILPATH, 'backend'))
const { ApiErrorNames, ApiError } = require(path.join(global.UTILPATH, 'error'))

const getAllApis = async (ctx) => {
  const name = 'GET_GLOBAL_APIS'
  const form = ctx.query

  const data = await backend(ctx, { name, form })
  return data
}

const getSysPaths = async (ctx) => {
  const name = 'GET_GLOBAL_SYS_PATHS'
  const form = ctx.query

  const data = await backend(ctx, { name, form })
  return data
}

/**
  * @api {get} /apis GET_APIS
  * @apiName GET_APIS
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiList = async (ctx, next) => {
  try {
    const name = 'GET_APIS'
    const form = ctx.query

    const data = await backend(ctx, { name, form })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {post} /apis POST_APIS
  * @apiName POST_APIS
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiCreate = async (ctx, next) => {
  try {
    const name = 'POST_APIS'
    const form = ctx.request.body
    const { path } = form || {}

    const paths = await getSysPaths(ctx)
    const pathList = get(paths, 'list') || []
    if (pathList.length) {
      const isIllegal = pathList.some(item => {
        return item === path || path.startsWith(item + '/')
      })
      if (isIllegal) throw new ApiError(ApiErrorNames.PARAMS_ERROR, `The API path ${path} is illegal`)
    }

    const all = await getAllApis(ctx)
    const list = get(all, 'list') || []
    if (list.length) {
      const isExisted = list.some(item => item.path === path)
      if (isExisted) throw new ApiError(ApiErrorNames.PARAMS_ERROR, `The API path ${path} is already existed`)
    }

    const data = await backend(ctx, { name, form })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {get} /apis/:apiId GET_APIS_APIID
  * @apiName GET_APIS_APIID
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiInfo = async (ctx, next) => {
  try {
    const name = 'GET_APIS_APIID'
    const params = ctx.params
    const form = ctx.query

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {get} /apis/:apiId/detail GET_APIS_APIID_DETAIL
  * @apiName GET_APIS_APIID_DETAIL
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiInfoDetail = async (ctx, next) => {
  try {
    const name = 'GET_APIS_APIID_DETAIL'
    const params = ctx.params
    const form = ctx.query

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {patch} /apis/:apiId PATCH_APIS_APIID
  * @apiName PATCH_APIS_APIID
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiUpdate = async (ctx, next) => {
  try {
    const name = 'PATCH_APIS_APIID'
    const params = ctx.params
    const form = ctx.request.body
    const { path } = form || {}

    const paths = await getSysPaths(ctx)
    const pathList = get(paths, 'list') || []
    if (pathList.length) {
      const isIllegal = pathList.some(item => {
        return item === path || path.startsWith(item + '/')
      })
      if (isIllegal) throw new ApiError(ApiErrorNames.PARAMS_ERROR, `The API path ${path} is illegal`)
    }

    const all = await getAllApis(ctx)
    const list = get(all, 'list') || []
    if (list.length) {
      const { apiId } = params || {}

      const isExisted = list.some(item => {
        const bool = item.path === path && ('' + item.id) !== apiId

        if (item.path === path) {
          console.log(item.id, { apiId })
        }

        return bool
      })
      if (isExisted) throw new ApiError(ApiErrorNames.PARAMS_ERROR, `The API path ${path} is already existed`)
    }

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {get} /apis/:apiId/test GET_APIS_APIID_TEST
  * @apiName GET_APIS_APIID_TEST
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiTest = async (ctx, next) => {
  try {
    const name = 'GET_APIS_APIID_TEST'
    const params = ctx.params
    const form = ctx.query

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {post} /apis/:apiId/publish POST_APIS_APIID_PUBLISH
  * @apiName POST_APIS_APIID_PUBLISH
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiPublish = async (ctx, next) => {
  try {
    const name = 'POST_APIS_APIID_PUBLISH'
    const params = ctx.params
    const form = ctx.request.body

    const status = await backend(ctx, { name: 'GET_APIS_APIID_STATUS', form, params })
    console.log(status)
    if (status !== 'testSuccess') throw new ApiError(ApiErrorNames.VALIDATION_ERROR, `The API status is ${status}, so it can't be published`)

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {get} /apis/:apiId/status GET_APIS_APIID_STATUS
  * @apiName GET_APIS_APIID_STATUS
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiStatus = async (ctx, next) => {
  try {
    const name = 'GET_APIS_APIID_STATUS'
    const params = ctx.params
    const form = ctx.query

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {patch} /apis/:apiId/status PATCH_APIS_APIID_STATUS
  * @apiName PATCH_APIS_APIID_STATUS
  * @apiGroup Apis
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {}
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {},
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const apiStatusUpdate = async (ctx, next) => {
  try {
    const name = 'PATCH_APIS_APIID_STATUS'
    const params = ctx.params
    const form = ctx.request.body

    const data = await backend(ctx, { name, form, params })

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

module.exports = { apiList, apiCreate, apiInfo, apiInfoDetail, apiUpdate, apiTest, apiPublish, apiStatus, apiStatusUpdate }
