"use strict"
let chalk = require("chalk")
module.exports = {
    level: 2, // ALL
    prefix: [],
    setLevel(level) {
        this.level = level
    },
    withPrefix(prefix) {
        let copy = Object.assign({}, this)
        copy.prefix = Object.assign([], this.prefix)
        copy.prefix.push(prefix)
        return copy
    },
    getPrefix() {
        let s = ""
        this.prefix.forEach(p => {
            s += `[${p}]`
        })
        if (s.length > 0) s += " "
        return s
    },
    debug(msg) {
        if (this.level <= 1)
            console.log(this.getPrefix() + chalk.magenta("debug ") + msg)
    },
    info(msg) {
        if (this.level <= 2)
            console.log(this.getPrefix() + chalk.blue("info ") + msg)
    },
    success(msg) {
        if (this.level <= 3)
            console.log(this.getPrefix() + chalk.green("success ") + msg)
    },
    warning(msg) {
        if (this.level <= 4)
            console.log(this.getPrefix() + chalk.yellow("warning ") + msg)
    },
    error(msg) {
        if (this.level <= 5)
            console.log(this.getPrefix() + chalk.red("error ") + msg)
    }
}
