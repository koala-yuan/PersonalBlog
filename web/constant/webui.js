const config = require('config')
const { PROTOCAL, HOST, PORT } = config.get('WEBUI')
const base = `${PROTOCAL}://${HOST}:${PORT}/api`

const WEBUI = {
  GET_USER: () => ({
    method: 'get',
    path: `${base}/user`
  }),
  GET_AUTH_TYPE: () => ({
    method: 'get',
    path: `${base}/auth/type`
  }),
  POST_AUTH_LOGOUT: () => ({
    method: 'post',
    path: `${base}/auth/logout`
  })
}

module.exports = { WEBUI }
