import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap', rel: 'stylesheet' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/masonry.js', ssr: false },
    { src: '~/plugins/vue-select', ssr: true }
  ],
  loading: {
    color: 'white',
    height: '2px'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv'
  ],
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: '/auth',
        endpoints: {

          login: { url: '/login', method: 'post', propertyName: false },
          refresh: { url: '/refresh', method: 'post', propertyName: false },
          user: { url: '/me', method: 'post', propertyName: false },
          logout: { url: '/logout', method: 'post', propertyName: false }

        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
      // local: {
      //   scheme: 'refresh',
      //   token: {
      //     property: 'token',
      //     maxAge: 3600,
      //     global: true
      //     // type: 'Bearer'
      //   },
      //   refreshToken: {
      //     property: 'token',
      //     data: 'token',
      //     maxAge: 60 * 60 * 24 * 30
      //   },
      //   user: {
      //     property: false
      //     // autoFetch: true
      //   },
      //   endpoints: {
      //     login: { url: '/auth/login', method: 'post' },
      //     refresh: { url: '/auth/refresh', method: 'post' },
      //     user: { url: '/auth/me', method: 'post' },
      //     logout: { url: '/auth/logout', method: 'post' }
      //   }
      //   // autoLogout: false
      // }
    }
  },
  toast: {
    position: 'top-center',
    duration: 2000,
    theme: 'bubble',
    keepOnHover: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://back.ramzes.serbin.co/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
