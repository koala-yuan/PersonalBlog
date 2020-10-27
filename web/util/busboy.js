const Busboy = require('busboy')
const fs = require('fs')
const pinyin = require('pinyin')

/*  param           desc
    req        request body
    protocol   file protocol
    path       file path
    suffixs    support file suffixs
*/
const busboy = (req, protocol, path, suffixs) => {
  return new Promise((resolve, reject) => {
    let files = []
    let fileNames = []
    let fields = {}
    let headers = req.headers
    let bb = new Busboy(Object.assign({}, {}, {headers}))

    bb.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      if (!filename) return fileStream.resume()
      filename = pinyin(filename, {style: pinyin.STYLE_NORMAL}).map((s) => s[0]).join('')
      fileNames.push(filename)
      const suffix = filename.split('.').pop()
      fields.suffix = suffix
      fields.appType = suffix === 'war' ? 'tomcat' : 'docker'
      if (suffixs && suffixs.indexOf(suffix) === -1) {
        reject(new Error('Incorrect file suffix'))
        return fileStream.resume()
      }

      files.push(new Promise((resolve, reject) => {
        let remoteStream
        if (protocol === 'http' || protocol === 'local') {
          let filePath = require('path').join(path, filename)
          remoteStream = fs.createWriteStream(filePath)
        }
        fileStream.pipe(remoteStream)
        fileStream.on('error', (err) => {
          console.log('Error local upload')
          reject(err)
        })
        fileStream.on('finish', () => {
          console.log('Complete local upload')
          resolve(filename)
        })
        remoteStream.on('error', (err) => {
          console.log('Error remote upload')
          reject(err)
        })
        remoteStream.on('finish', () => {
          console.log('Complete remote upload ', filename)
          resolve(filename)
        })
      }))
    })

    bb.on('field', (key, value) => {
      fields[key] = value
      if (key === 'reqData') {
        fields[key] = JSON.parse(value)
      }
    })

    bb.on('finish', () => {
      if (files.length) {
        Promise.all(files)
          .then(files => resolve({fileNames, fields}))
          .catch(err => reject(err))
      } else {
        resolve(fileNames)
      }
    })

    bb.on('error', (err) => reject(err))
    bb.on('partsLimit', () => reject(new Error('LIMIT_PART_COUNT')))
    bb.on('filesLimit', () => reject(new Error('LIMIT_FILE_COUNT')))
    bb.on('fieldsLimit', () => reject(new Error('LIMIT_FIELD_COUNT')))
    req.pipe(bb)
  })
}

const mbusboy = (req, path) => {
  return new Promise((resolve, reject) => {
    let files = []
    let fileNames = []
    let fields = {}
    let prefix = ''
    let headers = req.headers
    let bb = new Busboy(Object.assign({}, {}, {headers}))

    bb.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      if (!filename) return fileStream.resume()
      filename = pinyin(filename, {style: pinyin.STYLE_NORMAL}).map((s) => s[0]).join('')
      if (fieldname === 'docker') {
        filename = 'Dockerfile'
      } else if (fieldname === 'artifacts') {
        prefix = 'artifacts'
        fileNames.push(filename)
      }

      files.push(new Promise((resolve, reject) => {
        const filePath = require('path').join(path, prefix, filename)
        const remoteStream = fs.createWriteStream(filePath)
        fileStream.pipe(remoteStream)
        fileStream.on('error', (err) => {
          console.log('Error local upload')
          reject(err)
        })
        fileStream.on('finish', () => {
          console.log('Complete local upload')
          resolve(filename)
        })
        remoteStream.on('error', (err) => {
          console.log('Error remote upload')
          reject(err)
        })
        remoteStream.on('finish', () => {
          console.log('Complete remote upload ', filename)
          resolve(filename)
        })
      }))
    })

    bb.on('field', (key, value) => {
      if (key === 'reqData') {
        fields = JSON.parse(value)
      }
    })

    bb.on('finish', () => {
      if (files.length) {
        Promise.all(files)
          .then(() => resolve({fileNames, fields}))
          .catch(err => reject(err))
      } else {
        resolve({fileNames, fields})
      }
    })

    bb.on('error', (err) => reject(err))
    bb.on('partsLimit', () => reject(new Error('LIMIT_PART_COUNT')))
    bb.on('filesLimit', () => reject(new Error('LIMIT_FILE_COUNT')))
    bb.on('fieldsLimit', () => reject(new Error('LIMIT_FIELD_COUNT')))
    req.pipe(bb)
  })
}

module.exports = { busboy, mbusboy }
