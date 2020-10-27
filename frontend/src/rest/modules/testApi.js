import * as types from '../types'

export default {
  [types.POST_TEST]: () => ({
    method: 'get',
    path: 'test'
  }),
  [types.GET_TEST]: () => ({
    method: 'get',
    path: 'test'
  })
}
