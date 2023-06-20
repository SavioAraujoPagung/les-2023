<template>

    <div>
        <Head><Title>{{ title }}</Title></Head>
        <header class="d-flex align-items-center justify-content-between mb-5">
            <h1 class="text-primary fw-bold">Pratos para o Self Service</h1>
            <a href="javascript:;" class="btn btn-primary text-white" @click="showForm"><i class="bi bi-border-all"></i>Adicionar</a>
        </header>
        
        <div v-if="!loading">
            <DefaultTable v-if="entities.length" >
                <DefaultTableThead>
                    <th class="col-sm-7">Nome</th>
                    <th class="col-sm-3">Quantidade(g)</th>
                </DefaultTableThead>
                <tbody>
                    <tr v-for="(dish, i) in entities" :key="i" :id="'dish'+dish.id">
                        <td>{{ dish.foodName }}</td>
                        <td>{{ dish.qtd }}</td>
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-dark" @click="deleteElement(dish.id)">
                                Executar
                            </button>
                        </td>
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
import { useSelfServiceStore } from '~/stores/SelfServiceStore';

definePageMeta({
    middleware: 'auth'
});

export default defineComponent({
    
    setup() {

        const title = ref("Self Service - LES GROUP");
        
        const open = ref(false);

        const modalForm = shallowRef(resolveComponent('SelfServiceForm'));

        const { $swal } = useNuxtApp()

        const { destroy, getAll, getById, resetEntity } = useSelfServiceStore();
        const { entities, loading } = storeToRefs(useSelfServiceStore());

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

        const deleteElement = async (id:any) => destroy(id, document.getElementById("dish" + id));

        const showForm = () => {
            open.value = true;
        }

        onMounted(getAll);

        return { entities, modalForm, open, cancelChange, refreshList, deleteElement, showForm, loading, title };

    },
})
</script>