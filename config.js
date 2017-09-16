module.exports = {
    nick: 'paib2',
    server: 'irc.afternet.org',
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
