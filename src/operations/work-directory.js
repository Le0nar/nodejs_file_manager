import { sep } from "node:path";

class WorkDirectory {
    // TODO: mb move filed for current work directory name here

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