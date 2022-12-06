import { homedir } from "node:os";
import { getParentDirname } from "./fs-operations/get-parent-dirname.js";
import { goodbye } from "./logging/goodbye.js";
import { greeting } from "./logging/greeting.js";
import { showCurrentDirectory } from "./logging/show-current-directory.js";

// TODO: rename it
export const startCli = async () => {
    const readable = process.stdin

    greeting('--username')

    let currentDirectory = homedir()
    showCurrentDirectory(currentDirectory)

    // TODO: move handler to separate function
    readable.on('data', (chunk) => {
        const stringifiedChunk = chunk.toString().trim()

        switch (stringifiedChunk) {
            case '.exit':
                goodbye('--username')
                process.exit(0)

            case 'up':
                currentDirectory = getParentDirname(currentDirectory)
                showCurrentDirectory(currentDirectory)
                break;

            default:
                console.log('Invalid input')
                break;
        }
    })

    process.on('SIGINT', () => {
        goodbye('--username')
        process.exit(0);
    });
};