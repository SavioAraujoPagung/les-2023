<template>
    <div class="p-5">
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Estoque</h1>
            <div class="d-flex align-items-center gap-2">
                <a href="javascript:;" class="btn btn-danger text-white" @click="showForm(false)"><i class="bi bi-border-all"></i>Remover produtos</a>
                <a href="javascript:;" class="btn btn-primary text-white" @click="showForm(true)"><i class="bi bi-border-all"></i>Adicionar produtos</a>
            </div>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="stock.length">
                <thead>
                    <th>C&oacute;digo de Barras</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                </thead>
                <tbody>
                    <tr v-for="(product, i) in stock" :key="i" :id="'product'+product.id">
                        <td>{{ product.rfid }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.qtd }}</td>
                    </tr>
                </tbody>
            </DefaultTable>
            <div v-else>
                <h5 class="text-dak">Nenhum registro encontrado</h5>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center p-5" v-else>
            <LoadersCubeLoader />
        </div>
        
        <component :is="open ? modalForm : 'div'" @close="cancelChange" :isIncrement="isIncrement" @saved="refreshList" />
    </div>

</template>

<script setup lang="ts">

    import { useChoopStore } from '~~/stores/ChoopStore';
    import { storeToRefs } from 'pinia';
        
    const open = ref(false);

    const isIncrement = ref(true);

    const modalForm = shallowRef(resolveComponent('ChoopStockForm'));

    const { $swal } = useNuxtApp()

    const { destroy, getAllStock, getById } = useChoopStore();
    const { stock, loading } = storeToRefs(useChoopStore());

    const cancelChange = () => open.value = false;

    const refreshList = async () => {
        open.value = false;
        $swal.fire({
            icon: 'success',
            title: 'Choops cadastrado com sucesso!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        await getAllStock();
    }

    const showForm = (increment:boolean) => {
        if(increment) isIncrement.value = true;
        else isIncrement.value = false;
        open.value = true;
    }

    onMounted(getAllStock);

</script>