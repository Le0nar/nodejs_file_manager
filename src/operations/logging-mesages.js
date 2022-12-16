class LoggingMessages {
    _getArgVaue(key) {
        const findedArg = process.argv.find((arg) => arg.startsWith(key)) ?? ''
        return findedArg.slice(key.length + 1)
    }

    goodbye(key) {
        const userName = this._getArgVaue(key)
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
    }

    greeting(key) {
        const userName = this._getArgVaue(key)
        console.log(`Welcome to the File Manager, ${userName}!`)
    }

    showCurrentDirectory(path) {
        console.log(`You are currently in ${path}`)
    }
}

export const loggingMessages = new LoggingMessages()