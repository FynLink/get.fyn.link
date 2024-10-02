import * as FynCrypto from '../../src/utils/crypto'

describe('Crypto Functions', () => {
    describe('encryption and decryption', () => {
        test('encrypts and decrypts URL', async () => {
            const targetUrl = 'https://example.com/test'
            const shortUrl = 'fyn.is/test'
            const encrypted = await FynCrypto.aesEncrypt(shortUrl, targetUrl)
            expect(encrypted).toBeDefined()

            const decrypted = await FynCrypto.aesDecrypt(encrypted, shortUrl)
            expect(decrypted).toEqual(targetUrl)
        })

        test('produces different ciphertexts for same plaintext with different short URLs', async () => {
            const targetUrl = 'https://example.com/test'
            const shortUrl1 = 'fyn.is/test1'
            const shortUrl2 = 'fyn.is/test2'
            
            const encrypted1 = await FynCrypto.aesEncrypt(shortUrl1, targetUrl)
            const encrypted2 = await FynCrypto.aesEncrypt(shortUrl2, targetUrl)
            
            expect(encrypted1).not.toEqual(encrypted2)
        })
    })

    describe('hashing', () => {
        test('produces consistent hash for same input', async () => {
            const data = 'fyn.is/demo'
            const hash1 = await FynCrypto.sha256Hash(data)
            const hash2 = await FynCrypto.sha256Hash(data)

            expect(hash1).toEqual(hash2)
        })

        test('produces different hashes for different inputs', async () => {
            const hash1 = await FynCrypto.sha256Hash('fyn.is/abc')
            const hash2 = await FynCrypto.sha256Hash('fyn.is/xyz')

            expect(hash1).not.toEqual(hash2)
        })

        test('produces hash of correct length', async () => {
            const hash = await FynCrypto.sha256Hash('test data')
            expect(hash.length).toBe(64)
        })
    })
})