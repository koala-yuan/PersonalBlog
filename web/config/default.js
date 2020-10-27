const getEnv = require('../util/env')

const APPNAME = getEnv('APPNAME', 'ltc-template-web-app')
const LOGINMODE = getEnv('LOGINMODE', 'auto')

const BACKEND_PROTOCOL = getEnv('BACKEND_PROTOCOL', 'http')
const BACKEND_HOST = getEnv('BACKEND_HOST', '172.16.233.1')
const BACKEND_PORT = getEnv('BACKEND_PORT', '18000')
const BACKEND_VERSION = getEnv('BACKEND_VERSION', 'v1')
const BACKEND_SECRET = getEnv('BACKEND_SECRET', 'linktime-bdos-data-service-web-secret-for-backend-and-node-to-send-payload-and-verification')

const WEBUI_PROTOCOL = getEnv('WEBUI_PROTOCOL', 'http')
const WEBUI_HOST = getEnv('WEBUI_HOST', '127.0.0.1')
const WEBUI_PORT = getEnv('WEBUI_PORT', '3000')

const uid = getEnv('BDOS_ID', '0')
const userName = getEnv('BDOS_USER', 'dcos')
const name = getEnv('BDOS_NAME', 'dcos')
const email = getEnv('BDOS_EMAIL', 'admin@linktimecloud.com')

const BDOS_DOMAIN = getEnv('BDOS_DOMAIN', 'http://127.0.0.1:3000')

module.exports = {
  APPNAME,
  LOGINMODE,
  'USER': {
    uid,
    userName,
    name,
    email
  },
  'BACKEND': {
    'PROTOCAL': BACKEND_PROTOCOL,
    'HOST': BACKEND_HOST,
    'PORT': BACKEND_PORT,
    'VERSION': BACKEND_VERSION,
    'SECRET': BACKEND_SECRET
  },
  'WEBUI': {
    'PROTOCAL': WEBUI_PROTOCOL,
    'HOST': WEBUI_HOST,
    'PORT': WEBUI_PORT
  },
  'CROSS': {
    'BDOS_DOMAIN': BDOS_DOMAIN,
    'SECRET': 'ForUseOfXHeaderCrossClients',
    'XHeader': `cross/${APPNAME}`
  },
  'CLUSTER': {
  }
}
