import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const Log_Endpoint = 'http://20.244.56.144/evaluation-service/logs'

const Allowed_Stacks = ['backend' , 'frontend']
const Allowed_Levels = ['debug' , 'info', 'warn', 'error' , 'fatal']
const Allowed_Packages = [
    'cache',
    'controller',
    'cron job',
    'db',
    'domain',
    'handler',
    'repository'
]

const Auth_Token = process.env.Logging_Api_Token || " "

interface Log_Params {
    stack: 'backend' | 'frontend',
    level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
    package: typeof Allowed_Packages[number],
    message: string,
}

export async function log({stack , level , package: pkg , message}: Log_Params):
Promise<void>{
    try{
        if(!Allowed_Stacks.includes(stack)){
            throw new Error(`Stack "${stack}" is not allowed.`)
        }
        if(!Allowed_Levels.includes(level)){
            throw new Error(`Level "${level}" is not allowed.`)
        }
        if(!Allowed_Packages.includes(pkg)){
            throw new Error(`Package "${pkg}" is not allowed.`)
        }
        
        await axios.post(
            Log_Endpoint,
            {
                stack,
                level,
                package: pkg,
                message
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth_Token}`
                },
            }
        )
    }catch(err){
        const error = err as Error
        console.log('Logging failed: ' + error.message)
    }
}

