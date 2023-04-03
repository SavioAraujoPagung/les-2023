<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Caixa</h1>
    </header>
    
    <div v-if="!showCart">
        <form class="" v-on:submit.prevent="getCustomerInformation">
            <div class="input-group">
                <input type="text" class="form-control" name="rfid" id="rfid" ref="rfid" autofocus>
                <button class="btn btn-primary" type="submit">Enviar</button>
            </div>
        </form>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="d-block">
                <i class="icon icon-256 text-black text-opacity-25"><IconsBroadcast/></i>
            </div>
            <h2 class="display-6 text-black text-opacity-25">Aproxime o cartão RFID</h2>
        </div>
    </div>

    <div v-else>
        <div class="row">
            <div class="col">
                <div>
                    <small>RFID</small>
                    <p>{{ entity.customer?.rfid }}</p>
                </div>
                <div>
                    <small>Nome</small>
                    <p>{{ entity.customer?.name }}</p>
                </div>
            </div>
            <div class="col">
                <div>
                    <small>CPF</small>
                    <p>{{ entity.customer?.cpf }}</p>
                </div>
                <div>
                    <small>Data de nascimento</small>
                    <p>{{ formatDate(new Date(entity.customer?.dateBirth || '')) }}</p>
                </div>
            </div>
            <div class="col">
                <div>
                    <small>Telefone</small>
                    <p>{{ entity.customer?.phone }}</p>
                </div>
                <div>
                    <small>E-mail</small>
                    <p>{{ entity.customer?.email }}</p>
                </div>
            </div>
        </div>
        <div>
            <table class="table table-striped">
                <thead>
                    <tr><th colspan="3">Produtos consumidos</th></tr>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Valor Unidade</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div>
            Valor total a ser pago: R$ 150,00
        </div>
    </div>


</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { Cargos } from '~~/models/Usuario';
import { useCartStore } from '~~/stores/CartStore';
definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        
        const { $swal } = useNuxtApp()

        const modalForm = shallowRef(resolveComponent('UsersUserForm'));

        const showCart = ref(false);

        const rfid = ref(null);

        const { destroy, getAll, getById, resetEntity, getCustomerCart } = useCartStore();
        const { entities, loading, entity } = storeToRefs(useCartStore());

        const cancelChange = () => {
            resetEntity();
            showCart.value = false;
        }

        const refreshList = async () => {
            showCart.value = false;
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
            showCart.value = true;
        }

        const getCustomerInformation = async () => {
            console.log("🚀 ~ file: Caixa.vue:97 ~ getCustomerInformation ~ rfid.value:", rfid.value)
            if(rfid.value && (<HTMLInputElement>rfid.value).value != ""){
               await getCustomerCart((<HTMLInputElement>rfid.value).value)
                .finally(() => {
                    showCart.value = true;
                });
            }
        }

        onMounted(getAll);

        return { entities, Cargos, modalForm, showCart, loading, cancelChange, refreshList, deleteElement, showFormEdit, showForm, getCustomerInformation, entity, rfid };

    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>