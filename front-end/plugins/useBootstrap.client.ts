import * as bootstrap from "bootstrap/dist/js/bootstrap.js";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            bootstrap: bootstrap
        }
    }
})