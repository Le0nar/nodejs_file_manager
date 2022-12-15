import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

class Hash {
    async calculateFile(path) {
        try {
            const fileConent = await readFile(path, { encoding: 'utf8' })
            const hash = createHash('sha256').update(fileConent)

            const hex = hash.digest('hex');
            console.log(hex)
        } catch {
            console.log('Operation failed')
        }
    }
}

export const hash = new Hash()