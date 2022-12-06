import { goodbye } from "./utils/goodbye.utils.js";
import { greeting } from "./utils/greeting.utils.js";

// TODO: rename it
export const startCli = async () => {
    const readable = process.stdin

    greeting('--username')

    // TODO: move handler to separate function
    readable.on('data', (chunk) => {
        const stringifiedChunk = chunk.toString().trim()

        switch (stringifiedChunk) {
            case '.exit':
                goodbye('--username')
                process.exit(0)

                break;

            case 'test':
                console.log('test: ' + stringifiedChunk)
                break;

            default:
                // TODO: add handler
                console.log('add handler')
                break;
        }
    })

    process.on('SIGINT', () => {
        goodbye('--username')
        process.exit(0);
    });
};