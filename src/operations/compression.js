import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { basename, sep } from "path";
import { pipeline } from "stream/promises";

class Compression {
    async _copyWithCompression(pathToFile, pathToDestination, compressionStream) {
        try {
            const fileName = basename(pathToFile)
            const writeFileName = `${pathToDestination}${sep}${fileName}`

            const readStream = createReadStream(pathToFile)
            const writeStream = createWriteStream(writeFileName)

            await pipeline(readStream, compressionStream, writeStream)
        } catch {
            console.log('Operation failed')
        }
    }

    async compress(pathToFile, pathToDestination) {
        const brotliCompress = createBrotliCompress()
        this._copyWithCompression(pathToFile, pathToDestination, brotliCompress)
    }

    async decompress(pathToFile, pathToDestination) {
        const brotliDecompress = createBrotliDecompress()
        this._copyWithCompression(pathToFile, pathToDestination, brotliDecompress)
    }
}

export const compression = new Compression()