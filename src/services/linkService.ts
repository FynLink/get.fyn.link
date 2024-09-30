import { Context } from "hono";
import { BodyData } from "hono/utils/body";
import * as Crypto from '../utils/crypto';
import * as Slug from '../utils/slug';
import { HTTPException } from "hono/http-exception";

export async function getLink(c: Context) {
    const slug: string = c.req.param('slug')
    const shortUrl: string = c.env.SHORT_DOMAIN + '/' + slug
    const hashedShortUrl: string = await Crypto.sha256Hash(shortUrl)
    const encryptedTargetUrl = await c.env.KV.get(hashedShortUrl)

    if (!encryptedTargetUrl) {
        throw new HTTPException(404)
    }

    return Crypto.aesDecrypt(encryptedTargetUrl, shortUrl)
}

export async function createLink(c: Context) : Promise<string> {
    const body: BodyData = await c.req.parseBody()

    if (! checkIfValidUrl(<string>body.targetUrl)) {
        throw new HTTPException(400)
    }

    const slug: string = await Slug.Generate()
    const shortUrl: string = c.env.SHORT_DOMAIN + '/' + slug
    const hashedShortUrl = await Crypto.sha256Hash(shortUrl)

    if (await c.env.KV.get(hashedShortUrl)) {
        throw new HTTPException(409)
    }

    await c.env.KV.put(
        hashedShortUrl,
        await Crypto.aesEncrypt(shortUrl, <string>body.targetUrl),
        <any>{ expirationTtl: c.env.DEFAULT_LINK_TTL }
    )

    return shortUrl
}

function checkIfValidUrl(url: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

    return urlRegex.test(url)
}
