// transformer
module.exports = {
  // param -> boolean
  param2boolean: (param) => {
    let ret = false
    if (typeof (param) === 'boolean') {
      ret = param
    } else if (typeof (param) === 'string') {
      if (param === 'true' || param === 'YES' || param === '1') {
        ret = true
      }
    } else if (typeof (param) === 'number') {
      if (param !== 0) {
        ret = true
      }
    }
    return ret
  },

  // string -> number
  string2number: (str) => {
    if (typeof (str) === 'string') {
      str = Number(str)
    }
    return str
  },

  // timeStamp -> date
  number2date: (num) => {
    let date = new Date()
    num *= 1000
    date.setTime(num)
    return date
  },

  // date -> timeStamp
  date2number: (date) => {
    if (date) {
      return Math.round(date.getTime() / 1000)
    }
    return null
  },

  pad: (num, n) => {
    let len = String(num).length
    n -= len
    return new Array(n > 0 ? (n + 1) : 0).join(0) + num
  },

  birthday2age: (birthday) => {
    let currentYear = new Date().getFullYear()
    let year = birthday ? birthday.getFullYear() : 1996
    let age = currentYear - year
    return age
  },

  birthday2zodiac: (birthday) => {
    let month = birthday ? birthday.getMonth() : 0
    let day = birthday ? birthday.getDate() : 1
    let str = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'
    let array = [21, 19, 21, 20, 21, 22, 23, 23, 23, 23, 22, 22]
    return str.substr((month + 1) * 2 - (day < array[month] ? 2 : 0), 2) + '座'
  },

  camelCase: (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  }
}
