import * as FynCrypto from '/src/utils/crypto.ts'

describe('Crypto Functions', () => {

    const sharedKey = 'eJjhiDd+iE134-m$3Mpd1ACuoAi00!aO'

    test('Test key derivation using HMAC', async () => {
        const data = 'fyn.is/demo'
        const derivedKey = await FynCrypto.key(data, sharedKey)

        expect(derivedKey).toBeDefined()
    })

    test('Test encryption', async () => {
        const targetUrl = 'https://example.com/this-is-a-very-long-url-for-testing'
        const shortUrl = 'fyn.is/demo'
        const key = await FynCrypto.key(shortUrl, sharedKey)
        const encrypted = await FynCrypto.encrypt(targetUrl, key)

        expect(encrypted).toBeDefined()
    })

    test('Test hashing', async () => {
        const data = 'fyn.is/demo'
        const hash = await FynCrypto.hash(data)

        expect(hash).toBeDefined()
        expect(hash).toBe('d191f60af8d38e49692a4a01a0f3a1063b9dda4b43ffbf1e2eb5cb006c2b46c9')
    })

    test('Test HMAC hashing', async () => {
        const data = 'fyn.is/demo'
        const hmacHash = await FynCrypto.hmacHash(data, sharedKey)
        expect(hmacHash).toBeDefined()

        const uint8Array1 = new Uint8Array(hmacHash)
        expect(uint8Array1.length).toBe(32)
    })

    test('Test IV generation', async () => {
        const iv = await FynCrypto.getIv('wmP5kUWk3CRRlRf9Bl8dgA==')
        expect(iv).toBeDefined();

        const uint8Array1 = new Uint8Array(iv);
        expect(uint8Array1.length).toBe(16)
    })
})