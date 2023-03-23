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

    <div class="d-flex align-items-center justify-content-center p-5" v-else>
        <LoadersCubeLoader />
    </div>

    <component :is="isOpen ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { Cargos } from '~~/models/Usuario';
import { useUserStore } from '~~/stores/UserStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        
        const { $swal } = useNuxtApp()

        const modalForm = shallowRef(resolveComponent('UsersUserForm'));

        const isOpen = ref(false);

        const { destroy, getAll, getById, resetEntity } = useUserStore();
        const { entities } = storeToRefs(useUserStore());

        const cancelChange = () => {
            resetEntity();
            isOpen.value = false;
        }

        const refreshList = async () => {
            isOpen.value = false;
            $swal.fire({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            resetEntity();
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
            isOpen.value = true;
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