import { getArgValue } from "../utils/get-arg-value.utils.js"

export const greeting = (key) => {
    const userName = getArgValue(key)
    console.log(`Welcome to the File Manager, ${userName}!`)
}