import * as slack from './slack'
import config from './config'

/**
 * webhook entry point
 * @param {*} e - parameters
 * @return {void}
 */
global.doPost = (e) => {
  const params = e.parameter
  if (!isValidToken(params.token)) {
    Logger.log('invalid token')
  }

  const message = config.message
  slack.replyMessage(params, message)
}

/**
 * validate webhook token
 * @param {string} token
 * @return {boolean}
 */
function isValidToken(token) {
  return token === config.webhook_token
}

global.doTest = () => {
  const param = {
    token: config.webhook_token,
    text: 'ただいま',
    channel_id: 'C44HLB883',
    user_name: 'tosuke'
  }

  doPost({
    parameter: param
  })
}
