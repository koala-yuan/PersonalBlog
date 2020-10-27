const config = require('config')
const WEBUI = config.get('WEBUI')

const ENV = { WEBUI }

module.exports = { ENV }
