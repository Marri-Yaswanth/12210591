import {log} from '../logging'
import dotenv from 'dotenv'
dotenv.config()

async function main(){
    await log({
        stack: 'backend',
        level: 'info',
        package: 'handler',
        message: 'Starting application...'
    })

    await log({
        stack: 'backend',
        level: 'error',
        package: 'handler',
        message: 'Received string, expected number.'
    })
}

main()