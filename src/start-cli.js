import { homedir, } from "node:os";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { sep } from "node:path";
import { fileSystem } from "./operations/file-system.js";
import { loggingMessages } from "./operations/logging-mesages.js";

// TODO: rename it
export const startCli = async () => {
    loggingMessages.greeting('--username')

    let currentDirectory = homedir()
    loggingMessages.showCurrentDirectory(currentDirectory)

    const readline = createInterface({ input, output });

    // TODO: move handler to separate function
    readline.on('line', async (chunk) => {
        const stringifiedChunk = chunk.toString().trim()
        switch (stringifiedChunk) {
            case '.exit':
                loggingMessages.goodbye('--username')
                readline.close()
                return

            case 'up':
                currentDirectory = fileSystem.getParentDirname(currentDirectory)
                loggingMessages.showCurrentDirectory(currentDirectory)
                return

            case 'ls':
                fileSystem.listFiles(currentDirectory)
                return
        }

        const splitedChunk = chunk.split(' ')
        // TODO: rename it
        const [commandName, argument] = splitedChunk
        switch (commandName) {
            case 'cd':
                // TODO: move to method in file systemcd
                if (argument === '..') {
                    currentDirectory = fileSystem.getParentDirname(currentDirectory)
                    loggingMessages.showCurrentDirectory(currentDirectory)
                    break
                }

                let path = ''

                const isPath = argument.includes(sep) || argument.includes(':')
                if (isPath) {
                    path = argument
                } else {
                    const isSepLastChar = currentDirectory[currentDirectory.length - 1] === sep
                    const calculatedPath = isSepLastChar ? `${currentDirectory}${argument}` : `${currentDirectory}${sep}${argument}`
                    path = calculatedPath
                }

                const isDirectoryExist = await fileSystem.checkExist(path)

                if (isDirectoryExist) {
                    currentDirectory = path
                    loggingMessages.showCurrentDirectory(currentDirectory)
                } else {
                    console.log('Operation failed')
                }
                break;

            case 'cat':
                fileSystem.catenateFile(argument)
                break;
            default:
                console.log('Invalid input')
                break;
        }
    })

    readline.on('SIGINT', () => {
        loggingMessages.goodbye('--username')
        readline.close()
    });
};