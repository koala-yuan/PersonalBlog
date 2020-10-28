/**
 * import axios
 *
 * Usage of Axios
 * https://github.com/mzabriskie/axios
 */
import axios from 'axios'

/**
 * import lodash modules
 */
import { isFunction, isPlainObject, merge, get, set } from 'lodash'

/**
 * import rest
 */
import { rest } from './rest'

/**
 * import modules
 */
import toast from '@/utils/toast'

/**
 * import store
 */
import Store from '@/store'

/**
 * import router
 */
import Router from '@/router'

/**
 * import i18n
 */
import i18n from '@/i18n'

/**
 * import enviorment variables
 */
import { NODE_ENV, URI_BASE, ACCEPT, API_TOKEN, CONTENT_TYPE } from '@/env'

/**
 * axios global configuration
 */
axios.defaults.withCredentials = NODE_ENV === 'production'

axios.defaults.headers.common['Accept'] = ACCEPT
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE

// AUTH_TOKEN
axios.defaults.headers.common['Authorization'] = API_TOKEN

/**
 * Public definations
 */
const instance = {}

/**
 * CancelToken
 */
const CancelToken = axios.CancelToken

/**
 * The ajax class package
 */
export class Ajax {
  /**
   * Creates an instance of Ajax.
   *
   * @param {Object} [opt={}]
   *
   * @memberOf Ajax
   */
  constructor (opt = {}) {
    // get a rest full api detail according opt
    if (opt.resource) {
      const res = rest(opt.resource)
      const obj = res.obj
      if (obj) {
        Object.assign(opt, obj)
      }
      opt.res = res
    }
    // set `options`
    this.options = Object.assign({
      method: 'get',
      baseURL: URI_BASE,
      params: {},
      data: {},
      toast: true,
      toastSettings: {},
      cache: false,
      redirect: false,
      loading: false,
      loadingParams: {
        closable: true,
        text: i18n.t('common.loading')
      },
      source: CancelToken.source()
    }, opt)
  }
  /**
   * Update the options of Ajax
   *
   * @param {any} opt
   *
   * @memberOf Ajax
   */
  update (opt) {
    if (opt) {
      this.options = Object.assign(
        {},
        this.options,
        opt
      )
    }
  }
  /**
   * Trigger the request
   *
   * @param {Object} opt
   * @returns {Promise}
   *
   * @memberOf Ajax
   */
  fetch (opt) {
    const self = this
    const options = opt
      ? Object.assign({}, self.options, opt)
      : self.options
    const settings = {
      url: options.path,
      baseURL: options.baseURL,
      method: options.method,
      params: options.params,
      data: options.data,
      responseType: options.responseType,
      withCredentials: options.withCredentials,
      cancelToken: options.source.token,
      onUploadProgress: e => {
        if (isFunction(options.upload)) {
          options.upload(e)
        }
      },
      onDownloadProgress: e => {
        if (isFunction(options.download)) {
          options.download(e)
        }
      },
      validateStatus: status => {
        return status >= 200 && status < 300
      }
    }
    if (options.method === 'get') {
      if (!options.cache) {
        settings.params.t = Date.now()
      }
      settings.params = Object.assign(
        {},
        settings.data,
        settings.params
      )
    }
    // make the key
    const key = `${settings.url}_${settings.method}`
    // set Authorization headers
    axios.defaults.headers.common['Authorization'] = Store.getters.authToken

    // log
    console.log(`Ajax fetching: ${settings.method} - ${settings.url}`)

    // before send
    self.loadingAction(true)
    if (isFunction(options.before)) {
      options.before()
    }
    try {
      // make the request
      instance[key] = axios(settings)
      // catch error
      instance[key].catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
          if (isFunction(options.canceled)) {
            options.canceled()
          }
        } else {
          // handle error
          if (error.response && error.response.status === 401) {
            self.handleGuest(error.response, options)
          } else {
            self.handleException(error.response, options)
          }
        }
      })
      // handle success
      instance[key].then(response => {
        self.handleResponse(response, options)
      })
      // handle complete
      instance[key].finally(response => {
        self.loadingAction(false)
        if (isFunction(options.complete)) {
          options.complete(response)
        }
      })
      return instance[key]
    } catch (e) {
      throw new Error(e)
    }
  }
  /**
   * Cancel the request
   *
   * @param {Object} opt
   * @returns {Promise}
   *
   * @memberOf Ajax
   */
  cancel (msg) {
    this.options.source.cancel(msg)
  }
  /**
   * Handle the response data under http status 200
   *
   * @param {Object} response
   * @param {Object} options
   *
   * @memberOf Ajax
   */
  handleResponse (response = {}, options) {
    const self = this
    if (response.data) {
      if (options.download) {
        self.handleDownload(response, options)
      } else {
        switch (response.data.status) {
          case '000000':
            self.handleGuest(response, options)
            break
          case '100000':
            if (isFunction(options.success)) {
              options.success(response.data)
            }
            break
          default:
            self.handleFail(response, options)
            break
        }
      }
    } else {
      self.handleException(response, options)
    }
  }
  /**
   * Handle the response data.status is not `100000`
   *
   * @param {Object} response
   * @param {Object} options
   *
   * @memberOf Ajax
   */
  handleFail (response = {}, options) {
    if (isFunction(options.fail)) {
      options.fail(response)
    }
    if (options.toast) {
      const text = response.statusText
      const message = get(response.data, 'message.desc') || {}
      const lang = Store.getters.lang || 'cn'

      let msg = message.desc || message
      if (isPlainObject(msg)) {
        msg = msg[lang]
      }
      toast.log(
        msg || text,
        merge(
          { type: 'warning' },
          options.toastSettings
        )
      )
    }
  }

  /**
   * Handle the response data.status is `200000`
   *
   * @param {Object} response
   * @param {Object} options
   *
   * @memberOf Ajax
   */
  handleGuest (response = {}, options) {
    const authToken = Store.getters.authToken
    if (options.toast && authToken) {
      toast.log(
        i18n.t('login.guest'),
        { type: 'warning', queue: 'guest', unique: true }
      )
    }
    Store.dispatch('removeCurrentUser')
    if (Store.getters.route.name !== 'auth') {
      Router.push('auth')
    }
  }
  /**
   * Handle the file stream download
   *
   * @param {Object} response
   * @param {Object} options
   *
   * @memberOf Ajax
   */
  handleDownload (response = {}, options) {
    options.success(response.data)
  }

  /**
   * Handle http status not 200
   *
   * @param {Object} response
   * @param {Object} options
   *
   * @memberOf Ajax
   */
  handleException (response = {}, options) {
    console.log(response)
    if (isFunction(options.fail)) {
      options.fail(response)
    }
    if (options.toast) {
      const path = options.path
      let text = response.statusText
      text = text ? `: ${text}` : ''
      const errText = i18n.t('common.path') + path + i18n.t('exception.occur') + text
      toast.log(
        [
          errText + ',',
          i18n.t('exception.retry')
        ],
        merge(
          options.toastSettings
        )
      )
    }
  }
}

export default Ajax
