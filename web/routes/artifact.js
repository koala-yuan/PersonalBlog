const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'artifact'))
const { permission } = require(global.MIDDLEWAREPATH)

// downloadFile
router.get('/file', permission('GET_ARTIFACT_FILE'), controller.artifactDownload)
// uploadFile
router.post('/files', permission('POST_ARTIFACT_FILES'), controller.artifactUpload)

module.exports = router
