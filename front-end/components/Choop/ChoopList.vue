<template>
    <div class="p-5">
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Choops</h1>
            <div class="d-flex align-items-center gap-2">
                <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
            </div>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="entities.length">
                <DefaultTableThead>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>RFID</th>
                </DefaultTableThead>
                <tbody>
                    <DefaultTableTrow v-for="(product, i) in entities" :key="i" :id="'product'+product.id" @delete="deleteElement(product.id)" @edit="showFormEdit(product.id)">
                        <td>{{ product.name }}</td>
                        <td>{{ product.priceCost }}</td>
                        <td>{{ product.id }}</td>
                    </DefaultTableTrow>
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

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '~/stores/ProductStore';

    const open = ref(false);

    const modalForm = shallowRef(resolveComponent('ChoopForm'));

    const { $swal } = useNuxtApp()

    const { destroy, getAll, getById, resetEntity } = useProductStore();
    const { entities, loading, isEdit } = storeToRefs(useProductStore());

    const cancelChange = () => {
        isEdit.value = false;
        resetEntity();
        open.value = false;
    }

    const refreshList = async () => {
        isEdit.value = false;
        open.value = false;
        resetEntity();
        await getAll(1);
    }

    const deleteElement = async (id:any) => destroy(id, document.getElementById("product" + id));

    const showFormEdit = async (id:any) => {
        isEdit.value = true;
        await getById(id);
        showForm();
    }

    const showForm = () => {
        open.value = true;
    }

    onMounted(() => getAll(1));

</script>