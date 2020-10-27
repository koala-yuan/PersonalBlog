const { exec } = require('shelljs')

module.exports = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { silent: true }, (code, stdout, stderr) => {
      code = code ? 0 : 1
      const status = code ? 'success' : 'failed'
      if (code) {
        resolve({ code, status, stdout, stderr })
      } else {
        reject({ code, status, stdout, stderr })
      }
    })
  })
}
