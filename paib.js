const irc = require('irc')
const log = require('./log')
const config = require('./config')

let plugins = {}
let events = {}
let commands = {}
let client

if (config.debug)
    log.setLevel(1)

// Check the config
if (typeof config.nick !== 'string') {
    log.error("`nick` must be a string")
} else if (typeof config.server !== 'object') {
    log.error("`server` must be an object")
} else {
    loadPlugins()

    client = new irc.Client(config.server.address, config.nick, Object.assign({
        channels: config.channels,
        secure: config.server.secure,
        port: config.server.port,
        userName: config.username,
        realName: config.realname,
        debug: config.debug,
    }, config.other))

    client.addListener('message', (from, to, msg) => {
        runEvent('message', { message: msg, from, to })

        if (msg.startsWith(config.commandPrefix)) {
            let message = msg.slice(config.commandPrefix.length)
            if (message.length !== 0) {
                let command = message.split(' ')[0]
                let args = ''

                if (message.indexOf(' ') >= 0)
                    args = message.slice(message.indexOf(' ')+1)
                
                if (typeof commands[command] === 'function') {
                    commands[command](from, to, args)
                }
            }
        }
    })

    client.addListener('action', (from, to, msg) => {
        runEvent('action', { message: msg, from, to })
    })

    client.addListener('error', (message) => {
      log.error(message)
    })
}

function runEvent(event, ...args) {
    if (Array.isArray(events[event])) {
        events[event].forEach(fn => {
            fn(...args)
        })
    }
}

function getAPI(plugin) {
    return {
        log: log.withPrefix(plugin.name),
        on(event, cb) {
            if (!Array.isArray(events[event])) {
                events[event] = []
            }
            events[event].push(cb)
        },
        addCommand(command, cb) {
            commands[command] = cb
        },
        say(to, message) {
            client.say(to, message)
        },
        action(to, message) {
            client.action(to, message)
        },
        plugins,
        client,
    }
}

function loadPlugins() {
    plugins = {}
    commands = {}
    events = {}
    log.info("Loading plugins...")
    if (config.plugins) {
        log.debug(`Found ${config.plugins.length} plugin(s)`)
        log.debug("Starting plugin initialization")
        config.plugins.forEach(plugin => {
            if (typeof plugin.name !== 'string') {
                log.error("Plugin has no name, skipping...")
                return
            }

            try {
                if (typeof plugin.init !== 'function')
                    log.warning(`${plugin.name}.init is not a function`)
                plugin.init(getAPI(plugin))
            } catch (e) {
                log.error(`${plugin.name} failed to initialize`)
                return
            }

            log.debug(`plugin ${plugin.name} initialized`)

            plugins[plugin.name] = plugin
        })

        log.debug("Starting plugin post-initialization")
        for (plugin_name in plugins) {
            let plugin = plugins[plugin_name]
            if (typeof plugin.postInit === 'function') {
                try {
                    plugin.postInit(getAPI(plugin))
                } catch (e) {
                    log.error(`${plugin.name}.postInit failed`)
                    return
                }
                log.debug(`Ran ${plugin.name}.postInit`)
            }
        }
        log.info(`Loaded ${Object.keys(plugins).length} plugin(s)`)
    } else {
        log.info("No plugins found")
    }
}
