import { sep } from "node:path";

class FileSystem {
    getParentDirname(dirname) {
        const splitedDirname = dirname.split(sep)
        splitedDirname.pop()
        const parentDirname = splitedDirname.join(sep)
        return parentDirname
    }
}

export const fileSystem = new FileSystem()