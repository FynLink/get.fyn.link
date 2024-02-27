import { html } from "hono/html";

export async function renderError(errorCode: number) {
    return html`<!doctype html>
    <html class="h-full" lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Something went wrong | Error ${errorCode}</title>
    </head>
    <body class="h-full">
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
            <h1 class="text-6xl md:text-8xl font-semibold text-indigo-600">${errorCode}</h1>
            <h2 class="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Sorry, something went wrong!</h2>
            <p class="mt-6 text-base leading-7 text-gray-600">This error has been reported to the admin.</p>
            <div class="mt-4">
                <a href="/" class="text-indigo-600 font-semibold hover:underline focus-visible:outline focus-visible:outline-2 underline">Take me home!</a>
            </div>
        </div>
    </main>
    </body>
    </html>`
}