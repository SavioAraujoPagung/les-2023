<template>

    <div>
        <Head><Title>{{ title }}</Title></Head>
        
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
                        <tr><th colspan="4" class="h4 fw-bold text-center text-uppercase text-primary">Produtos consumidos</th></tr>
                        <tr>
                            <th class="col-sm-3">Nome</th>
                            <th class="col-sm-2 text-center">Quantidade</th>
                            <th class="col-sm-3 text-center">Valor Unidade(R$)</th>
                            <th class="col-sm-4 text-center">Valor Total(R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(consumption, i) in entity.productCart" :key="i">
                            <td>{{ consumption.product.name }}</td>
                            <td class="text-center">{{ consumption.qtd }}</td>
                            <td class="text-center">{{ Number(consumption.product.saleCost).toFixed(2) }}</td>
                            <td class="text-center">{{ Number(consumption.price).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </DefaultTable>
            </div>
            <div class="d-flex align-items-center justify-content-end mb-5">
                <h2 class="text-primary fw-bold">Valor total a ser pago: R$ {{ Number(entity.total).toFixed(2) }} </h2>
            </div>
        
            <div class="d-flex align-items-center justify-content-between">
                <button class="btn btn-danger fw-bold" @click="cancelChange">Cancelar</button>
                <button class="btn btn-primary fw-bold" @click="payCart">Pagar</button>
            </div>

            <div class="d-none" id="consumptionDesc">
                <h2 class="display-4 fw-bold my-5 text-center">LES GROUP</h2>
                <div class="mb-5 border border-bottom py-3 ps-1">
                    <p class="small lh-1 m-0"><strong>Nome: </strong>{{ entity.customer?.name }}</p>
                    <p class="small lh-1 m-0"><strong>RFID:</strong> {{ entity.customer?.rfid }}</p>
                    <p class="small lh-1 m-0"><strong>CPF:</strong> {{ entity.customer?.cpf }}</p>
                </div>
                <h1 class="fw-bold display-5 text-center">CUPOM FISCAL</h1>
                <div class="border w-100 py-1 mb-5 text-center small">Item - Qtd X VL_UNIT(R$) - VL_ITEM(R$)</div>
                <div class="pb-1 mb-3 border-bottom">
                    <div v-for="(consumption, i) in entity.productCart" class="d-flex align-items-center justify-content-between" :key="i">
                        <p>{{ consumption.product.name }}</p>
                        <p>{{ consumption.qtd }} X {{ Number(consumption.product.saleCost).toFixed(2) }}</p>
                        <p>{{ Number(consumption.price).toFixed(2) }}</p>
                    </div>
                </div>
                <h2 class="h1 fw-bold text-center">Total(R$): {{ Number(entity.total).toFixed(2) }}</h2>
                <div class="border mt-5 fw-bold text-center py-1">{{ (new Date()).toLocaleDateString() + '-' + (new Date()).toLocaleTimeString() }}</div>
            </div>

        </div>
    </div>


</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '~~/stores/CartStore';
definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {

        const title = ref("Caixa - LES GROUP");
        
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
            if(await pay()){
                printDoc('consumptionDesc');
                showCart.value = false;
                resetCustomers();
            }
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
            toggleCart,
            title
        };

    },
})
</script>

<style scoped>
    td, th{
        padding: 1rem;
    }
</style>