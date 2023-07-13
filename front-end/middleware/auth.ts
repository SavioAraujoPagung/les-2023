import Swal from "sweetalert2";
import { acceptedPages } from "~~/models/Usuario";

const isAuthenticated = () => localStorage.getItem("session") !== null ;
const getOffice = () => (localStorage.getItem("session") !== null ? localStorage.getItem("session") : 9);
export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client && !isAuthenticated()){
        Swal.fire({
            icon: 'error',
            title: "É necessário fazer login para navegar pelo site",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
        return navigateTo('/login')
    }
    else if(process.client && !acceptedPages[getOffice()](to.name)){
        return navigateTo('');
    }
    else if(to.name === "logout"){
        localStorage.removeItem("session");
        return { name: "login" }
    }
  })