// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Home } from './home'
import { extract, install } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'
import { HtmlEscapedString } from 'hono/utils/html'

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

const app = new Hono()

app.use('/*', serveStatic({ root: './', manifest }))

app.get('/favicon.ico', serveStatic({  path: './favicon.ico', manifest }))

app.post('/url', (c) => {
  const url =  c.req.parseBody()
  return c.text('Test')
})
app.get('/', (c) => {
  return c.html(ssrTailwind(Home))
})

export default app
