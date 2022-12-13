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
    readline.on('line', (chunk) => {
        const stringifiedChunk = chunk.toString().trim()

        switch (stringifiedChunk) {
            case '.exit':
                loggingMessages.goodbye('--username')
                readline.close()
                break;

            case 'cd ..':
            case 'up':
                currentDirectory = fileSystem.getParentDirname(currentDirectory)
                loggingMessages.showCurrentDirectory(currentDirectory)
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