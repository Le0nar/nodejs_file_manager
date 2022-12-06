import { sep } from "node:path";

// TODO: handle call when top parent directory is 'C:' or same 
export const getParentDirname = (dirname) => {
    const splitedDirname = dirname.split(sep)
    splitedDirname.pop()
    const parentDirname = splitedDirname.join(sep)
    return parentDirname
}