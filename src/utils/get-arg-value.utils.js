export const getArgValue = key => {
    const findedArg = process.argv.find((arg) => arg.startsWith(key)) ?? ''
    return findedArg.slice(key.length + 1)
}