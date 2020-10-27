import { isFunction, isPlainObject } from 'lodash'

import { REST } from '@/rest'

export const rest = res => {
  let name = res
  let sets
  let obj
  if (isPlainObject(res)) {
    name = res.name
    sets = res.sets
  }
  if (isFunction(REST[name])) {
    obj = REST[name](sets)
  }
  return { name, sets, obj }
}
