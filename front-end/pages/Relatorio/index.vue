<template>
    <div class="row row-col-1 row-cols-md-2 row-cols-xl-3 g-5">
        
        <article class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório de consumo para cliente</h5>
                    <p class="card-text">Uma opção de envio de email para todos os clientes que compraram
                    em um determinado período de tempo. O texto deve ser informado no
                    momento do envio.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModal"></a>
                </div>
            
            </div>
        </article>

        <article class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório para usuários</h5>
                    <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModalUser"></a>
                </div>
            
            </div>
        </article>

        <div class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório dos chopps mais consumidos</h5>
                    <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModalChopp"></a>
                </div>
            
            </div>
        </div>
        
        <article class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório dos gastos e lucros</h5>
                    <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModalExpense"></a>
                </div>
            
            </div>
        </article>
        
        <article class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório do saldo dos produtos</h5>
                    <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModalProduct"></a>
                </div>
            
            </div>
        </article>

        <article class="col">
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">Relatório dos produtos que estão no limite de estoque</h5>
                    <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                    </p>
                    <a href="#" class="card-link stretched-link" @click="toggleModalProductOnline"></a>
                </div>
            
            </div>
        </article>

        <component :is="isOpen ? modalForm : 'div'" @close="cancelChange" @saved="reportSent" />
        <component :is="isOpenUser ? modalFormUser : 'div'" @close="cancelChangeUser" @saved="reportSentUser" />
        <component :is="isOpenChopp ? modalFormChopp : 'div'" @close="toggleModalChopp" @saved="toggleModalChopp" />
        <component :is="isOpenExpense ? modalFormExpense : 'div'" @close="toggleModalExpense" @saved="toggleModalExpense" />
        <component :is="isOpenProducts ? modalFormProduct : 'div'" @close="toggleModalExpense" @saved="toggleModalExpense" />
        <component :is="isOpenProductsOnline ? modalFormProductOnline: 'div'" @close="toggleModalProductOnline" @saved="toggleModalProductOnline" />

    </div>
</template>

<script lang="ts" setup>
    
    definePageMeta({
        middleware: 'auth',
        title:'LES GROUP - Relatórios'
    });

    const { $swal } = useNuxtApp();

    const isOpen = ref(false);
    const isOpenUser = ref(false);
    const isOpenChopp = ref(false);
    const isOpenExpense = ref(false);
    const isOpenProducts = ref(false);
    const isOpenProductsOnline = ref(false);

    const modalForm = shallowRef(resolveComponent('ReportsReportForCustomer'));
    const modalFormUser = shallowRef(resolveComponent('ReportsReportForUser'));
    const modalFormChopp = shallowRef(resolveComponent('ReportsChoppReport'));
    const modalFormExpense = shallowRef(resolveComponent('ReportsExpensesReport'));
    const modalFormProduct = shallowRef(resolveComponent('ReportsProductReport'));
    const modalFormProductOnline = shallowRef(resolveComponent('ReportsProductOnlineReport'));

    const toggleModal = () => isOpen.value = !isOpen.value;
    const toggleModalUser = () => isOpenUser.value = !isOpenUser.value;
    const toggleModalChopp = () => isOpenChopp.value = !isOpenChopp.value;
    const toggleModalExpense = () => isOpenExpense.value = !isOpenExpense.value;
    const toggleModalProduct = () => isOpenProducts.value = !isOpenProducts.value;
    const toggleModalProductOnline = () => isOpenProductsOnline.value = !isOpenProductsOnline.value;

    const reportSent = (success = true) => {
        if(success){
            $swal.fire({
                icon: 'success',
                title: 'Relatório enviado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });
            isOpen.value = false;
        }
    }

    const reportSentUser = (success = true) => {
        if(success){
            $swal.fire({
                icon: 'success',
                title: 'Relatório enviado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            });
            isOpenUser.value = false;
        }
    }

    const cancelChange = () => {
        isOpen.value = false;
    }

    const cancelChangeUser = () => {
        isOpenUser.value = false;
    }

</script>