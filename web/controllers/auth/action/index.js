const path = require('path')
const config = require('config')

const LOGINMODE = config.get('LOGINMODE')
const { BDOS_DOMAIN } = config.get('CROSS')

const { webui, backend } = require(path.join(global.UTILPATH, 'backend'))

/**
  * @api {get} /auth/type GET_AUTH_TYPE
  * @apiName GET_AUTH_TYPE
  * @apiGroup Auth
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
      "data": {
        "uid": "xxx-xxxx-xxxx",
        "userName": "dcos"
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const authType = async (ctx, next) => {
  try {
    let data = {}

    if (LOGINMODE === 'bdos') {
      const name = 'GET_AUTH_TYPE'
      const form = ctx.query

      data = await webui(ctx, { name, form }) || {}
      if (!data.list || !data.list.length) {
        data.list = [{ type: 'common', url: BDOS_DOMAIN }]
      }
    } else if (LOGINMODE === 'auto') {
      data.list = [{ type: LOGINMODE, url: BDOS_DOMAIN }]
    }

    data.mode = LOGINMODE

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {get} /auth/token GET_AUTH_TOKEN
  * @apiName GET_AUTH_TOKEN
  * @apiGroup Auth
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
      "data": {
        "uid": "xxx-xxxx-xxxx",
        "userName": "dcos"
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const authToken = async (ctx, next) => {
  try {
    const name = 'GET_LOGIN'
    const form = ctx.query

    const data = await backend(ctx, { name, form }) || {}

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

/**
  * @api {post} /auth/logout POST_AUTH_LOGOUT
  * @apiName POST_AUTH_LOGOUT
  * @apiGroup Auth
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
      "data": {
        "uid": "xxx-xxxx-xxxx",
        "userName": "dcos"
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const logout = async (ctx, next) => {
  try {
    const name = 'POST_AUTH_LOGOUT'
    const form = ctx.request.body

    const data = await webui(ctx, { name, form }) || {}

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}

module.exports = { authType, authToken, logout }
