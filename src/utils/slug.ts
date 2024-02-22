import { customAlphabet } from 'nanoid'

export async function Generate(): Promise<string> {
    const alphabet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const generateSlug = customAlphabet(alphabet, 7)

    return generateSlug()
}