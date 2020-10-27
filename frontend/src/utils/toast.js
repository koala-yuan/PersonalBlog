import 'noty/lib/noty.css'
import 'noty/lib/themes/sunset.css'

import { isArray, isEmpty } from 'lodash'
import Noty from 'noty'

import { strip } from '@/utils/utils'

/**
 * Noty Options
 * https://ned.im/noty/#/options
 */
Noty.overrideDefaults({
  killable: true,
  layout: 'topRight',
  theme: 'sunset',
  closeWith: ['click', 'button'],
  animation: {
    open: 'animated bounceInRight',
    close: 'animated bounceOutRight'
  }
})
Noty.setMaxVisible(3)

const toast = {
  log (msg, obj = {}) {
    const settings = Object.assign({
      limit: 1,
      type: 'warning',
      text: obj.type
    }, obj)

    if (settings.timeout === undefined) {
      settings.timeout = settings.type === 'error' ? 10000 : 5000
    }

    if (isArray(msg)) {
      settings.text = msg.join(' ')
    } else if (typeof msg === 'string') {
      settings.text = msg
    }

    settings.text = strip(settings.text)

    // trigger toast
    if (settings.unique) {
      settings.killer = settings.queue || settings.unique
    } else if (settings.queue) {
      Noty.setMaxVisible(settings.limit, settings.queue)
    }

    // callback button
    if (!isEmpty(obj.btn)) {
      settings.buttons = [
        Noty.button(
          obj.btn.text,
          obj.btn.cls,
          obj.btn.cb,
          obj.btn.attr
        )
      ]
    }

    const NotyInstance = new Noty(settings)

    NotyInstance.show()
    return NotyInstance
  },
  clear (opt = {}) {
    Noty.closeAll(opt.queue)
    Noty.clearQueue(opt.queue)
  }
}

export default toast
