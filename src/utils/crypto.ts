// @ts-ignore
import { Buffer } from "node:buffer";

export async function encrypt(data: string, key: CryptoKey): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, key, new TextEncoder().encode(data));
    const ivString = btoa(String.fromCharCode.apply(null, Array.from(iv)));
    const encryptedString = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(encrypted))));

    return btoa(JSON.stringify({ iv: ivString, value: encryptedString }));
}

export async function decrypt(encrypted: string, key: CryptoKey): Promise<string>
{
    const decoded = JSON.parse(atob(encrypted));
    const data = Buffer.from(decoded.value, 'base64');
    const iv = await getIv(decoded.iv);
    const decrypted: ArrayBuffer = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, key, data.buffer);

    return new TextDecoder().decode(decrypted);
}

export async function key(data: string, sharedKey: string): Promise<CryptoKey>
{
    const hmac = await hmacHash(data, sharedKey);

    return await crypto.subtle.importKey(
        'raw',
        hmac,
        { name: 'AES-CBC', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function getIv(string: string): Promise<ArrayBuffer>
{
    const binaryString = atob(string);
    const data = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        data[i] = binaryString.charCodeAt(i);
    }

    return data.buffer;
}

export async function hash(string: string): Promise<string>
{
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hmacHash(data: string, secret: string): Promise<ArrayBuffer> {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        true,
        ['sign', 'verify']
    );

    return await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
}