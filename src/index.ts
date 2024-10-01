// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Home } from './pages/home'
import { extract, install } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'
import { HtmlEscapedString } from 'hono/utils/html'
import { createLink, getLink, Link } from "./services/linkService";
import { HTTPException } from "hono/http-exception";
import { csrf } from "hono/csrf";
import { SafeMode } from "./pages/safemode";
import { renderNotFound } from "./pages/notfound";
import { renderError } from "./pages/error";
import { secureHeaders } from "hono/secure-headers";

export type Env = {
    KV: KVNamespace,
    DB: D1Database,
    LINK_SHARED_SECRET: string
    SHORT_DOMAIN: string
    DEFAULT_LINK_TTL: number
    LANDING_URL: string
    GITHUB_URL: string
    TWITTER_URL: string
    META_OG_IMAGE: string
}

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

const app = new Hono<{ Bindings: Env }>();

app.use(
    '*',
    secureHeaders({
        xFrameOptions: 'DENY',
        xXssProtection: '1',
    })
)

app.use('/url', csrf())

app.notFound((c) => {
    return c.html(ssrTailwind(renderNotFound(c)))
})

app.onError((err, c) => {
    if (err instanceof HTTPException) {

        if (err.status === 404) {
            return c.html(ssrTailwind(renderNotFound(c)), 404)
        } else if (err.status === 400) {
            return c.text('Invalid input', 400)
        }

        return c.html(ssrTailwind(renderError(err.status)), err.status)
    }

    return c.html(ssrTailwind(renderError(500)), 500)
})

app.get('/*', serveStatic({ root: './', manifest }))

app.get('/favicon.ico', serveStatic({  path: './favicon.ico', manifest }))

app.post('/url', async (c) => {
    return c.text(await createLink(c), 200)
})

app.get('/', (c) => {
  return c.html(ssrTailwind(Home(c)))
})

app.get('/:slug', async (c) => {
    const link: Link = await getLink(c)

    if (link.metadata?.safeMode === false) {
        return c.redirect(link.targetUrl, 301)
    }

    return c.html(ssrTailwind(SafeMode(c, link.targetUrl)))
})

export default app
