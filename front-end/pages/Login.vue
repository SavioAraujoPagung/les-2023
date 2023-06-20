<template>
    <main id="loginPage" class="bg-gradient-animate p-0 min-vh-100 d-flex align-items-center">
        <Head><Title>{{ title }}</Title></Head>
        <div class="container p-0">

            <div class="rounded-3 overflow-hidden" id="loginContent" >
                <div class="bg-gradient-login ps-0 ps-xl-5">
                    <div class="p-5 h-100 col-xl-6">
                        <form v-on:submit.prevent="submitLogin(user)">

                            <div class="d-flex align-items-center my-md-5 pb-5">
                                <h2 class="text-white display-5 fw-bold">LES GROUP</h2>
                            </div>
                            <h1 class="h1 text-primary fw-bold lh-1">BEM VINDO DE VOLTA<span class=" text-white">!</span></h1>
                            <p class="text-white small mb-3 mb-md-5">Bem vindo de volta, por favor entre com seus dados.</p>

                            <div class="">
                                <div class="form-floating mb-3">
                                    <input type="text" name="usuario" id="usuario" class="form-control" placeholder="seu dado aqui" v-model="user.email" required>
                                    <label for="login" class="form-label">E-mail*</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="password" name="senha" id="senha" class="form-control" placeholder="seu dado aqui" data-type="togglePassword" v-model="user.password" required>
                                    <label for="senha" class="form-label">Senha*</label>
                                </div>
                                
                                <div class="d-flex flex-wrap-reverse flex-lg-nowrap align-items-center gap-3 pb-5">
                                    <button type="submit" class="m-0 mt-3 btn btn-grad text-white shadow-none text-dark flex-fill">Entrar</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/AuthStore";

definePageMeta({
    layout: false
});

export default defineComponent({
    setup() {

        const title = ref("Login - LES GROUP");

        const { $swal } = useNuxtApp()
        const { doLogin } = useAuthStore();
        const { user, errors } = storeToRefs(useAuthStore());

        const submitLogin = async (user:any) => {
            if(user.password != "" && user.email != "") await doLogin(user);
            if(errors.value !== ""){
                $swal.fire({
                    icon: 'error',
                    title: errors.value,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });

            }
            else{
                $swal.fire({
                    icon: 'success',
                    title: "Login efetuado com sucesso",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigateTo('usuarios');
            }

            errors.value = "";

        }

        return { user, doLogin, submitLogin, title };
    },
})
</script>

<style scoped>
 #loginContent{ background-image:url(https://www.flexpoint.com.br/shared/gg/img/bg6.jpg) }
</style>