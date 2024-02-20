const webpack = require("webpack");

module.exports = {
  env: {
    // prodURL: "https://crash-api.zoroplay.net",
    // devURL: "https://crash-api.zoroplay.net/",
    token: "",
  },
  toast: {
    position: "top-center",
    duration: 10000,
    fullWidth: true,
    fitToScreen: true,
    iconPack: "fontawesome",
  },
  axios: {
    // baseURL: "https://crash-api.zoroplay.net/api/v1",
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: "/users/sign-in", method: "post", propertyName: 'data.token', },
          refresh: { url: "/refresh", method: "get" },
          user: false,
          logout: false,
        },
      },
    },
    redirect: {
      login: "/?login=1",
      logout: "/",
      home: "/dashboard",
      user: "/dashboard",
      callback: "/",
    },
    plugins: ["~/plugins/auth.js"],
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Back Office | RaimaxBet ",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [
    "~/assets/sass/bootstrap/bootstrap.scss",
    "~/assets/css/buttons.css",
    "~/assets/css/advbuttons.css",
    "font-awesome/css/font-awesome.min.css",
    "~/assets/css/themify-icons/css/themify-icons.css",
    "flatpickr/dist/flatpickr.css",
    "nestable2/dist/jquery.nestable.min.css",
    "vue-multiselect/dist/vue-multiselect.min.css",
    "bootstrap-fileinput/css/fileinput.min.css",
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
    babel: {
      compact: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        "window.jQuery": "jquery",
      }),
    ],
  },
  plugins: [
    "~/plugins/bootstrap-vue",
    { src: "~/plugins/vue-persist.js", ssr: false },
    { src: "~/plugins/vue-notifications", ssr: false },
    { src: "~/plugins/vue-sweetalert", ssr: false },
    { src: "~/plugins/vue-select", ssr: false },
    "~/plugins/vue-form",
    "~/plugins/vee-validate",
    // { src: "~/plugins/axios", ssr: true },
    // "~/plugins/axios-interceptor",
    "~/plugins/util",
    { src: "~plugins/vue-chartjs.js", ssr: false },
    { src: "~plugins/flatpickr.js", ssr: false },
    { src: "~plugins/libs.js", ssr: false },
    { src: "~plugins/vue-js-toggle-button", ssr: false },
  ],
  modules: [
    "@nuxtjs/moment",
    "@nuxtjs/toast",
    "nuxt-imagemin",
    "nuxt-validate",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    // ['nuxt-flatpickr'],
    // Or if you have custom bootstrap CSS...
    ["bootstrap-vue/nuxt", { css: false, icons: false }],
    "@nuxtjs/laravel-echo",
  ],
  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "router-link-exact-active",
    middleware: ["auth"],
  },
  generate: {
    //   routes: function () {
    //     let players = axios.get('http://localhost:8070/api/utilities/cms/pages').then((res) => {
    //       return res.data.map((page) => {
    //         return '/cms/' + page.slug
    //       })
    //     })
    //     let agents = axios.get('http://localhost:8070/api/sports/tipsters/all', {params: {size: 20}}).then((res) => {
    //       return res.data.map((tipster) => {
    //         return '/Tipsters/Betslips/' + tipster.user_id
    //       })
    //     })
    //     return Promise.all([pages, tipsters]).then(values => {
    //       return values.join().split(',');
    //     });
    //   }
    fallback: true,
  },
  echo: {
    broadcaster: "pusher",
    key: "dqiuHEUEdSFgezRbsiB5",
    cluster: "sb1",
    wsHost: "sports-api.sportsbookengine.com",
    wsPort: 6001,
    wssPort: 6002,
    forceTLS: false,
    disableStats: true,
    encrypted: process.env.NODE_ENV === "production",
    enabledTransports: ["ws", "wss"],
  },
};
