import { Local } from '@/utils/storage'

import * as types from './types'

const mutations = {
  [types.SET_AUTH_TOKEN] (state, { token }) {
    state.authToken = token
    if (token) {
      Local.setItem('AUTH_TOKEN', token)
    } else {
      Local.removeItem('AUTH_TOKEN')
    }
  }
}

export default mutations
