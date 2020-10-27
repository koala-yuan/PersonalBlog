const fs = require('fs')
const jsonfile = require('jsonfile')
const csv = require('csvtojson')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const crypto = require('crypto')
const moment = require('moment')

const mkdir = (path) => {
  return new Promise((resolve, reject) => {
    mkdirp(path, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const readDir = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const rmdir = (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}

const readFile = (path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding || 'utf8', (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const readFileJSON = (file) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const readImage = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject(error)
      resolve(data.toString('base64'))
    })
  })
}

const readCsv = (path, opt = {}) => { // header-body mode
  return csv(opt).fromFile(path)
}

const rename = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}

const writeFile = (file, json) => {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, json, { spaces: 2 }, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}

const removeFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}

const existsFile = (file) => {
  return fs.existsSync(file)
}

const download = (stream, ctx) => {
  return new Promise((resolve, reject) => {
    stream.pipe(ctx.res)
    stream.on('end', () => {
      console.log('Complete remote download')
    })
    stream.on('error', (err) => {
      console.log(err)
      console.log('Error remote download')
      reject(err)
    })
    ctx.res.on('error', (err) => {
      console.log('Error local download')
      reject(err)
    })
    ctx.res.on('finish', () => {
      console.log('Complete local download')
      resolve(true)
    })
  })
}
const cipher = (type, param) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', '219e79d0702e11e78db7cbf0d14944fa', '06c15130a0fe11e8')
  const string = type + '|:|' + param + '|:|' + moment().add(1, 'days').unix()
  let crypted = cipher.update(string, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

const decipher = (crypted) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', '219e79d0702e11e78db7cbf0d14944fa', '06c15130a0fe11e8')
  let dec = decipher.update(crypted, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec.split('|:|')
}

module.exports = {
  mkdir,
  readDir,
  rmdir,
  readFile,
  readFileJSON,
  readImage,
  readCsv,
  rename,
  writeFile,
  removeFile,
  existsFile,
  download,
  cipher,
  decipher
}
