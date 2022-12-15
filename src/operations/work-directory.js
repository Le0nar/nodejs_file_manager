import { access } from "node:fs/promises";
import { sep } from "node:path";
import { loggingMessages } from "./logging-mesages.js";

class WorkDirectory {
    async changeDirectory(firstArgument, currentDirectory) {
        if (firstArgument === '..') {
            const parentDirectory = workDirectory.getParentDirname(currentDirectory)
            loggingMessages.showCurrentDirectory(parentDirectory)
            return parentDirectory
        }

        try {
            const path = this.getPath(firstArgument, currentDirectory)
            await access(path)

            loggingMessages.showCurrentDirectory(path)
            return path
        } catch {
            console.log('Operation failed')
            return currentDirectory
        }
    }

    // TODO: rename 'dirname' to path
    getParentDirname(dirname) {
        const splitedDirname = dirname.split(sep)

        if (splitedDirname.length === 1) return dirname

        splitedDirname.pop()
        const parentDirname = splitedDirname.join(sep)
        return parentDirname
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