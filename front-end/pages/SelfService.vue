<template>
    <header class="d-flex align-items-center justify-content-between mb-5">
        <h1 class="text-primary fw-bold">Pratos para o Self Service</h1>
        <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
    </header>
    
    <DefaultTable v-if="entities.length">
        <DefaultTableThead>
            <th>Nome</th>
            <th>Quantidade</th>
        </DefaultTableThead>
        <tbody>
            <DefaultTableTrow v-for="(dish, i) in entities" :key="i" :id="'dish'+dish.id" @delete="deleteElement(dish.id)" @edit="showFormEdit(dish.id)">
                <td>{{ dish.name }}</td>
                <td>{{ dish.qtd }}</td>
            </DefaultTableTrow>
        </tbody>
    </DefaultTable>

    <div class="d-flex align-items-center justify-content-center p-5" v-else>
        <LoadersCubeLoader />
    </div>

    <component :is="open ? modalForm : 'div'" @close="cancelChange" @saved="refreshList" />

</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { Cargos } from '~~/models/Usuario';
import { useSelfServiceStore } from '~/stores/SelfServiceStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {
        
        const open = ref(false);

        const modalForm = shallowRef(resolveComponent('SelfServiceForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAll, getById, resetEntity } = useSelfServiceStore();
        const { entities } = storeToRefs(useSelfServiceStore());

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
            document.getElementById("dish" + id)?.classList.add("m-fadeOut");
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