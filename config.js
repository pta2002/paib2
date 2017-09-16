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
                api.on('message', message => {
                    console.log(message)
                })
            },
            postInit(api) {
                api.log.debug("I run just after everyone else starts")
            }
        }
    ]
}
