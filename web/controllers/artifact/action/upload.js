const path = require('path')
const Artifact = require(path.join(global.UTILPATH, 'artifact'))

/**
  * @api {post} /artifact/files POST_ARTIFACT_FILES
  * @apiName POST_ARTIFACT_FILES
  * @apiGroup Artifact
  *
  * @apiParam {String} stream Artifact file stream.
  * @apiParamExample {json} Request-Example:
    {
      "stream": "gulp.jpg"
    }
  *
  * @apiSuccess {String} status Status code.
  * @apiSuccess {Object} data Data result.
  * @apiSuccess {String} data.fileName Artifact file upload file name.
  * @apiSuccess {Object} message Descrpition within status code.
  * @apiSuccess {String} message.desc Detail descrption.
  *
  * @apiSuccessExample {json} Success-Response:
    {
      "status": "100000",
      "data": {
        "stream": "gulp.tgz",
        "filename": "gulp-1.0.tgz"
      },
      "message": {
        "desc": "Success"
      }
    }
  *
*/

const appendTimestamp = (str) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const index = str.lastIndexOf('.')

  if (index !== -1) {
    return `${str.substring(0, index)}_${timestamp}${str.substring(index)}`
  }

  return `${str}_${timestamp}`
}

module.exports = async (ctx) => {
  ctx.req.socket.setKeepAlive(true, 3600000)

  try {
    const artifact = new Artifact(ctx)
    const { fileNames = [] } = await artifact.saveLocal()

    ctx.body = {
      status: '100000',
      data: {
        fileName: fileNames[0]
      }
    }
  } catch (e) {
    console.log(`POST_ARTIFACT_FILES throw an error: `, JSON.stringify(e))
    throw e
  }
}
