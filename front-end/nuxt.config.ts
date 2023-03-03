// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    
    app: {
        head: {
            title: 'LES Group',
        }
    },

    css: ["~/assets/styles/style.scss"], // add

})
