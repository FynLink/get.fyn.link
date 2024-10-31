import { html } from "hono/html";
import { Context } from "hono";

export async function Home(c: Context) {
    return html`<!doctype html>
    <html class="no-js" lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Free URL shortener | By Fynlink</title>
        <meta name="description" content="Private & free URL shortener with QR code.">

        <meta property="og:title" content="Free private URl shortener - By FynLink">
        <meta property="og:description" content="The best free & private URL shortener.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${c.env.LANDING_URL}">
        <meta property="og:site_name" content="Get FynLink">
        <meta property="og:image" content="${c.env.META_OG_IMAGE}">
        <meta property="og:image:alt" content="Get FynLink">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/icon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/icon.png">

        <link rel="manifest" href="/site.webmanifest">
        <meta name="theme-color" content="#fafafa">
        <link rel="stylesheet" href="/css/toastify.min.css">
        <link rel="stylesheet" href="/css/style.css">
        <script defer src="/js/htmx.min.js"></script>
        <script defer src="/js/qrcode.min.js"></script>
        <script defer src="/js/confetti.browser.min.js"></script>
        <script defer src="/js/toastify-js.js"></script>
        <script defer src="/js/app.js"></script>
        <style>
            .spinner {
                border: 2px solid #f3f3f3;
                border-top: 2px solid #3498db;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                animation: spin 1s linear infinite;
                display: inline-block;
                margin-right: 8px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
    <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="/" class="-m-1.5 p-1.5">
                        <span class="sr-only">Get Fyn Link</span>
                        <img class="h-8 w-auto" src="/images/fyn.webp" alt="">
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button onclick="openMobileMenu()" id="mobileMenuButton" type="button"
                            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                             aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a href="https://github.com/FynLink/get.fyn.link"
                       class="text-sm font-semibold leading-6 text-gray-900">Source</a>
                    <a href="https://github.com/FynLink/get.fyn.link/blob/main/TERMS.md" class="text-sm font-semibold leading-6 text-gray-900">Terms</a>
                    <a href="https://github.com/FynLink/get.fyn.link/blob/main/PRIVACY.md" class="text-sm font-semibold leading-6 text-gray-900">Privacy</a>
                    <a href="https://github.com/FynLink/get.fyn.link/blob/main/ABOUT.md" class="text-sm font-semibold leading-6 text-gray-900">About</a>
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="https://fyn.link" class="text-sm font-semibold leading-6 text-gray-900">Fyn.link <span
                            aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>
            <div id="mobileMenu" class="hidden" role="dialog" aria-modal="true">
                <div class="fixed inset-0 z-50"></div>
                <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Get Fyn link</span>
                            <img class="h-8 w-auto" src="/images/fyn.webp" alt="">
                        </a>
                        <button onclick="closeMobileMenu()" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor"
                                 aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="space-y-2 py-6">
                                <a href="https://github.com/FynLink/get.fyn.link"
                                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Source</a>
                                <a href="https://github.com/FynLink/get.fyn.link/blob/main/TERMS.md"
                                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Terms</a>
                                <a href="https://github.com/FynLink/get.fyn.link/blob/main/PRIVACY.md"
                                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Privacy</a>
                                <a href="https://github.com/FynLink/get.fyn.link/blob/main/ABOUT.md"
                                   class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About</a>
                            </div>
                            <div class="py-6">
                                <a href="https://fyn.link"
                                   class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Fyn.link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="relative isolate px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                 aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                     style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
            </div>
            <div class="mx-auto max-w-2xl py-24 sm:py-36 lg:py-48">
                <div class="hidden mb-12 sm:mb-8 sm:flex sm:justify-center">
                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Want more control for your short URL? <a href="https://fyn.link" target="_blank" rel="noopener noreferrer" class="font-semibold text-indigo-600"><span
                            class="absolute inset-0" aria-hidden="true"></span>Join FynLink <span
                            aria-hidden="true">&rarr;</span></a>
                    </div>
                </div>
                <div class="text-center">
                    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">The best <span
                            class="relative font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400">Free & Private </span>URL
                        shortener!</h1>
                    <p class="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 px-4 sm:px-0">No account required. Free, fast, private & open source URL shortener. Short URL is stored as  <a
                                href="https://docs.fyn.link/help/private-link#how-is-a-private-link-stored-in-cache" target="_blank" rel="noopener noreferrer"
                                class="text-indigo-600">hash value & target link is encrypted</a> using a unique key.</p>
                </div>
                <div class="mt-24 sm:mt-16 flex items-center justify-center">
                    <div class="max-w-lg w-full">
                        <div class="min-w-0 flex-1">
                            <form id="targetUrlForm" data-hx-target="#resultDiv" data-hx-post="/url" hx-indicator="#spinner">
                                <div class="border-b border-gray-200 focus-within:border-indigo-600">
                                    <label for="comment" class="sr-only">Target URL</label>
                                    <textarea rows="3" name="targetUrl" id="targetUrl"
                                              class="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-600 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
                                              placeholder="Paste target URL here (Eg: https://example.com/very-long-url)"></textarea>
                                </div>
                                <div class="flex justify-between pt-2">
                                    <div class="flex items-center space-x-5">
                                        <div class="flow-root">
                                            <div class="-m-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
                                                </svg>

                                                <span class="sr-only">Private link</span>
                                            </div>
                                        </div>
                                        <div class="flow-root">
                                            <div class="-m-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                                </svg>

                                                <span class="sr-only">Safe mode enabled</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <button disabled type="submit" id="submitButton"
                                                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            <span id="spinner" class="htmx-indicator spinner hidden"></span>Create Short Link
                                        </button>
                                    </div>
                                </div>
                                <div id="errorBlock" class="hidden rounded-md bg-red-50 p-4 mt-6">
                                    <div class="flex">
                                        <div class="flex-shrink-0">
                                            <svg class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-red-600">Invalid target URL. Please enter a valid URL.</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div id="resultContainer" class="hidden">
                                <div class="bg-white shadow sm:rounded-lg">
                                    <div class="px-4 py-5 sm:p-6">
                                        <div>
                                            <div class="rounded-md bg-gray-50 px-5 py-5 sm:flex sm:items-start sm:justify-between">
                                                <h4 class="sr-only">QR Code</h4>
                                                <div class="sm:flex sm:items-start">
                                                    <div id="qrcode" class="hidden sm:block cursor-pointer">

                                                    </div>
                                                    <div class="mt-3 sm:ml-4 sm:mt-0">
                                                        <div id="resultDiv" data-hx-target="#resultDiv"
                                                             class="text-sm font-medium text-indigo-600"></div>
                                                        <div class="mt-2 text-xs text-gray-500 sm:flex sm:items-center">
                                                            <div>This link will expire on <span id="expiry-time"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                                                    <button id="copyButton" type="button"
                                                            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-gray-500 underline cursor-pointer text-sm mt-5 text-center">
                                    <a href="/">Create new short URL</a>
                                </div>
                            </div>
                            <!-- Browser Extension Buttons -->
                            <div class="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0 max-w-5xl mx-auto">
                                <a href="https://chrome.google.com/webstore/detail/efgnapmffnnnddillgmidpfpchdikmii" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[240px] whitespace-nowrap">
                                    <img src="/images/chrome-logo.png" alt="Chrome" class="h-5 w-5 mr-2">
                                    <span>Chrome Web Store</span>
                                </a>
                                <a href="https://microsoftedge.microsoft.com/addons/detail/onmkncmhdgpkejegpomfpddeegfmhkkm" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[240px]">
                                    <img src="/images/edge-logo.png" alt="Edge" class="h-5 w-5 mr-2">
                                    <span>Edge Add-ons</span>
                                </a>
                                <a href="https://addons.mozilla.org/en-US/firefox/addon/fynlink-private-url-shortener/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[240px]">
                                    <img src="/images/firefox-logo.png" alt="Firefox" class="h-5 w-5 mr-2">
                                    <span>Firefox Add-ons</span>
                                </a>
                            </div>
                            <p class="mt-4 text-sm text-gray-500 px-4 sm:px-0 text-center">Get our browser extension for more customization options </p>
                            <p class="mt-1 text-sm text-gray-500 px-4 sm:px-0 text-center">No account or API key required</p>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
                     aria-hidden="true">
                    <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                         style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
                </div>
            </div>
        </div>
        <footer>
            <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div class="flex justify-center space-x-6 md:order-2">
                    <a href="${c.env.TWITTER_URL}" class="text-gray-400 hover:text-gray-500">
                        <span class="sr-only">X</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                        </svg>
                    </a>
                    <a href="${c.env.GITHUB_URL}" class="text-gray-400 hover:text-gray-500">
                        <span class="sr-only">GitHub</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </a>
                </div>
                <div class="mt-8 md:order-1 md:mt-0">
                    <p class="text-center text-xs leading-5 text-gray-500">&copy; ${new Date().getFullYear()} FynLink,
                        LLC.
                        All
                        rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
    </body>
    </html>`
}