import { createReadStream } from "node:fs";
import { access, appendFile, readdir } from "node:fs/promises";

class FileSystem {
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

    async catenateFile(path) {
        try {
            await access(path)

            const readable = createReadStream(path)
            readable.on('end', () => console.log(''))
            readable.pipe(process.stdout)
        } catch {
            console.log('Operation failed')
        }
    }

    createFile(path) {
        try {
            appendFile(path, '')
        } catch (err) {
            console.log('Operation failed')
        }

    }
}

export const fileSystem = new FileSystem()