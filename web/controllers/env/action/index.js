const { ENV } = require(global.CONSTANTPATH)

/**
  * @api {get} /env GET_ENV
  * @apiName GET_ENV
  * @apiGroup Env
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

module.exports = async (ctx, next) => {
  try {
    const { user, cluster } = ctx.state

    ctx.body = { status: '100000', data: { user, cluster, ENV }, message: { desc: 'Success' } }
  } catch (e) {
    console.log(e)
    ctx.body = { status: '200000', data: {}, message: { desc: e.message } }
  }
}
