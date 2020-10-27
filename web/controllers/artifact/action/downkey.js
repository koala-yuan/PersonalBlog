const path = require('path')
const { cipher } = require(path.join(global.UTILPATH, 'file'))

/**
  * @api {get} /artifact/file GET_ARTIFACT_FILE
  * @apiName GET_ARTIFACT_FILE
  * @apiGroup Artifact
  *
  * @apiParam {String} path Artifact file path, [In query].
  * @apiParamExample {json} Request-Example:
    {
      "path": "gulp.jpg"
    }
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} data Data result.
  * @apiSuccess {String} data.key Artifact file download key.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {
        "key": "123abcdfe65dc8f"
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/
module.exports = async (ctx) => {
  try {
    const name = ctx.query.path ? decodeURIComponent(ctx.query.path) : undefined
    if (!name) {
      ctx.status = 404
      return
    }
    const key = cipher('ARTIFACT', name)
    ctx.body = { status: '100000', data: { key } }
  } catch (e) {
    throw e
  }
}
