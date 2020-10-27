import * as types from '../types'

export default {
  [types.GET_USER]: () => ({
    method: 'get',
    path: 'user'
  })
}
