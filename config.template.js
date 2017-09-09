export default {
  // slack access token
  slack_token: '',
  // outgoing webhook token
  webhook_token: '',
  // bot user settings(see https://api.slack.com/methods/chat.postMessage)
  patterns: [
    {
      matcher: /^\s*ただいま\s*$/,
      user_persona: {
        username: 'okaeri bot',
        icon_emoji: ':house:',
      },
      message: ({ user_name }) => `<@${user_name}> おかえり`,
    },
  ],
  default_persona: {
    username: 'tosukebot',
    icon_emoji: ':d-man:',
  },
}
