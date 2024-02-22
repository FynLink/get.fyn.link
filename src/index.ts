// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Home } from './pages/home'
import { extract, install } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'
import { HtmlEscapedString } from 'hono/utils/html'
import { createLink, getLink } from "./services/linkService";
import { HTTPException } from "hono/http-exception";
import { csrf } from "hono/csrf";

export type Env = {
    KV: KVNamespace
    LINK_SHARED_SECRET: string
    SHORT_DOMAIN: string
    DEFAULT_LINK_TTL: number
}

const app = new Hono<{ Bindings: Env }>();

install(
    {
        presets: [
            presetTailwind()
        ],
    }
)

async function ssrTailwind(body: HtmlEscapedString | Promise<HtmlEscapedString>) {
  const { html, css } = extract((await body).toString())

  return html.replace('</head>', `<style data-twind>${css}</style></head>`)
}

app.notFound((c) => {
    return c.text('Custom 404 Not Found', 404)
})

app.onError((err, c) => {
    console.error(`${err}`)
    if (err instanceof HTTPException) {
        // Get the custom response
        return err.getResponse()
    }
    return c.text('Custom Error Message', 500)
})

app.use('/*', serveStatic({ root: './', manifest }))

app.use('/url', csrf())

app.get('/favicon.ico', serveStatic({  path: './favicon.ico', manifest }))

app.post('/url', async (c) => {
    return c.text(await createLink(c), 200)
})
app.get('/', (c) => {
  return c.html(ssrTailwind(Home))
})

app.get('/:slug', async (c) => {
    return c.redirect(await getLink(c))
})

export default app
