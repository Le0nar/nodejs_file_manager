import { createReadStream, createWriteStream } from "node:fs";
import { access, appendFile, readdir, rename, unlink } from "node:fs/promises";
import { basename, sep } from "node:path";

class FileSystem {
    async listFiles(path) {
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

    async createFile(path) {
        try {
            await appendFile(path, '')
        } catch (err) {
            console.log('Operation failed')
        }

    }

    async renameFile(path, newName) {
        try {
            const splittedPath = path.split(sep)
            splittedPath.pop()
            const directoryPath = splittedPath.join(sep)
            const newFilePath = `${directoryPath}${sep}${newName}`

            await rename(path, newFilePath)

        } catch {
            console.log('Operation failed')
        }
    }

    async copyFile(pathToFile, pathToNewDirectory) {
        try {
            await access(pathToFile)
            await access(pathToNewDirectory)

            const fileName = basename(pathToFile)
            const pathToNewFile = `${pathToNewDirectory}${sep}${fileName}`

            await appendFile(pathToNewFile, '')

            const readable = createReadStream(pathToFile)
            const writable = createWriteStream(pathToNewFile)
            readable.pipe(writable)
        } catch {
            console.log('Operation failed')
        }
    }

    async moveFile(pathToFile, pathToNewDirectory) {
        await this.copyFile(pathToFile, pathToNewDirectory)

        try {
            await unlink(pathToFile)
        } catch {
            console.log('Operation failed')
        }
    }

    async removeFile(path) {
        try {
            await unlink(path)
        } catch {
            console.log('Operation failed')
        }
    }
}

export const fileSystem = new FileSystem()