import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'

const app = new Hono()

app.use('/*', serveStatic({ root: './', manifest }))

app.get('/favicon.ico', serveStatic({  path: './favicon.ico', manifest }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
