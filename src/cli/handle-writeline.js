import { compression } from "../operations/compression.js"
import { fileSystem } from "../operations/file-system.js"
import { hash } from "../operations/hash.js"
import { loggingMessages } from "../operations/logging-mesages.js"
import { operatingSystem } from "../operations/operating-system.js"
import { workDirectory } from "../operations/work-directory.js"

export const handleWriteline = async (chunk, readline) => {
    const { currentDirectory } = workDirectory
    const splitedChunk = chunk.split(' ')
    const [commandName, firstArgument, secondArgument] = splitedChunk

    switch (commandName) {
        case '.exit':
            loggingMessages.goodbye('--username')
            readline.close()
            break;

        case 'up':
            const parentDirectory = workDirectory.getParentDirectory(currentDirectory)
            workDirectory.setCurrentDirectory(parentDirectory)
            loggingMessages.showCurrentDirectory(parentDirectory)
            break;

        case 'ls':
            fileSystem.listFiles(currentDirectory)
            break;

        case 'cd':
            await workDirectory.changeDirectory(firstArgument, currentDirectory)
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
}