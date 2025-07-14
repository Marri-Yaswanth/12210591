export interface ShortURL{
    longURL: string
    createdAt: Date
    expiresAt: Date
    clicks: Array<{
        timestamp: Date
        referrer: string
        location: string
    }>
}

export const urlStore: Record<string , ShortURL> = {}