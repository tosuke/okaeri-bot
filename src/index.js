import * as slack from './slack'
import config from './config'

/**
 * webhook entry point
 * @param {*} e - parameters
 * @return {void}
 */
global.doPost = e => {
  const params = e.parameter
  if (!isValidToken(params.token)) {
    Logger.log('invalid token')
  }

  config.patterns
    .filter(({ matcher }) => matcher.test(params.text))
    .map(({ message, user_persona }) => [
      message(params),
      user_persona || config.default_persona,
    ])
    .forEach(([message, user_persona]) =>
      slack.postMessage(params.channel_id, message, user_persona)
    )
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
  let param = {
    token: config.webhook_token,
    text: 'ただいま',
    channel_id: 'C44HLB883',
    user_name: 'tosuke',
  }

  doPost({
    parameter: param,
  })

  param = {
    token: config.webhook_token,
    text: 'おやすみ',
    channel_id: 'C44HLB883',
    user_name: 'tosuke',
  }

  doPost({
    parameter: param,
  })
}
