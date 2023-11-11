// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      MEDIA_URL: process.env.MEDIA_URL,
      APP_URL: process.env.APP_URL
    }
  },
  routeRules: {
    "/api/**": {
      proxy: "https://api.staging.alessandragrimoldi.com/api/v1/**"
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },  
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: "En",  // it sets the language English
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Roboto:wght@400;700&display=swap"
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/notie/dist/notie.min.css"
        },
      ],
      script: [
        {
          src: "https://unpkg.com/notie",
        },
      ],
    },
  },
  modules: ["@nuxt/image", '@pinia/nuxt',]

})