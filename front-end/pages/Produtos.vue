<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Produtos</h1>
        <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
    </header>
    
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

    <component :is="open ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />

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
        
        const open = ref(false);

        const modalForm = shallowRef(resolveComponent('ProductsForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAll, getById, resetEntity } = useProductStore();
        const { entities } = storeToRefs(useProductStore());

        const cancelChange = () => {
            resetEntity();
            open.value = false;
        }

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

        const deleteElement = async (id:any) => {
            destroy(id);
            $swal.fire({
                icon: 'success',
                title: 'Produto deletado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("produto" + id)?.classList.add("m-fadeOut");
            await getAll();
        }

        const showFormEdit = async (id:any) => {
            await getById(id);
            showForm();
        }

        const showForm = () => {
            open.value = true;
        }

        onMounted(getAll);

        return { entities, Cargos, modalForm, open, cancelChange, refreshList, deleteElement, showFormEdit, showForm };

    },
})
</script>