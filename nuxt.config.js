import webpack from 'webpack'
import dynamicRoutes from './routes.json'
require('dotenv').config()

// const routesRepository = require('./api/repository/routes.repository')()
// routesRepository.fetchRoutes('en').then((data) => {})

let babelPlugins = [
  ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
]

if(process.env.NODE_ENV === "production"){
  babelPlugins.push("transform-remove-console")
}

export default {
  mode: 'universal',

  server: {
    host: 'localhost'
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      }
    ],
    script: [],

    link: [
      {
        rel: "preload",
        as: "style",
        href: "/fonts.css",
      }
    ]
  },

  // Client side environment variables.
  // @see https://nuxtjs.org/api/configuration-env
  env: {
    defaultLocale: 'en'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#FF5100'
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],

  serverMiddleware: ['~api/api.js'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/common',
    '~/plugins/eventBus.js',
    '~/plugins/i18n.js',
    "~/plugins/multiref.js",
    '~/plugins/reactive-provide.js',
    '~/plugins/contentful-plugin.js',
    { src: '~/plugins/synchronized-components.js', ssr: true },
    '~/plugins/global-components.js', // autoloading global components
    '~/plugins/vuex-router-sync'
  ],

  router: {
    middleware: ['i18n']
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/device',
    '@nuxtjs/router',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
  ],

  webfontloader: {
      custom: {
          families: ['StyreneA-Light'],
          urls: ['/fonts.css']
      },
      active: () => {
        window.dispatchEvent( new Event('fonts.loaded') );
        window._fontsAreLoaded = true
      }
  },

  pwa:{    
    icon: {
        source: './static/lbg-favicon.png',
        purpose: ['any', 'maskable']
    },
    workbox: {
        clientsClaim: false,
    },
    meta: {
        name: false,
        ogType: false,
        ogTitle: false,
        ogDescription: false,
        description: false,
        title: false,
        theme_color: '#000000'
    }
  },

  styleResources: {
    scss: ["~assets/css/design.scss"]
  },

  buildModules: [
    'nuxt-purgecss'
  ],

  /*
   ** Build configuration
   */
  build: {

    analyze: true,

    extractCSS: process.env.NODE_ENV === "production",

    watch: [
      '~/api/'
    ],

    // @TODO keep remove
    babel: {
      plugins: babelPlugins,
      sourceType: 'unambiguous'
    }
  },

  generate: {
    routes: [
      '/'
    ]
  }
}
