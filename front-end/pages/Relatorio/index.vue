<template>
    <div class="row row-col-1 row-cols-md-2 row-cols-xl-3 g-5">
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
        <div class="card">
            
            <div class="card-body">
                <h5 class="card-title">Relatório para usuários</h5>
                <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde molestiae tenetur laudantium rerum consectetur eligendi aperiam eaque dolore, qui temporibus officiis, at eum obcaecati similique reprehenderit. Nulla reprehenderit iure quasi.
                </p>
                <a href="#" class="card-link stretched-link" @click="toggleModalUser"></a>
            </div>

        </div>
        <component :is="isOpen ? modalForm : 'div'" @close="cancelChange" @saved="reportSent" />
        <component :is="isOpenUser ? modalFormUser : 'div'" @close="cancelChangeUser" @saved="reportSentUser" />
    </div>
</template>

<script lang="ts" setup>
    
    definePageMeta({
        middleware: 'auth',
        title:'LES GROUP - Relatórios'
    });

    const { $swal } = useNuxtApp()
    const isOpen = ref(false);
    const isOpenUser = ref(false);

    const modalForm = shallowRef(resolveComponent('ReportsReportForCustomer'));
    const modalFormUser = shallowRef(resolveComponent('ReportsReportForUser'));

    const toggleModal = () => isOpen.value = !isOpen.value;
    const toggleModalUser = () => isOpenUser.value = !isOpenUser.value;

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