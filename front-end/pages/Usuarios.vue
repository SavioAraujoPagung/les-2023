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

    <component :is="modalForm" :open="isOpen" @close="cancelChange" @saved="refreshList" />

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { Cargos } from '~~/models/Usuario';
import { useUserStore } from '~~/stores/UserStore';

export default defineComponent({
    setup() {

        const { $swal } = useNuxtApp()

        const modalForm = shallowRef(resolveComponent('div'));

        const isOpen = ref(false);

        const { destroy, getAll, getById } = useUserStore();
        const { entities } = storeToRefs(useUserStore());

        const cancelChange = () => {
            modalForm.value = resolveComponent('div');
        }

        const refreshList = async () => {
            modalForm.value = resolveComponent('div');
            $swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            await getAll();
        }

        const deleteElement = async (id:any) => {
            destroy(id);
            $swal.fire({
                icon: 'success',
                title: 'Usuário deletado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("usuario" + id)?.classList.add("m-fadeOut");
            await getAll();
        }

        const showFormEdit = async (id:any) => {
            await getById(id);
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