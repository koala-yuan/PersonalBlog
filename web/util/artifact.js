const path = require('path')
const fs = require('fs')

const { busboy } = require(path.join(global.UTILPATH, 'busboy'))
const { mkdir, download } = require(path.join(global.UTILPATH, 'file'))

function Artifact (ctx) {
  this.ctx = ctx
}

Artifact.prototype.saveLocal = async function () {
  await mkdir(global.ARTIFACTPATH)
  console.log(`UPLOAD ARTIFACT recieve file start`)
  const { fields, fileNames } = await busboy(this.ctx.req, 'http', global.ARTIFACTPATH)
  console.log(`UPLOAD ARTIFACT recieve file end`, { fields, fileNames })
  return { fields, fileNames }
}

Artifact.prototype.downloadLocal = async function ({ filename }) {
  try {
    console.log('filePath...', path.join(global.ARTIFACTPATH, filename))
    return fs.createReadStream(path.join(global.ARTIFACTPATH, filename))
  } catch (e) {
    console.log(`DONWLOAD ARTIFACT failed: `, JSON.stringify(e))
    throw e
  }
}

module.exports = Artifact
