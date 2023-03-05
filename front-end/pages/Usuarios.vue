<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Usu&aacute;rios</h1>
        <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
    </header>
    
    <DefaultTable v-if="entities.length">
        <DefaultTableThead>
            <th>Nome</th>
            <th>Fun&ccedil;&atilde;o</th>
        </DefaultTableThead>
        <tbody>
            <DefaultTableTrow v-for="(usuario, i) in entities" :key="i" :id="'usuario'+usuario.id" @delete="deleteElement(usuario.id)" @edit="showFormEdit(usuario.id)">
                <td>{{ usuario.name }}</td>
                <td>{{ usuario.office }}</td>
            </DefaultTableTrow>
        </tbody>
    </DefaultTable>

    <div v-else>
        <h5>Nenhum registro encontrado...</h5>
    </div>

    <!-- <UsersUserForm :isOpen="false" /> -->

    <component :is="modalForm" :open="isOpen" @close="cancelChange" @saved="refreshList" />

</template>

<script lang="ts">
import { Cargos } from '~~/models/Usuario';
import { useUserStore } from '~~/stores/UserStore';

export default defineComponent({
    setup() {
        
        const modalForm = shallowRef(resolveComponent('div'));

        const isOpen = ref(false);

        const { entities, destroy, getAll } = useUserStore();

        const cancelChange = () => {
            modalForm.value = resolveComponent('div');
        }

        const refreshList = () => {
            modalForm.value = resolveComponent('div');
        }

        const deleteElement = (id:any) => {
            destroy(id);
        }

        const showFormEdit = (id:any) => {
            showForm();
        }

        const showForm = () => {
            modalForm.value = resolveComponent('UsersUserForm')
        }

        onMounted(getAll);

        return { entities, Cargos, modalForm, isOpen, cancelChange, refreshList, deleteElement, showFormEdit, showForm };

    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>