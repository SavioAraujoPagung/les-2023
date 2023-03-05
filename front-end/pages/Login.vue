<template>
    <main class="d-flex align-items-center justify-content-center bg-gradient-primary">
        <div class="d-flex align-items-center justify-content-center h-100 w-100">

            <form class="bg-gradient-primary h-100 col-sm-6 rounded-4 p-5 d-flex align-items-center flex-column justify-content-center">
                <h1 class="fw-bold text-white display-6">Faça seu login</h1>
                <div class="mt-5 col-sm-10">
                    <div class="mb-3">
                        <label for="usuario" class="form-label text-white">Usuário</label>
                        <input type="text" name="usuario" id="usuario" class="form-control p-3" placeholder="Ex: usuarioteste" v-model="user.email">
                    </div>
                    <div>
                        <label for="senha" class="form-label text-white">Senha</label>
                        <input type="password" name="senha" id="senha" class="form-control p-3" placeholder="Ex: senhateste" v-model="user.password">
                    </div>
                    <button type="button" class="btn btn-dark text-white fw-bold mt-5 col-sm-12" @click="doLogin(user)">Entrar</button>
                </div>
            </form>

        </div>
    </main>
</template>

<script lang="ts">
import { useAuthStore } from "~/stores/AuthStore";
definePageMeta({
    layout: false
});
export default defineComponent({
    setup() {

        const { user, doLogin } = useAuthStore();

        return { user, doLogin };
    },
})
</script>
