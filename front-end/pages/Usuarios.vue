<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Usu&aacute;rios</h1>
        <a href="javascript:;" class="btn btn-primary text-white"><i class="bi bi-border-all"></i>Adicionar</a>
    </header>
    <DefaultTable>
        <DefaultTableThead>
            <th>Nome</th>
            <th>Fun&ccedil;&atilde;o</th>
        </DefaultTableThead>
        <tbody>
            <DefaultTableTrow v-for="(usuario, i) in usuarios" :key="i" :id="usuario.id">
                <td>{{ usuario.nome }}</td>
                <td>{{ Cargos[usuario.cargo] }}</td>

            </DefaultTableTrow>
        </tbody>
    </DefaultTable>
    <!-- <table class="table w-100 mt-3">
        <thead class="bg-primary text-white">
            <tr>
                <td class="text-start">Nome</td>
                <td class="text-end">Fun&ccedil;&atilde;o</td>
            </tr>
        </thead>
    </table> -->
</template>

<script lang="ts">
import {Usuario, Cargos} from '~~/models/Usuario';

export default defineComponent({
    setup() {
        let usuarios = []
        for(let i=0; i<3; i++){
            let usuario = new Usuario();
            usuario.nome = "Mikael";
            usuario.cargo = 2;
            usuarios.push(usuario)
        }
        return {usuarios, Cargos};
    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>