import { Generate } from "src/utils/slug";
describe('Generate slug', () => {

    test('new slug', async () => {
        const slug = await Generate()

        expect(slug).toBeDefined()
        expect(slug.length).toBe(7)
    })
})