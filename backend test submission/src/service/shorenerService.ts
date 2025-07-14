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
        await log('backend' , 'error' , 'handler' , `Shortcode collision: ${code}`)
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

    await log('backend' , 'info' , 'handler' , `Short URL created: ${code}`)

    return{
        shortLink: `${Host}/${code}`,
        expiry: expires.toISOString(),
    }
}

export async function getAnalytics(code: string){
    const data = urlStore[code]
    if(!data){
        await log('backend' , 'warn' , 'repository' , `Analytics fetch failed for ${code}`)
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
        await log('backend' , 'warn' , 'repository' , `Redirect failed for ${code}`)
        throuw new Error('Shortcode not found')
    }

    if(new Date() > data.expiresAt){
        await log('backend' , 'error' , 'handler' , `Shortcode expired: ${code}`)
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

    await log('backend' , 'info' , 'handler' , 'Redirecting to long URL: ' + data.longURL)
    return data.longURL
}