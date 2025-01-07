# Get FynLink

The free, fast, private & open source URL shortener. 

[https://create.fyn.link](https://create.fyn.link)


## Tech stack

- [Hono](https://hono.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Htmx](https://htmx.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)

## Run locally

- Rename `wrangler.toml.sample` to `wrangler.toml` and change the content as required.
- Rename `.dev.vars.sample` to `.dev.vars`
- Update the value of `LINK_SHARED_SECRET` in `.dev.vars` with a random `32 byte` string.

### Run the following commands

```
npm install
npm run dev
```

## Deploy to Cloudflare

- Update `LINK_SHARED_SECRET` in cloudflare and then deploy.

```
wrangler secret put LINK_SHARED_SECRET
npm run deploy
```

## To do
- UI for custom link expiry (maximum 7 days, min 5 minutes)
- Update test cases

## License

See LICENSE.md.
