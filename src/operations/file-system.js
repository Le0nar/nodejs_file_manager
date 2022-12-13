import { access } from "node:fs/promises";
import { sep } from "node:path";

class FileSystem {
    getParentDirname(dirname) {
        const splitedDirname = dirname.split(sep)

        if (splitedDirname.length === 1) return dirname

        splitedDirname.pop()
        const parentDirname = splitedDirname.join(sep)
        return parentDirname
    }

    async checkDirectoryExist(path) {
        try {
            await access(path)
            return true
        } catch {
            return false
        }
    }
}

export const fileSystem = new FileSystem()