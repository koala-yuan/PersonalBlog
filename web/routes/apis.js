const router = require('koa-router')()
const path = require('path')
const controller = require(path.join(global.CONTROLLERPATH, 'apis'))
const { permission } = require(global.MIDDLEWAREPATH)

// get user api list
router.get('/', permission('GET_APIS'), controller.apiList)

// create api
router.post('/', permission('POST_APIS'), controller.apiCreate)

// get api info
router.get('/:apiId', permission('GET_APIS_APIID'), controller.apiInfo)

// get api detail info
router.get('/:apiId/detail', permission('GET_APIS_APIID_DETAIL'), controller.apiInfoDetail)

// update api info
router.patch('/:apiId', permission('PATCH_APIS_APIID'), controller.apiUpdate)

// test api
router.get('/:apiId/test', permission('GET_APIS_APIID_TEST'), controller.apiTest)

// publish api
router.post('/:apiId/publish', permission('POST_APIS_APIID_PUBLISH'), controller.apiPublish)

// get api status
router.get('/:apiId/status', permission('GET_APIS_APIID_STATUS'), controller.apiStatus)

// update api status
router.patch('/:apiId/status', permission('PATCH_APIS_APIID_STATUS'), controller.apiStatusUpdate)

module.exports = router
