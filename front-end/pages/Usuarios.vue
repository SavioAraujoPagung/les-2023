<template>
    <div>
        <Head><Title>{{ title }}</Title></Head>
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Usu&aacute;rios</h1>
            <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><font-awesome-icon icon="plus" /> Adicionar</a>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="entities.length">
                <DefaultTableThead>
                    <th>Nome</th>
                    <th>Fun&ccedil;&atilde;o</th>
                </DefaultTableThead>
                <tbody>
                    <DefaultTableTrow v-for="(user, i) in entities" :key="i" :id="'user'+user.id" @delete="deleteElement(user.id)" @edit="showFormEdit(user.id)">
                        <td>{{ user.name }}</td>
                        <td>{{ UserType[user.office] }}</td>
                    </DefaultTableTrow>
                </tbody>
            </DefaultTable>
            <div class="alert alert-info" v-else>
                <p class="fw-normal mb-0">Nenhum registro encontrado</p>
            </div>
        </div>
        
        <div class="d-flex align-items-center justify-content-center p-5" v-else>
            <LoadersCubeLoader />
        </div>
        
        <component :is="isOpen ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />
    </div>

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { UserType } from '~~/models/Usuario';
import { useUserStore } from '~~/stores/UserStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        
        const title = ref('Usuários - LES GROUP');

        const { $swal } = useNuxtApp()

        const modalForm = shallowRef(resolveComponent('UsersUserForm'));

        const isOpen = ref(false);

        const { destroy, getAll, getById, resetEntity } = useUserStore();
        const { entities, loading } = storeToRefs(useUserStore());

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

        const deleteElement = async (id:any) => destroy(id, document.getElementById("user" + id));

        const showFormEdit = async (id:any) => {
            await getById(id);
            showForm();
        }

        const showForm = () => {
            isOpen.value = true;
        }

        onMounted(getAll);

        return { entities, UserType, modalForm, isOpen, loading, cancelChange, refreshList, deleteElement, showFormEdit, showForm, title };

    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>