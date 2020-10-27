const config = require('config')
const OSS = require('ali-oss')

module.exports = (path) => {
  return new Promise(async (resolve, reject) => {
    const client = new OSS(config.get('OSS'))

    const { domain, prefix, backupFile } = config.get('OSS')
    const fullname = `${prefix}/${backupFile}`
    const { name, res } = await client.put(fullname, path)
    const url = `${domain}/${fullname}`
    if (res.status === 200) {
      resolve({ name, res, url })
    } else {
      reject(new Error('Oss error', res))
    }
  })
}
