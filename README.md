# Paib 2.0

This is a complete rewrite of [paib](https://github.com/pta2002/paib/).

This is solely the bot's core, hoping to separate core and plugins better.

## Changes from 1.0
 - Completely rewritten in node
 - Hopefully better API
 - Built-in logger
 - Plugins can be distributed as NPM packages

# Usage
```bash
$ git clone https://github.com/pta2002/paib2

$ npm install # Or yarn, if you use it

$ node paib.js
```

This will run a bot named 'paib2' and connect to the #bottest channel on afternet,
with a sample plugin.

## Configuration

Configuration is done by editing the `config.js` file.

This file is just a JS module that exports a configuration object.

```js
module.exports = {
    nick: 'yournick',
    server: {
        address: 'irc.example.com',
        port: 6697,
        secure: true
    },
    username: 'mybot',
    realname: 'An IRC bot',
    debug: false,
    channels: ['#chan1', '#chan2'],
    commandPrefix: '~',
    plugins: [
        // Require plugins as needed...
        require('plugin1'),
        require('plugin2')
    ],
    // node-irc options https://node-irc.readthedocs.io/en/latest/API.html#events
    other: {
        selfSigned: true
    }
}
```

## Making a plugin
There's currently an example plugin in `plugins/example.js`

# LICENSE
```
Copyright (c) 2017 Pedro Alves

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
