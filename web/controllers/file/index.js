const path = require('path')
const moment = require('moment')

const { ApiErrorNames, ApiError } = require(path.join(global.UTILPATH, 'error'))
const { decipher } = require(path.join(global.UTILPATH, 'file'))

const Artifact = require(path.join(global.UTILPATH, 'artifact'))

module.exports = async (ctx) => {
  try {
    let key = ctx.query.key
    if (!key) {
      ctx.status = 404
      return
    }
    const [type, value, expired] = decipher(key)
    if (moment().unix() >= expired) throw new ApiError(ApiErrorNames.VALIDATION_ERROR, 'Time is expired')
    let stream = null
    let filename = value

    if (type === 'ARTIFACT') {
      const artifact = new Artifact(ctx)
      stream = await artifact.downloadLocal({ filename })
    } else {
      throw new ApiError(ApiErrorNames.FILE_NOT_EXIST)
    }

    ctx.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment;filename=${filename}`
    })

    const PassThrough = require('stream').PassThrough
    ctx.body = stream.on('error', ctx.onerror).pipe(PassThrough())
  } catch (e) {
    ctx.status = 404
    throw e
  }
}
