<template>
    <div>
        <Head><Title>{{ title }}</Title></Head>
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Produtos</h1>
            <div class="d-flex align-items-center gap-2">
                <a href="javascript:;" class="btn btn-dark" @click="toggleModalBarcode">Gerar códigos de barras</a>
                <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
            </div>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="entities.length">
                <DefaultTableThead>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>C&oacute;digo de Barras</th>
                </DefaultTableThead>
                <tbody>
                    <DefaultTableTrow v-for="(product, i) in entities" :key="i" :id="'product'+product.id" @delete="deleteElement(product.id)" @edit="showFormEdit(product.id)">
                        <td>{{ product.name }}</td>
                        <td>{{ product.cost }}</td>
                        <td>{{ product.barcode }}</td>
                    </DefaultTableTrow>
                </tbody>
            </DefaultTable>
            <div v-else>
                <h5 class="text-dak">Nenhum registro encontrado</h5>
            </div>
        </div>
        
        <div class="d-flex align-items-center justify-content-center p-5" v-else>
            <LoadersCubeLoader />
        </div>
        
        <component :is="open ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />
        <component :is="openModalBarcode ? modalBarcode : 'div'" @close="toggleModalBarcode" @saved="toggleModalBarcode" />
    </div>

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { Cargos } from '~~/models/Usuario';
import { useProductStore } from '~/stores/ProductStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        const title = ref("Produtos - LES GROUP");
        const open = ref(false);
        const openModalBarcode = ref(false);

        const modalForm = shallowRef(resolveComponent('ProductsForm'));
        const modalBarcode = shallowRef(resolveComponent('ProductsBarCodesForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAll, getById, resetEntity } = useProductStore();
        const { entities, loading } = storeToRefs(useProductStore());

        const cancelChange = () => {
            resetEntity();
            open.value = false;
        }

        const toggleModalBarcode = () => openModalBarcode.value = !openModalBarcode.value;

        const refreshList = async () => {
            open.value = false;
            $swal.fire({
                icon: 'success',
                title: 'Produto cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            resetEntity();
            await getAll();
        }

        const deleteElement = async (id:any) => destroy(id, document.getElementById("product" + id));

        const showFormEdit = async (id:any) => {
            await getById(id);
            showForm();
        }

        const showForm = () => {
            open.value = true;
        }

        onMounted(getAll);

        return { entities, Cargos, modalForm, loading, open, cancelChange, refreshList, deleteElement, showFormEdit, showForm, toggleModalBarcode, openModalBarcode, modalBarcode, title };

    },
})
</script>