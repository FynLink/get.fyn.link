import { html } from "hono/html";
import { Context } from "hono";

export async function SafeMode(c: Context, targetLink: string) {
    return html`<!doctype html>
        <html class="h-full" lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Safe Mode | Link Preview</title>
            <script defer src="/js/qrcode.min.js"></script>
            <script defer src="/js/safemode.js"></script>
          </head>
          <body class="h-full">
            <main class="relative bg-gradient-to-r from-transparent via-violet-100 to-slate-50 grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div class="ring-1 ring-violet-100 text-center max-w-[90vw] lg:max-w-[50vw] p-10 flex flex-col items-center justify-center bg-white shadow-2xl rounded-lg">
                <div id="qrCode" class="hidden sm:block mb-10">
                </div>
                <div class="w-full p-2 py-4 rounded-lg ring-2 ring-slate-100 mb-5">
                  <p class="text-base text-l leading-7 text-purple-500 sm:text-xl">
                    <a id="shortUrl" class="text-slate-500 break-all">${c.req.url}</a>
                  </p>
                </div>
                <div class="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
                <div class="mt-2 w-full p-2 py-4 rounded-lg ring-2 ring-violet-200">
                  <h3 class="text-xl md:text-2xl font-semibold tracking-tight text-gray-600 ml-2 mr-2">This short URL will redirect to the following link:</h3>
                  <p class="mt-2 text-base text-l leading-7 text-purple-500 sm:text-xl break-all">
                    <a href="${targetLink}" target="_blank">${targetLink}</a>
                  </p>
                </div>
                <div class="mt-12 w-full flex items-center justify-center gap-x-6">
                  <a href="${targetLink}" class="rounded-md w-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</a>
                </div>
              </div>
              <footer class="absolute p-3 bottom-0 w-full text-sm text-center text-gray-400">Copyright &copy; ${new Date().getFullYear()} FynLink, LLC.</footer>
            </main>
          </body>
        </html>`
}
