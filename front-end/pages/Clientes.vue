<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Clientes</h1>
        <div class="d-flex align-items-center gap-3">
            <a href="javascript:;" class="btn btn-danger text-white" @click="doCheckout"><i class="bi bi-border-all"></i>Realizar Check-Out</a>
            <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar Cliente</a>
        </div>
    </header>

    
        <div v-if="!loading">
            <DefaultTable v-if="entities.length">
                <DefaultTableThead>
                    <th class="col-m-4">Nome</th>
                    <th class="col-sm-4">CPF</th>
                    <th class="col-sm-4">Email</th>
                </DefaultTableThead>
                <tbody>
                    <CheckinTRow v-for="(customer, i) in entities" :key="i" :id="'customer'+customer.id"
                    @delete="deleteElement(customer.id)"
                    @edit="showFormEdit(customer.id)"
                    @checkin="doCheckin(customer.id)">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.cpf }}</td>
                        <td>{{ customer.email }}</td>
                    </CheckinTRow>
                </tbody>
            </DefaultTable>
        </div>
        <div class="d-flex align-items-center justify-content-center p-5" v-else>
            <LoadersCubeLoader />
        </div>

        <component :is="isOpen ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />
        <component :is="openCheck ? modalCheck : 'div'" :isCheckin="isCheckin"  @close="cancelCheckin" @saved="saveCheckin" :customer_id="customer_id" />
    
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useCustomerStore } from '~~/stores/CustomerStore';

definePageMeta({
    title: 'Clientes - LES Group',
    middleware: 'auth'
});

export default defineComponent({

    setup() {
        
        const { $swal } = useNuxtApp()
        const openCheck = ref(false);

        const isCheckin = ref(false);

        const customer_id = ref(0);

        const modalForm = shallowRef(resolveComponent('CustomersCustomerForm'));
        const modalCheck = shallowRef(resolveComponent('CheckinForm'));

        const isOpen = ref(false);

        const { destroy, getAll, getById, resetEntity } = useCustomerStore()
        const { entities, loading } = storeToRefs(useCustomerStore());

        const cancelChange = () => {
            resetEntity();
            isOpen.value = false;
        }

        const doCheckin = (id:any) => {
            customer_id.value = id;
            isCheckin.value = true;
            openCheck.value = true;
        }

        const doCheckout = () => {
            isCheckin.value = false;
            openCheck.value = true;
        }
        const cancelCheckin = () => {
            openCheck.value = false;
        }

        const saveCheckin = () => {
            $swal.fire({
                icon: 'success',
                title: (isCheckin.value ? 'Check-in' : 'Check-Out') + ' realizado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });
            openCheck.value = false;
        }

        const refreshList = async () => {
            isOpen.value = false;
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
            isOpen.value = true;
        }

        onMounted(getAll);

        return { entities, modalForm, isOpen, cancelChange, refreshList, deleteElement, showFormEdit, showForm,
            openCheck, doCheckin, modalCheck, cancelCheckin, customer_id, saveCheckin, doCheckout, isCheckin, loading };
    },
})

</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>