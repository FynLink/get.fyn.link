function fromB64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

function fromUTF8(input: string): Uint8Array {
  return new TextEncoder().encode(input)
}

function generateRandomSalt(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(16))
}

async function generateKeyFromHKDF(inputString: string, salt: Uint8Array|ArrayBuffer): Promise<{ key: ArrayBuffer, salt: Uint8Array|ArrayBuffer }> {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(inputString),
        { name: "HKDF" },
        false,
        ["deriveBits"]
    )
    const key = await crypto.subtle.deriveBits(
        {
            name: "HKDF",
            hash: "SHA-256",
            salt: salt,
            info: new TextEncoder().encode("key"),
        },
        keyMaterial,
        256
    )

    return { key: key, salt: salt }
}

async function generateKey(data: string, ks: ArrayBuffer): Promise<CryptoKey>
{
    const keyData = await generateKeyFromHKDF(data, ks)
    const key: ArrayBuffer = keyData.key

    return await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-CBC', length: 256 },
        false,
        ['encrypt', 'decrypt']
    )
}

async function encryptData(data: string, key: ArrayBuffer, iv: Uint8Array, salt: Uint8Array) : Promise<string> {
    const keyForEncryption = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC" },
        false,
        ["encrypt"]
    )
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        keyForEncryption,
        new TextEncoder().encode(data)
    )
    const ivString = btoa(String.fromCharCode.apply(null, Array.from(iv)))
    const encryptedString = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(encryptedData))))

    return btoa(JSON.stringify({ iv: ivString, ks: btoa(String.fromCharCode.apply(null, Array.from(salt))), value: encryptedString }))
}

export async function aesEncrypt(shortUrl: string, target: string) {
    let keyData
    let salt = generateRandomSalt()
    const iv = crypto.getRandomValues(new Uint8Array(16))
    try {
        keyData = await generateKeyFromHKDF(shortUrl, salt)

        return await encryptData(target, keyData.key, iv, salt)
    } catch (error) {
        console.log("Native Web Crypto API not available. Falling back to js-crypto-utils library.")
    }
}

export async function aesDecrypt(encrypted: string, shortUrl: string): Promise<string> {
  const decoded = JSON.parse(atob(encrypted))
  const data = fromB64(decoded.value)
  const iv = fromB64(decoded.iv)
  const salt = fromB64(decoded.ks)
  const key = await generateKey(shortUrl, salt)
  const decrypted: ArrayBuffer = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, key, data)

  return new TextDecoder().decode(decrypted)
}

export async function sha256Hash(shortUrl: string): Promise<string> {
    const inputBytes = fromUTF8(shortUrl)
    const hashBuffer = await crypto.subtle.digest('SHA-256', inputBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}