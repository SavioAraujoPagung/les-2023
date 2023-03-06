<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Fiscal de entrada</h1>
        <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar Cliente</a>
    </header>

    
        <table style="width: 100%">
            <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Nascimento</th>
            </tr>
            <tr>
                <td>Savio</td>
                <td>111.111.111-11</td>
                <td>99999-9999</td>
                <td>savio@pagung.les</td>
                <td>14/05/1998</td>
            </tr>
        </table>
    
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useCustomerStore } from '~~/stores/CustomerStore';
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
            console.log("tessttteee")
            modalForm.value = resolveComponent('CustomersCustomerForm')
            console.log("tessttteee333333")
        }

        onMounted(getAll);

        return { entities, modalForm, isOpen, cancelChange, refreshList, deleteElement, showFormEdit, showForm };
    },
})

</script>