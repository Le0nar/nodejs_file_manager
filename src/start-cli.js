import { homedir } from "node:os";
import { fileSystem } from "./operations/file-system.js";
import { loggingMessages } from "./operations/logging-mesages.js";

// TODO: rename it
export const startCli = async () => {
    loggingMessages.greeting('--username')

    let currentDirectory = homedir()
    loggingMessages.showCurrentDirectory(currentDirectory)

    const readable = process.stdin
    // TODO: move handler to separate function
    readable.on('data', (chunk) => {
        const stringifiedChunk = chunk.toString().trim()

        switch (stringifiedChunk) {
            case '.exit':
                loggingMessages.goodbye('--username')
                process.exit(0)

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

    process.on('SIGINT', () => {
        loggingMessages.goodbye('--username')
        process.exit(0);
    });
};