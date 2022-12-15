import { homedir } from "node:os";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { fileSystem } from "./operations/file-system.js";
import { loggingMessages } from "./operations/logging-mesages.js";
import { workDirectory } from "./operations/work-directory.js";
import { operatingSystem } from "./operations/operating-system.js";
import { hash } from "./operations/hash.js";
import { compression } from "./operations/compression.js";

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
                currentDirectory = workDirectory.getParentDirectory(currentDirectory)
                loggingMessages.showCurrentDirectory(currentDirectory)
                return

            case 'ls':
                fileSystem.listFiles(currentDirectory)
                return
        }

        const splitedChunk = chunk.split(' ')
        const [commandName, firstArgument, secondArgument] = splitedChunk

        switch (commandName) {
            case 'cd':
                currentDirectory = await workDirectory.changeDirectory(firstArgument, currentDirectory)
                break;

            case 'cat':
                fileSystem.catenateFile(firstArgument)
                break;

            case 'add':
                const path = workDirectory.getPath(firstArgument, currentDirectory)
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

            case 'hash':
                hash.calculateFile(firstArgument)
                break;

            case 'compress':
                compression.compress(firstArgument, secondArgument)
                break;

            case 'decompress':
                compression.decompress(firstArgument, secondArgument)
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