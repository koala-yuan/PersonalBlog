import { capitalize } from 'lodash'

import i18n from '@/i18n'

import {
  strip,
  addDays, strMonth, strDay, strTime, strSeconds, strFull, humanize, validDate,
  translateProcessStatus, translateRunningStatus
} from './utils'

export default {
  install (Vue, options) {
    Vue.filter('capitalize', val => {
      return capitalize(val)
    })
    Vue.filter('uppercase', val => {
      return val.toUpperCase()
    })
    Vue.filter('lowercase', val => {
      return val.toLowerCase()
    })
    Vue.filter('json', (val = {}) => {
      val = JSON.stringify(val, null, '\t')
      return val
    })
    Vue.filter('strip', (val = '') => {
      if (val) {
        val = strip(val.trim())
      }
      return val
    })
    Vue.filter('holder', (val = '', holder = i18n.t('common.empty')) => {
      if (!val) {
        val = holder
      }
      return val
    })
    Vue.filter('append', (val = '', after = '', sep = '') => {
      return val + sep + after
    })
    Vue.filter('prepend', (val = '', before = '', sep = '') => {
      return before + sep + val
    })
    Vue.filter('processStatus', (val) => {
      return translateProcessStatus(val)
    })
    Vue.filter('runningStatus', (val) => {
      return translateRunningStatus(val)
    })
    Vue.filter('slice', (val = [], length = 10) => {
      if (val.slice) {
        val = val.slice(0, length)
      }
      return val
    })
    Vue.filter('errormsgFormat', (val) => {
      return val.length > 15 ? (val.substr(0, 15) + '...') : val
    })
    Vue.filter('scoreFormat', (val) => {
      return val ? val.toFixed(4) : '-'
    })
    Vue.filter('numberFormat', (val = 0) => {
      val *= 1
      if (isNaN(val)) {
        return 0
      }
      if (val >= 10000) {
        return ((val / 10000)).toFixed(1) + 'W'
      }
      if (val >= 1000) {
        return ((val / 1000)).toFixed(1) + 'K'
      }
      return val
    })
    Vue.filter('timeformat', (time, type = 'full', add) => {
      let ret = ''
      if (time) {
        if (typeof time === 'string' && !validDate(time)) {
          time = parseInt(time) || Date.now()
        }
        if (add !== undefined) {
          time = addDays(time, add)
        }
        switch (type) {
          case 'month':
            ret = strMonth(time)
            break
          case 'day':
            ret = strDay(time)
            break
          case 'time':
            ret = strTime(time)
            break
          case 'second':
            ret = strSeconds(time)
            break
          case 'humanize':
            ret = humanize(time)
            break
          default:
            ret = strFull(time)
        }
      } else {
        ret = i18n.t('common.empty')
      }
      return ret
    })
  }
}
