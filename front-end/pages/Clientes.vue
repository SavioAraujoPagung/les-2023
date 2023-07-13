<template>
    <div>
        <Head><Title>{{ title }}</Title></Head>
        <header class="d-flex flex-wrap align-items-center justify-content-between mb-5">
            <h1 class="h3 text-primary">Clientes</h1>
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div class="d-flex align-items-center gap-2">
                    <a href="javascript:;" aria-label="Realizar checkout" class="btn btn-dark text-white" @click="doCheckout"><i class="bi bi-border-all"></i>Check-Out</a>
                    <a href="javascript:;" aria-label="Realizar checkin" class="btn btn-light-primary" @click="doCheckin"><i class="bi bi-border-all"></i>Check-In</a>
                </div>
                <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
            </div>
        </header>
        
            <div v-if="!loading">
                <DefaultTable v-if="entities.length">
                    <DefaultTableThead>
                        <th class="col-m-3">RFID</th>
                        <th class="col-m-3">Nome</th>
                        <th class="col-sm-3">CPF</th>
                        <th class="col-sm-3">Email</th>
                    </DefaultTableThead>
                    <tbody>
                        <CheckinTRow v-for="(customer, i) in entities" :key="i" :id="'customer'+customer.rfid"
                        @delete="deleteElement(customer.rfid)"
                        @edit="showFormEdit(customer.rfid)">
                            <td>{{ customer.rfid }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.cpf }}</td>
                            <td>{{ customer.email }}</td>
                        </CheckinTRow>
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
            <component :is="openCheck ? modalCheck : 'div'" :isCheckin="isCheckin"  @close="cancelCheckin" @saved="saveCheckin" />
    </div>
    
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useCustomerStore } from '~~/stores/CustomerStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({

    setup() {
        
        const title = ref("Clientes - LES GROUP");

        const { $swal } = useNuxtApp()
        const openCheck = ref(false);

        const isCheckin = ref(false);

        const modalForm = shallowRef(resolveComponent('CustomersCustomerForm'));
        const modalCheck = shallowRef(resolveComponent('CheckinForm'));

        const isOpen = ref(false);

        const { destroy, getAll, getById, resetEntity } = useCustomerStore()
        const { entities, loading, isEdit } = storeToRefs(useCustomerStore());

        const cancelChange = () => {
            resetEntity();
            isOpen.value = false;
        }

        const doCheckin = (id:any) => {
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
            isEdit.value = false;
            resetEntity();
            await getAll();
        }

        const deleteElement = async (id:any) => destroy(id, document.getElementById("customer" + id));


        const showFormEdit = async (rfid:any) => {
            await getById(rfid);
            isEdit.value = true;
            showForm();
        }

        const showForm = () => {
            isOpen.value = true;
        }

        onMounted(getAll);

        return { entities, modalForm, isOpen, cancelChange, refreshList, deleteElement, showFormEdit, showForm,
            openCheck, doCheckin, modalCheck, cancelCheckin, saveCheckin, doCheckout, isCheckin, loading, title };
    },
})

</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>