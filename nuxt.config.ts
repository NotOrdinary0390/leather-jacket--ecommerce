// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from "axios";

export default defineNuxtConfig({
  site: {
    url: process.env.APP_URL,
  },
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      MEDIA_URL: process.env.MEDIA_URL,
      APP_URL: process.env.APP_URL,
      ENABLE_CACHE: process.env.ENABLE_CACHE
    }
  },
  routeRules: {
    "/proxy/**": {
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
        lang: "En",
      },
      link: [
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
        //   media: "screen",
        // },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Roboto:wght@400;700&display=swap",
        //   media: "screen",
        // },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/notie/dist/notie.min.css",
          media: "screen",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.6.0/css/glide.core.min.css",
          media: "screen",
        }
      ],
      script: [
        {
          src: "https://unpkg.com/notie",
          defer: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.6.0/glide.min.js'
        }
      ],
    },
  },
  sitemap: {
    cacheMaxAgeSeconds: 360, // 1 hour
    // @ts-ignore
    urls: async () => {
      const products = await axios.get(process.env.API_URL + '/products?no-paginate');
      const posts = await axios.get(process.env.API_URL + '/posts?no-paginate');
      const urls = [];

      for (const product of products.data.data.data) {
        if (product.slug) {
          urls.push({
            url: `/product/${product.slug}`,
            changefreq: 'weekly',
            priority: 0.8,
          });
        }
      }

      for (const post of posts.data.data.data) {
        if (post.slug) {
          urls.push({
            url: `/posts/${post.slug}`,
            changefreq: 'weekly',
            priority: 0.8,
          });
        }
      }

      return urls;
    },
  },
  modules: [
      '@nuxt/image',
      '@pinia/nuxt',
      'nuxt-simple-sitemap'
  ]
});
