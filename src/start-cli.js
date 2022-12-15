import { homedir } from "node:os";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { fileSystem } from "./operations/file-system.js";
import { loggingMessages } from "./operations/logging-mesages.js";
import { workDirectory } from "./operations/work-directory.js";
import { operatingSystem } from "./operations/operating-system.js";

// TODO: rename it
export const startCli = async () => {
    loggingMessages.greeting('--username')

    let currentDirectory = homedir()
    loggingMessages.showCurrentDirectory(currentDirectory)

    const readline = createInterface({ input, output });

    // TODO: move handler to separate function
    readline.on('line', async (chunk) => {
        const stringifiedChunk = chunk.toString().trim()
        //TODO: move cases to bottom switch with 'break' instead of 'return'
        switch (stringifiedChunk) {
            case '.exit':
                loggingMessages.goodbye('--username')
                readline.close()
                return

            case 'up':
                currentDirectory = workDirectory.getParentDirname(currentDirectory)
                loggingMessages.showCurrentDirectory(currentDirectory)
                return

            case 'ls':
                fileSystem.listFiles(currentDirectory)
                return
        }

        const splitedChunk = chunk.split(' ')
        // TODO: rename it
        const [commandName, firstArgument, secondArgument] = splitedChunk
        const path = workDirectory.getPath(firstArgument, currentDirectory)
        switch (commandName) {
            case 'cd':
                // TODO: move to method in file system
                if (firstArgument === '..') {
                    currentDirectory = workDirectory.getParentDirname(currentDirectory)
                    loggingMessages.showCurrentDirectory(currentDirectory)
                    break
                }

                // TODO: mb rewrite to try catch and 'acces' instead of if/else and checkExist
                const isDirectoryExist = await fileSystem.checkExist(path)

                if (isDirectoryExist) {
                    currentDirectory = path
                    loggingMessages.showCurrentDirectory(currentDirectory)
                } else {
                    console.log('Operation failed')
                }
                break;

            case 'cat':
                fileSystem.catenateFile(firstArgument)
                break;

            case 'add':
                fileSystem.createFile(path)
                break;

            case 'rn':
                fileSystem.renameFile(firstArgument, secondArgument)
                break;

            case 'cp':
                fileSystem.copyFile(firstArgument, secondArgument)
                break;

            case 'mv':
                fileSystem.moveFile(firstArgument, secondArgument)
                break;

            case 'rm':
                fileSystem.removeFile(firstArgument)
                break;

            case 'os':
                operatingSystem.printOsInfo(firstArgument)
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