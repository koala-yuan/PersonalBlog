const WebHDFS = require('webhdfs')

module.exports = class {
  constructor (options) {
    const {HDFSHOST: host, HDFSPORT: port, HDFSUSER: user} = global
    const {enable, authorization} = options
    this.headers = {authorization}
    this.options = {host, port, user}
    this.hdfsClient = enable ? null : WebHDFS.createClient(this.options)
  }

  readdir (path) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.readdir(path, (error, data) => {
        if (error) reject(error)
        resolve(data)
      })
    })
  }

  mkdir (path) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.mkdir(path, (error, data) => {
        if (error) reject(error)
        resolve(data)
      })
    })
  }

  unlink (path, recursive) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.unlink(path, recursive, (error) => {
        if (error) reject(error)
        resolve(true)
      })
    })
  }

  rmdir (path, recursive) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.unlink(path, recursive, (error) => {
        if (error) reject(error)
        resolve(true)
      })
    })
  }

  writeFile (path, data, append) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.writeFile(path, data, append, (error) => {
        if (error) reject(error)
        resolve(true)
      })
    })
  }

  createReadStream (file) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return hdfsClient.createReadStream(file)
  }

  createWriteStream (file, append) {
    let {options, headers, hdfsClient} = this
    headers['content-type'] = 'application/octet-stream'
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return hdfsClient.createWriteStream(file, append)
  }

  exists (path) {
    let {options, headers, hdfsClient} = this
    hdfsClient = hdfsClient || WebHDFS.createClient(options, {headers})
    return new Promise((resolve, reject) => {
      hdfsClient.exists(path, (data) => {
        resolve(data)
      })
    })
  }
}
