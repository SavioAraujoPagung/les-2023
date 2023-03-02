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
    css: ["bootstrap/dist/css/bootstrap.min.css"], // add

    
})
