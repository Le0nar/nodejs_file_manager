import { createReadStream } from "node:fs";
import { access, readdir } from "node:fs/promises";
import { sep } from "node:path";

class FileSystem {
    getParentDirname(dirname) {
        const splitedDirname = dirname.split(sep)

        if (splitedDirname.length === 1) return dirname

        splitedDirname.pop()
        const parentDirname = splitedDirname.join(sep)
        return parentDirname
    }

    async checkExist(path) {
        try {
            await access(path)
            return true
        } catch {
            return false
        }
    }

    async listFiles(path) {
        // TODO: rename it
        const list = await readdir(path, { withFileTypes: true })

        const files = []
        const directories = []

        list.forEach((item) => {
            const { name } = item

            if (item.isDirectory()) {
                directories.push({ Name: name, Type: 'directory' })
            }

            if (item.isFile()) {
                files.push({ Name: name, Type: 'file' })
            }
        })

        const changedList = [...directories, ...files]
        console.table(changedList)
    }

    catenateFile(path) {
        const isFileExist = this.checkExist(path)
        if (!isFileExist) {
            console.log('Operation failed')
            return
        }

        const readable = createReadStream(path)
        readable.on('end', () => console.log(''))
        readable.pipe(process.stdout)
    }
}

export const fileSystem = new FileSystem()