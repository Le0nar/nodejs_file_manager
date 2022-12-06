import { getArgValue } from "../utils/get-arg-value.utils.js"

export const goodbye = (key) => {
    const userName = getArgValue(key)
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
}