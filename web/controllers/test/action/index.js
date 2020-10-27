const path = require('path')
const { test } = require(path.join(global.UTILPATH, 'backend'))
const { getList } = require('./mock')

/**
  * @api {post} /test POST_TEST
  * @apiName POST_TEST
  * @apiGroup Test
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {
      "url": "//127.0.0.1/test/api",
      "params": {}
    }
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

const testApi = async (ctx, next) => {
  const start = Date.now()
  try {
    const { url, data, method } = ctx.request.body

    const result = await test({ url, data, method })

    ctx.body = { status: '100000', data: result, duration: Date.now() - start, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, duration: Date.now() - start, message: { desc: e.message } }
  }
}


/**
  * @api {get} /test GET_TEST
  * @apiName GET_TEST
  * @apiGroup Test
  *
  * @apiParam {String} stream Test file stream.
  * @apiParamExample {json} Request-Example:
    {
      "url": "//127.0.0.1/test/api",
      "params": {}
    }
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

const testListApi = async (ctx, next) => {
  const start = Date.now()
  try {
    const { order = '', sort = '', offset = '0', limit = '10', query = '{}' } = ctx.request.query
    const queryObj = {
      order,
      sort,
      offset: parseInt(offset),
      limit: parseInt(limit),
      query: JSON.parse(query)
    }
    const { list, pagination } = getList(queryObj)
    ctx.body = { status: '100000', data: { list, pagination }, duration: Date.now() - start, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, duration: Date.now() - start, message: { desc: e.message } }
  }
}

module.exports = { testApi, testListApi }
