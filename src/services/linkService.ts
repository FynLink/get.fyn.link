import { Context } from "hono";
import { BodyData } from "hono/utils/body";
import * as Crypto from '../utils/crypto';
import * as Slug from '../utils/slug';
import { HTTPException } from "hono/http-exception";

export interface Link {
    targetUrl: string
    metadata: Metadata
}

export interface Metadata {
    safeMode: boolean
}

export async function getLink(c: Context): Promise<Link> {
    const slug: string = c.req.param('slug');
    const shortUrl: string = c.env.SHORT_DOMAIN + '/' + slug;
    const hashedShortUrl: string = await Crypto.sha256Hash(shortUrl);

    let { value: linkData, metadata } = await c.env.KV.getWithMetadata(hashedShortUrl);

    if (!linkData) {
        const result = await c.env.DB.prepare(
            "SELECT encryptedTarget, safeMode, ttl FROM links WHERE hashedShortUrl = ? AND expireAt > datetime('now')"
        ).bind(hashedShortUrl).first();

        if (!result) {
            throw new HTTPException(404, { message: "Link not found" });
        }

        const { encryptedTarget, safeMode, ttl } = result;
    
        linkData = encryptedTarget;
        metadata = { safeMode: safeMode === 1 };

        let options: KVNamespacePutOptions = { metadata: metadata }
        options.expirationTtl = parseInt(ttl);

        await c.env.KV.put(hashedShortUrl, encryptedTarget, options);
    }

    return {
        targetUrl: await Crypto.aesDecrypt(linkData, shortUrl),
        metadata: {
            safeMode: metadata.safeMode
        }
    };
}

export async function createLink(c: Context): Promise<string> {
    const body: BodyData = await c.req.parseBody();

    if (!checkIfValidUrl(<string>body.targetUrl)) {
        throw new HTTPException(400, { message: "Invalid URL" });
    }

    const slug: string = await Slug.Generate();
    const shortUrl: string = c.env.SHORT_DOMAIN + '/' + slug;
    const hashedShortUrl = await Crypto.sha256Hash(shortUrl);
    const result = await c.env.DB.prepare(
        "SELECT hashedShortUrl FROM links WHERE hashedShortUrl = ?"
    ).bind(hashedShortUrl).first();

    if (result) {
        throw new HTTPException(409, { message: "Link already exists" });
    }

    const encryptedTarget = await Crypto.aesEncrypt(shortUrl, <string>body.targetUrl);
    const safeMode = 1;
    const createdAt = new Date().toISOString();
    const ttl = c.env.DEFAULT_LINK_TTL;
    const expireAt = new Date(Date.now() + ttl * 1000).toISOString();

    await c.env.DB.prepare(
        "INSERT INTO links (hashedShortUrl, encryptedTarget, safeMode, createdAt, ttl, expireAt) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(hashedShortUrl, encryptedTarget, safeMode, createdAt, ttl, expireAt).run();

    return shortUrl;
}

function checkIfValidUrl(url: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

    return urlRegex.test(url)
}
