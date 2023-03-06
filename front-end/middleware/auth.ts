import Swal from "sweetalert2";

const isAuthenticated = () => localStorage.getItem("isLogged");
export default defineNuxtRouteMiddleware((to, from) => {
    // if (process.client && !isAuthenticated()){
    //     Swal.fire({
    //         icon: 'error',
    //         title: "É necessário fazer login para navegar pelo site",
    //         toast: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 2000
    //     });
    //     return navigateTo('/login')
    // }
    // else if(to.name === "logout"){
    //     localStorage.removeItem("isLogged");
    //     return { name: "login" }
    // }
  })
  