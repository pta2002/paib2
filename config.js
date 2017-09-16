module.exports = {
    nick: 'paib2',
    username: 'paib',
    realname: 'An IRC bot',
    server: {
        address: 'irc.afternet.org',
        port: 6697,
        secure: true
    },
    channels: ['#bottest'],
    commandPrefix: '~',
    plugins: [
        {
            name: 'test',
            description: 'Just testing around',
            init(api) {
                api.log.debug("This is the start")

                api.addCommand('speak', (from, to, args) => {
                    api.say(to, `${from}: ${args}`)
                })

                api.addCommand('action', (from, to, args) => {
                    api.action(to, args)
                })
            }
        }
    ]
}
