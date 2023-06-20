<template>
    <div>
        <Head><Title>{{ title }}</Title></Head>
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Solicita&ccedil;&otilde;es da cozinha para o estoque</h1>
            <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="entities.length > 0">
                <DefaultTableThead>
                    <th>C&oacute;digo de Barras</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                </DefaultTableThead>
                <tbody>
                    <tr v-for="(product, i) in entities" :key="i" :id="'product'+product.id" @delete="deleteElement(product.id)">
                        <td>{{ product.barcode }}</td>
                        <td>{{ product.foodName }}</td>
                        <td>{{ product.qtd }}</td>
                        <td class="text-center"><a href="#" class="btn btn-dark btn-sm" @click="deleteElement(product.id)">Executado</a></td>
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
        
        <component :is="open ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />
    </div>

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useKitchenRequestStore } from '~~/stores/KitchenRequestStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    setup() {
        
        const title = ref("Solicitações da cozinha - LES GROUP");

        const open = ref(false);

        const modalForm = shallowRef(resolveComponent('KitchenRequestForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAll, getById, resetEntity } = useKitchenRequestStore();
        const { entities, loading } = storeToRefs(useKitchenRequestStore());

        const cancelChange = () => {
            resetEntity();
            open.value = false;
        }

        const refreshList = async () => {
            open.value = false;
            $swal.fire({
                icon: 'success',
                title: 'Pratos requisitados com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            resetEntity();
            await getAll();
        }

        const deleteElement = async (id:any) => destroy(id, document.getElementById("product" + id));

        const showForm = () => {
            open.value = true;
        }

        onMounted(getAll);

        return { entities, modalForm, open, cancelChange, refreshList, deleteElement, showForm, loading, title };

    },
})
</script>