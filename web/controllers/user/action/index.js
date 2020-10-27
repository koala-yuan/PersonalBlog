const path = require('path')
const config = require('config')

const LOGINMODE = config.get('LOGINMODE')

const { webui } = require(path.join(global.UTILPATH, 'backend'))

/**
  * @api {get} /auth GET_USER
  * @apiName GET_USER
  * @apiGroup USER
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
        "uid": "",
        "userName": "",
        "name": "",
        "email": "",
        "ident": "",
        "groups": [],
        "isAdmin": false,
        "isRoot": false
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/
const user = async (ctx, next) => {
  try {
    let data = null

    if (LOGINMODE === 'bdos') {
      const raw = await webui(ctx, { name: 'GET_USER', form: {} }) || {}
      console.log(raw)
      if (raw) {
        const { uid, userName, email, name, ident, groups, isAdmin, isRoot } = raw || []
        data = { uid, userName, email, name, ident, groups, isAdmin, isRoot }
      }
    } else if (LOGINMODE === 'auto') {
      const { user } = ctx.state
      const { uid, userName, email, name, groups, isAdmin, isRoot } = user || {}
      data = uid && userName ? { uid, userName, email, name, groups, isAdmin, isRoot } : null
    }

    ctx.body = { status: '100000', data, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: null, message: { desc: e.message } }
  }
}

module.exports = { user }
