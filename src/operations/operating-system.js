import { EOL, cpus, homedir, userInfo } from "node:os";

class OperatingSystem {
    printOsInfo(key) {
        switch (key) {
            case '--EOL':
                console.log(JSON.stringify(EOL))
                break;

            case '--cpus':
                console.log(cpus())
                break;

            case '--homedir':
                console.log(homedir())
                break;

            case '--username':
                console.log(userInfo().username)
                break;

            case '--architecture':
                console.log(process.arch)
                break;

            default:
                console.log('Operation failed')
                break;
        }
    }
}

export const operatingSystem = new OperatingSystem()