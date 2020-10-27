import Vue from 'vue'

import moment from 'moment'

import { ceil, isArray, orderBy } from 'lodash'

import i18n from '@/i18n'

moment.locale('cn', {
  invalidDate: '',
  months: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ]
})

moment.locale(Vue.config.lang)

const THIS_YEAR = moment().year()

const handlers = {}

/**
 * Check if the DOM is visibled
 *
 * @param {DOM} elem
 * @returns {Boolean}
 */
export const checkVisible = (elem) => {
  if (!elem) {
    return false
  }
  const rect = elem.getBoundingClientRect()
  if (rect && rect.top > 0) {
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  }
}

/**
 * Remove all html tags
 *
 * @param {string} [str='']
 * @returns {String}
 */
export const strip = (str = '') => {
  if (str) {
    str = str.replace(/<\/?[^>]+(>|$)/g, '')
  }
  return str
}

/**
 * compute the time after {add} days
 *
 * @param {timestamp} [time=Date.now()]
 * @param {number} [add=0]
 * @param {boolean} [end=false] whether the end of day
 * @returns {timestamp}
 */
export const addDays = (time = Date.now(), add = 0, end = false) => {
  let ret = moment(time).add(add, 'd')
  if (end) {
    ret = ret.endOf('day')
  }
  return +ret
}

/**
 * compute the time before {minus} days
 *
 * @param {timestamp} [time=Date.now()]
 * @param {number} [minus=0]
 * @param {boolean} [start=false] // whether the start of day
 * @returns {timestamp}
 */
export const minusDays = (time = Date.now(), minus = 0, start = false) => {
  let ret = moment(time).subtract(minus, 'd')
  if (start) {
    ret = ret.startOf('day')
  }
  return +ret
}

/**
 * display milliseconds to humanize time
 *
 * @param {timestamp} [time=Date.now()]
 * @param {string} [type='asDays']
 * @param {number} [fixed=0]
 * @returns {number}
 */
export const humanize = (time = '') => {
  const { hours, minutes, seconds, milliseconds } = restTime(time)

  const ret = []

  if (hours) ret.push(`${hours} 小时`)
  if (minutes) ret.push(`${minutes} 分`)
  if (seconds) ret.push(`${seconds} 秒`)
  if (milliseconds) ret.push(`${milliseconds} 毫秒`)

  return ret.join(' ')
}

/**
 * display milliseconds to format time
 *
 * @param {timestamp} [time=Date.now()]
 * @param {string} [type='asDays']
 * @param {number} [fixed=0]
 * @returns {number}
 */
export const duration = (time = Date.now(), type = 'asDays', fixed = 0) => {
  const t = moment.duration(time)
  let ret = t[type] && t[type]()
  if (fixed > 0) {
    ret = ceil(ret, fixed)
  } else {
    ret = Math.ceil(ret)
  }
  return ret
}

/**
 * warp momentjs to some useful functions
 */
export const validDate = (time = Date.now()) => {
  return moment(time).isValid()
}

export const strSeconds = (time = Date.now(), sep = ':') => {
  const date = moment(time)
  const ret = date.format(`HH${sep}mm${sep}ss`)
  return ret
}
export const strHours = (time = Date.now(), sepDay = '-', sep = ':') => {
  const date = moment(time)
  const ret = date.format(`MM${sepDay}DD HH${sep}mm`)
  return ret
}
export const strDay = (time = Date.now(), sep = '-') => {
  const date = moment(time)
  const ret = date.format(`YYYY${sep}MM${sep}DD`)
  return ret
}
export const strMonth = (time = Date.now(), sep = '-') => {
  const date = moment(time)
  const ret = date.format(`YYYY${sep}MM`)
  return ret
}
export const strFull = (time = Date.now(), sepDay = '-', sepTime = ':', sep = ' ') => {
  if (time === '') {
    return ''
  }
  const date = moment(time)
  const ret = date.format(`YYYY${sepDay}MM${sepDay}DD${sep}HH${sepTime}mm${sepTime}ss`)
  return ret
}
export const strTime = (time = Date.now(), sepTime = ':', sep = ' ') => {
  const self = this
  const date = moment(time)
  let ret = self.strDay(date)
  if (date.year() >= THIS_YEAR) {
    ret = self.strFull(date)
  }
  return ret
}
export const rangeTime = (total = 0) => {
  total = total * 1 || 0
  const date = moment.duration(total)
  const year = date.years()
  const month = date.months()
  const day = date.days()
  return {
    total,
    year,
    month,
    day
  }
}
export const restTime = (total = 0) => {
  total = total * 1 || 0
  const time = moment.duration(total)

  const hours = Math.floor(time.asHours())
  const minutes = time.minutes()
  const seconds = time.seconds()
  const milliseconds = time.milliseconds()

  return {
    total,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export const convertDateToTimeStamp = date => {
  if (date === '' || date === null || date === null) {
    return null
  }
  return +moment(date)
}

export const validPasswd = (passwd = '') => {
  let ret = true
  let regexp = /^[0-9a-zA-Z\._]+$/ // eslint-disable-line
  if (
    passwd &&
    (
      typeof passwd !== 'string' ||
      !regexp.test(passwd)
    )
  ) {
    ret = false
  }
  return ret
}

export const findPos = (elem) => {
  let curtop = 0
  if (elem.offsetParent) {
    do {
      curtop += elem.offsetTop
      elem = elem.offsetParent
    } while (elem)
  }
  return curtop
}

export const goTarget = (elem, offset) => {
  const top = offset || findPos(elem)
  window.scroll(0, top)
}

export const scrollTo = (to = 0, duration = 300) => {
  if (duration <= 0) return
  const self = this
  const docu = document.documentElement
  const body = document.body
  const top = () => {
    return Math.max(docu.scrollTop, body.scrollTop)
  }
  const difference = to - top()
  const perTick = difference / duration * 10
  clearTimeout(handlers.scrollTo)
  handlers.scrollTo = setTimeout(() => {
    const t = top()
    docu.scrollTop = body.scrollTop = t + perTick
    if (t === to) return
    self.scrollTo(to, duration - 10)
  }, 10)
}

/**
 * clear value of a input[type="file"]
 *
 * @param {DOM} f
 */
export const clearFile = (f) => {
  if (f.value) {
    try {
      // for IE11, latest Chrome/Firefox/Opera...
      f.value = ''
      // for IE9 ~ IE10
      if (f.value) {
        f.type = 'text'
        f.type = 'file'
      }
    } catch (err) {
      console.warn('Reset the input file element fault.')
    }
    if (f.value) {
      // for IE5 ~ IE8
      const form = document.createElement('form')
      const parentNode = f.parentNode
      const ref = f.nextSibling
      form.appendChild(f)
      form.reset()
      parentNode.insertBefore(f, ref)
    }
  }
}

export const translateProcessStatus = (val) => {
  return i18n.t(`common.processStatus_${val || '0'}`)
}

export const translateRunningStatus = (val) => {
  if (val === null) {
    val = '2'
  }
  return i18n.t(`common.runningStatus_${val || '0'}`)
}

export const orderList = (arr, { prop, order }) => {
  let ret = isArray(arr) ? arr : []

  prop = isArray(prop) ? prop : [prop]
  order = order === 'ascending' ? 'asc' : 'desc'

  if (prop) {
    ret = orderBy(ret, prop, order)
  }

  return ret
}

export const generateObjectArray = arr => arr.map(item => ({ key: item, label: item }))

export const splitStringToNumbers = (str = '') => {
  const arr = str.split(',').map((item = '') => item.trim() * 1 || 0)
  return [arr[0] || 0, arr[1] || 0]
}
