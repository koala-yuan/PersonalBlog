const MOCK_LIST = require('./MOCK_DATA.json')
const { cloneDeep, sortBy } = require('lodash')

export const getList = ({
  sort,
  order,
  query: {
    gender = '',
    firstName = '',
    lastName = ''
  } = {},
  limit = 10,
  offset = 0
}) => {
  let list = cloneDeep(MOCK_LIST).filter(item =>
    item.lastName.includes(lastName) && item.firstName.includes(firstName)
  )
  if (gender) {
    list = list.filter(item => item.gender === gender)
  }
  const total = list.length
  if (order && sort) {
    list = sortBy(list, item => item[sort])
    if (order === 'desc') {
      list.reverse()
    }
  }

  return {
    list: list.slice(offset, offset + limit),
    pagination: { limit, offset, total }
  }
}
