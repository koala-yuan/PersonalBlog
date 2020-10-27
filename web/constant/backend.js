const config = require('config')
const { PROTOCAL, HOST, PORT, VERSION } = config.get('BACKEND')
const base = `${PROTOCAL}://${HOST}:${PORT}/api/${VERSION}`

const BACKEND = {
  // internal use only
  GET_LOGIN: () => ({
    method: 'get',
    path: `${base}/login`
  }),
  POST_APIS: () => ({
    method: 'post',
    path: `${base}/apis`
  }),
  GET_APIS: () => ({
    method: 'get',
    path: `${base}/apis`
  }),
  GET_APIS_APIID: ({ apiId }) => ({
    method: 'get',
    path: `${base}/apis/${apiId}`
  }),
  GET_APIS_APIID_DETAIL: ({ apiId }) => ({
    method: 'get',
    path: `${base}/apis/${apiId}/detail`
  }),
  PATCH_APIS_APIID: ({ apiId }) => ({
    method: 'patch',
    path: `${base}/apis/${apiId}`
  }),
  GET_APIS_APIID_TEST: ({ apiId }) => ({
    method: 'get',
    path: `${base}/apis/${apiId}/test`
  }),
  POST_APIS_APIID_PUBLISH: ({ apiId }) => ({
    method: 'post',
    path: `${base}/apis/${apiId}/publish`
  }),
  GET_APIS_APIID_STATUS: ({ apiId }) => ({
    method: 'get',
    path: `${base}/apis/${apiId}/status`
  }),
  PATCH_APIS_APIID_STATUS: ({ apiId }) => ({
    method: 'patch',
    path: `${base}/apis/${apiId}/status`
  })
}

module.exports = { BACKEND }
