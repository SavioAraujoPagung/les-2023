<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Clientes</h1>
        <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar Cliente</a>
    </header>

    
        <DefaultTable v-if="entities.length">
            <DefaultTableThead>
                <th class="col-m-4">Nome</th>
                <th class="col-sm-4">CPF</th>
                <th class="col-sm-4">Email</th>
            </DefaultTableThead>
            <tbody>
                <DefaultTableTrow v-for="(customer, i) in entities" :key="i" :id="'customer'+customer.id" @delete="deleteElement(customer.id)" @edit="showFormEdit(customer.id)">
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.cpf }}</td>
                    <td>{{ customer.email }}</td>
                </DefaultTableTrow>
            </tbody>
        </DefaultTable>

        <component :is="modalForm" :open="isOpen" @close="cancelChange" @saved="refreshList" />
    
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useCustomerStore } from '~~/stores/CustomerStore';
definePageMeta({
    middleware: 'auth'
});
export default defineComponent({

    setup() {
        
        const { $swal } = useNuxtApp()

        const modalForm = shallowRef(resolveComponent('div'));

        const isOpen = ref(false);

        const { destroy, getAll, getById, resetEntity } = useCustomerStore()
        const { entities } = storeToRefs(useCustomerStore());

        const cancelChange = () => {
            resetEntity();
            modalForm.value = resolveComponent('div');
        }

        const refreshList = async () => {
            modalForm.value = resolveComponent('div');
            $swal.fire({
                icon: 'success',
                title: 'Cliente cadastrado com sucesso!',
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
                title: 'Cliente deletado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("Cliente" + id)?.classList.add("m-fadeOut");
            await getAll();
        }

        const showFormEdit = async (id:any) => {
            await getById(id);
            showForm();
        }

        const showForm = () => {
            modalForm.value = resolveComponent('CustomersCustomerForm')
        }

        onMounted(getAll);

        return { entities, modalForm, isOpen, cancelChange, refreshList, deleteElement, showFormEdit, showForm };
    },
})

</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>