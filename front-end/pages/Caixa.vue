<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Caixa</h1>
    </header>
    
    <div v-if="!showCart">
        <form class="" v-on:submit.prevent="getCustomerInformation">
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="rfid" id="rfid" ref="rfid" autofocus>
                <button class="btn btn-dark" type="submit">Inserir</button>
            </div>
            <button class="btn btn-primary" type="button" @click="toggleCart">Confirmar dados</button>
            <table v-if="entities.length">
                <thead>
                    <tr><th>Clientes inseridos</th></tr>
                    <tr>
                        <th>RFID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, i) in entities" :key="i">
                        <td>{{ customer.rfid }}</td>
                        <td>{{ customer.name }}</td>
                    </tr>
                </tbody>
            </table>
        </form>
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
                    <tr><th colspan="3" class="text-uppercase text-primary">Produtos consumidos</th></tr>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Valor Unidade(R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, i) in entity.productCart" :key="i">
                        <td>{{ product.productConsumption?.name }}</td>
                        <td>{{ product.qtd }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h5 class="text-primary fw-bold">Valor total a ser pago: R$ {{ entity.total }} </h5>
        </div>

        <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn-danger" @click="cancelChange">Cancelar</button>
            <button class="btn btn-primary" @click="pay">Pagar</button>
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

        const { getById, resetEntity, getCustomerCart, pay } = useCartStore();
        const { entities, loading, entity } = storeToRefs(useCartStore());

        const cancelChange = () => {
            resetEntity();
            showCart.value = false;
        }

        const refreshList = async () => {
            showCart.value = false;
            $swal.fire({
                icon: 'success',
                title: 'Pagamento efetuado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            resetEntity();
        }

        const showFormEdit = async (id:any) => {
            await getById(id);
            showForm();
        }

        const showForm = () => {
            showCart.value = true;
        }

        const getCustomerInformation = async () => {
            if(rfid.value && (<HTMLInputElement>rfid.value).value != ""){
               await getCustomerCart((<HTMLInputElement>rfid.value).value);
            }
        }

        const toggleCart = () => {
            showCart.value = !showCart.value;
        }

        return {
            entities,
            Cargos,
            modalForm,
            showCart,
            loading,
            cancelChange,
            refreshList,
            showFormEdit,
            showForm,
            getCustomerInformation,
            entity,
            rfid,
            pay,
            toggleCart
        };

    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>