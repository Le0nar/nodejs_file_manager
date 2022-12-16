import { homedir } from "node:os";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { loggingMessages } from "../operations/logging-mesages.js";
import { handleWriteline } from "./handle-writeline.js";

export const startCli = async () => {
    loggingMessages.greeting('--username')
    loggingMessages.showCurrentDirectory(homedir())

    const readline = createInterface({ input, output });

    readline.on('line', (chunk) => handleWriteline(chunk, readline));

    readline.on('SIGINT', () => {
        loggingMessages.goodbye('--username')
        readline.close()
    });
};