<template>
    <div>
        <Head><Title>{{ title }}</Title></Head>
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
                        <td>{{ product.barcode }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.qtd }}</td>
                    </tr>
                </tbody>
            </DefaultTable>
            <div class="alert alert-info" v-else>
                <p class="fw-normal mb-0">Nenhum registro encontrado</p>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center p-5" v-else>
            <LoadersCubeLoader />
        </div>
        
        <component :is="open ? modalForm : 'div'" @close="cancelChange" :isIncrement="isIncrement" @saved="refreshList" />
    </div>

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/ProductStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        
        const title = ref("Estoque - LES GROUP");

        const open = ref(false);

        const isIncrement = ref(true);

        const modalForm = shallowRef(resolveComponent('ProductsStockForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAllStock, getById } = useProductStore();
        const { stock, loading } = storeToRefs(useProductStore());

        const cancelChange = () => open.value = false;

        const refreshList = async () => {
            open.value = false;
            $swal.fire({
                icon: 'success',
                title: 'Produtos cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            await getAllStock();
        }

        const showForm = (increment:boolean) => {
            if(increment) isIncrement.value = true;
            else isIncrement.value = false;
            open.value = true;
        }

        onMounted(getAllStock);

        return { stock, modalForm, open, cancelChange, refreshList, showForm, isIncrement, loading, title };

    },
})
</script>