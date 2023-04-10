<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Caixa</h1>
    </header>
    
    <div v-if="!showCart">
        <form class="" v-on:submit.prevent="getCustomerInformation">
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="rfid" id="rfid" ref="rfid" autofocus>
                <button class="btn btn-dark fw-bold" type="submit">+</button>
            </div>
            <DefaultTable v-if="entities.length" class="mt-3">
                <thead>
                    <tr><th class="col-sm-12 h4 fw-bold text-center" colspan="2">Clientes inseridos</th></tr>
                    <tr>
                        <th class="col-sm-4">RFID</th>
                        <th class="col-sm-8">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, i) in entities" :key="i">
                        <td>{{ customer.rfid }}</td>
                        <td>{{ customer.name }}</td>
                    </tr>
                </tbody>
            </DefaultTable>
            <button class="btn btn-primary mt-3 fw-bold" type="button" @click="toggleCart">Confirmar dados</button>
        </form>
    </div>

    <div v-else>
        <div class="row">
            <div class="col">
                <div>
                    <small class="fw-bold text-dark">RFID</small>
                    <p class="lh-1">{{ entity.customer?.rfid }}</p>
                </div>
                <div>
                    <small class="fw-bold text-dark">Nome</small>
                    <p class="lh-1">{{ entity.customer?.name }}</p>
                </div>
            </div>
            <div class="col">
                <div>
                    <small class="fw-bold text-dark">CPF</small>
                    <p class="lh-1">{{ entity.customer?.cpf }}</p>
                </div>
                <div>
                    <small class="fw-bold text-dark">Data de nascimento</small>
                    <p class="lh-1">{{ formatDate(new Date(entity.customer?.dateBirth || '')) }}</p>
                </div>
            </div>
            <div class="col">
                <div>
                    <small class="fw-bold text-dark">Telefone</small>
                    <p class="lh-1">{{ entity.customer?.phone }}</p>
                </div>
                <div>
                    <small class="fw-bold text-dark">E-mail</small>
                    <p class="lh-1">{{ entity.customer?.email }}</p>
                </div>
            </div>
        </div>
        <div>
            <DefaultTable class="mt-5">
                <thead>
                    <tr><th colspan="3" class="h4 fw-bold text-center text-uppercase text-primary">Produtos consumidos</th></tr>
                    <tr>
                        <th class="col-sm-6">Nome</th>
                        <th class="col-sm-3 text-center">Quantidade</th>
                        <th class="col-sm-3 text-center">Valor Unidade(R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, i) in entity.productCart" :key="i">
                        <td>{{ product.productConsumption?.name }}</td>
                        <td class="text-center">{{ product.qtd }}</td>
                        <td class="text-center">{{ product.price }}</td>
                    </tr>
                </tbody>
            </DefaultTable>
        </div>
        <div class="d-flex align-items-center justify-content-end mb-5">
            <h2 class="text-primary fw-bold">Valor total a ser pago: R$ {{ entity.total }} </h2>
        </div>

        <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn-danger fw-bold" @click="cancelChange">Cancelar</button>
            <button class="btn btn-primary fw-bold" @click="payCart">Pagar</button>
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

        const showCart = ref(false);

        const rfid = ref(null);

        const { getById, resetEntity, getCustomerCart, pay, resetCustomers } = useCartStore();
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

        const payCart = async () => {
            await pay();
            showCart.value = false;
            resetCustomers();
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
            showCart,
            loading,
            cancelChange,
            refreshList,
            showFormEdit,
            showForm,
            getCustomerInformation,
            entity,
            payCart,
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