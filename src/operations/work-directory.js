import { lstat } from "node:fs/promises";
import { homedir } from "node:os";
import { sep } from "node:path";
import { loggingMessages } from "./logging-mesages.js";

class WorkDirectory {
    currentDirectory = homedir()

    setCurrentDirectory(path) {
        this.currentDirectory = path
    }

    async changeDirectory(firstArgument, currentDirectory) {
        if (firstArgument === '..') {
            const parentDirectory = workDirectory.getParentDirectory(currentDirectory)
            loggingMessages.showCurrentDirectory(parentDirectory)

            this.setCurrentDirectory(parentDirectory)
            return
        }

        try {
            const path = this.getPath(firstArgument, currentDirectory)
            const directoryStats = await lstat(path)
            const isDirectory = directoryStats.isDirectory()

            if (isDirectory) {
                loggingMessages.showCurrentDirectory(path)
                this.setCurrentDirectory(path)
            } else {
                console.log('Operation failed')
            }
        } catch {
            console.log('Operation failed')
        }
    }

    getParentDirectory(path) {
        const splittedPath = path.split(sep)

        if (splittedPath.length === 1) return path

        splittedPath.pop()
        const parentDirectoryPath = splittedPath.join(sep)
        return parentDirectoryPath
    }

    getPath(filePathOrFileName, workDirectoryPath) {
        let path = ''

        if (!filePathOrFileName) return path

        const isPath = filePathOrFileName.includes(sep) || filePathOrFileName.includes(':')
        if (isPath) {
            path = filePathOrFileName
        } else {
            const isSepLastChar = workDirectoryPath[workDirectoryPath.length - 1] === sep
            const calculatedPath = isSepLastChar ? `${workDirectoryPath}${filePathOrFileName}` : `${workDirectoryPath}${sep}${filePathOrFileName}`
            path = calculatedPath
        }

        return path
    }
}

export const workDirectory = new WorkDirectory()