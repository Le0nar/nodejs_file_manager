import { homedir } from "node:os";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
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
        }

        const splitedChunk = chunk.split(' ')
        const [firstWord] = splitedChunk
        switch (firstWord) {
            case 'cd':
                const path = splitedChunk[1]
                if (path === '..') {
                    currentDirectory = fileSystem.getParentDirname(currentDirectory)
                    loggingMessages.showCurrentDirectory(currentDirectory)
                    break
                }

                const isDirectoryExist = await fileSystem.checkDirectoryExist(path)

                if (isDirectoryExist) {
                    currentDirectory = path
                    loggingMessages.showCurrentDirectory(currentDirectory)
                } else {
                    console.log('Operation failed')
                }
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