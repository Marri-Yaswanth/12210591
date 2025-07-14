import {nanoid} from 'nanoid'
import geoip from 'geoip-lite'
import {urlStore , ShortURL} from  '../db/store'
import {log} from '../../../logging middleware/logging'

const Host = process.env.HOST || 'http://localhost:3000'

export async function createShortURL(
    longURL: string,
    validity?: number,
    customCode? : string
) {
    validity = validity ?? 30;
    const code = customCode || nanoid(6)

    if(urlStore[code]){
        await log({
            stack: 'backend',
            level: 'error',
            package: 'handler',
            message: `ShortCode already exists: ${code}`
        })
        throw new Error('ShortCode already exists. Please choose another one.')
    }
    
    const now = new Date()
    const expires = new Date(now.getTime()+validity*60000)

    urlStore[code] = {
        longURL,
        createdAt: now,
        expiresAt: expires,
        clicks: []
    }

    await log({
        stack: 'backend',
        level: 'info',
        package: 'repository',
        message: `ShortURL created with code: ${code}`
    })

    return{
        shortLink: `${Host}/${code}`,
        expiry: expires.toISOString(),
    }
}

export async function getAnalytics(code: string){
    const data = urlStore[code]
    if(!data){
        await log({
            stack: 'backend',
            level: 'error',
            package: 'repository',
            message: `Analytics request failed for shortcode: ${code}`
        })
        throw new Error('Shortcode not found')
    }

    return{
        totalClicks: data.clicks.length,
        originalURL: data.longURL,
        createdAt: data.createdAt.toISOString(),
        expiresAt: data.expiresAt.toISOString(),
        clicks: data.clicks,
    }
}

export async function handleRedirect(code: string, req: any){
    const data = urlStore[code]
    if(!data){
        await log({
            stack: 'backend',
            level: 'error',
            package: 'handler',
            message: `Redirect failed for shortcode: ${code}`
        })
        throw new Error('Shortcode not found')
    }

    if(new Date() > data.expiresAt){
        await log({
            stack: 'backend',
            level: 'error',
            package: 'handler',
            message: `Link expired for shortcode: ${code}`
        })
        throw new Error('Link has expired')
    }

    const ip = req.ip
    const geo = geoip.lookup(ip)
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown'

    data.clicks.push({
        timestamp: new Date(),
        referrer: req.get('Referrer') || 'Direct',
        location: location,
    })

    await log({
        stack: 'backend',
        level: 'info',
        package: 'handler',
        message: `Redirecting for shortcode: ${code} from ${location}`
    })
    return data.longURL
}