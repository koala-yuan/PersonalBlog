const fetcher = require('node-fetch')
const { URL } = require('url')

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

/*
  wrapper node-fetch with retry use promise
  retries: retry times, default value is 3
  retryDelay: retry deplay(ms), default value is 1s(1000ms)
*/
const fetch = (url, options = {}, retries = 3, retryDelay = 1000) => {
  console.log(`Fetching api ${url} with: `, options)
  return new Promise((resolve, reject) => {
    const wrapper = (n) => {
      fetcher(url, options)
        .then(res => {
          resolve(res)
        })
        .catch(async (err) => {
          if (n > 0) {
            console.log(`retrying ${n}`, { url, options, err })
            await delay(retryDelay)
            wrapper(--n)
          } else {
            reject(err)
          }
        })
    }
    wrapper(retries)
  })
}

/*
  wrapper node-fetch with retry use async/await
  retries: retry times, default value is 3
  retryDelay: retry deplay(ms), default value is 1s(1000ms)
*/
// const fetch = async (url, options = {}, retries = 3, retryDelay = 1000) => {
//   const wrapper = async (n) => {
//     try {
//       const res = await fetcher(url, options)
//       return res
//     } catch (e) {
//       if (n > 0) {
//         console.log(`retrying ${n}`)
//         await delay(retryDelay)
//         await wrapper(--n)
//       } else {
//         throw e
//       }
//     }
//   }
//   await wrapper(retries)
// }

module.exports = class {
  constructor (ctx, { timeout = 0, headers = {}, auth } = {}) {
    const { kerberos, proxy, url } = ctx
    headers = Object.assign(headers, { 'Content-Type': 'application/json' })

    this.kerberos = kerberos
    this.proxy = proxy
    this.grouped = new RegExp(/\/api\/kafka.*/gi).test(url)
    this.headers = headers
    this.timeout = timeout
    this.auth = auth
    this.ctx = ctx
  }

  async get (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      url = new URL(url)
      for (let k in form) {
        url.searchParams.append(k, form[k])
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const options = {method: 'GET', headers, timeout}
      const response = await fetch(url.href, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }

  async post (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const [method, body] = ['POST', JSON.stringify(form)]
      const options = {method, headers, body, timeout}
      const response = await fetch(url, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }

  async put (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const [method, body] = ['PUT', JSON.stringify(form)]
      const options = {method, headers, body, timeout}
      const response = await fetch(url, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }

  async patch (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const [method, body] = ['PATCH', JSON.stringify(form)]
      const options = {method, headers, body, timeout}
      const response = await fetch(url, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }

  async del (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const [method, body] = ['DELETE', JSON.stringify(form)]
      const options = {method, headers, body, timeout}
      const response = await fetch(url, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }

  async delete (url, form = {}) {
    try {
      let { kerberos, proxy, user, grouped, headers, timeout, auth, ctx } = this
      if (user) {
        form.user = user.userName
        if (grouped) {
          form.groups = user.groups.map(g => g.name.toLowerCase()).join(',')
        }
      }
      if (kerberos && kerberos.enable) {
        headers['authorization'] = kerberos.authorization
      }
      if (proxy && proxy.enable) {
        headers['X-Special-Proxy-Header'] = proxy.XProxyHeader
      }
      const [method, body] = ['DELETE', JSON.stringify(form)]
      const options = {method, headers, body, timeout}
      const response = await fetch(url, options)
      if (response.status !== 200) {
        if (auth) ctx.status = response.status
        throw new Error(`request to ${url} failed, reason: ${response.status} ${response.statusText}`)
      }
      const json = await response.json()
      return json || {}
    } catch (e) {
      let {type, code, message} = e
      if (type === 'system' && code === 'ECONNREFUSED') {
        message = `Service ${url} is not available`
      } else if (type === 'invalid-json') {
        message = 'Data type is incorrect'
      }
      throw new Error(message)
    }
  }
}
