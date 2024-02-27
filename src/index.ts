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
import { SafeMode } from "./pages/safemode";
import {renderNotFound} from "./pages/notfound";

export type Env = {
    KV: KVNamespace
    LINK_SHARED_SECRET: string
    SHORT_DOMAIN: string
    DEFAULT_LINK_TTL: number
    LANDING_URL: string
    GITHUB_URL: string
    TWITTER_URL: string
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
    return c.html(ssrTailwind(renderNotFound(c)))
})

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        if (err.status === 404) {
            return c.html(ssrTailwind(renderNotFound(c)))
        } else if (err.status === 400) {
            return c.text('Invalid input', 400)
        }
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
  return c.html(ssrTailwind(Home(c)))
})

app.get('/:slug', async (c) => {
    return c.html(ssrTailwind(SafeMode(c, await getLink(c))))
})

export default app
