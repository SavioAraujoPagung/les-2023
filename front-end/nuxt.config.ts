// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: ['@pinia/nuxt'],
    app: {
        head: {
            title: 'LES Group',
        }
    },

    plugins: [
        { src: '~/plugins/font-awesome.ts' },
    ],

    css: ["~/assets/styles/style.scss", "sweetalert2/dist/sweetalert2.min.css", '@fortawesome/fontawesome-svg-core/styles.css' ], // add

})
