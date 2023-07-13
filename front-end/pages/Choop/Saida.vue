<template>
    <form v-on:submit.prevent="formSave($event)">
        <h1 class="fw-bold text-primary text-center mb-5">Retire sua cerveja agora com apenas 3 passos!</h1>
        <div class="row">
            <div class="mb-5">
                <small class="text-center d-block mb-3">Selecione a cerveja que você deseja consumir*</small>
                <div class="form-group d-flex align-items-center flex-wrap justify-content-center gap-3">

                    
                    <div v-if="!loading">
                        <div v-if="entities.length" class="d-flex align-items-center flex-wrap gap-3">
                            <div v-for="(choop, i) in entities" :key="i">
                                <input type="radio" class="btn-check" name="choop" :id="'choop-'+choop.id" autocomplete="off" :value="choop.id" checked placeholder="choop">
                                <label class="btn btn-outline-primary" :for="'choop-'+choop.id">{{choop.name}}</label>
                            </div>
                        </div>
                        
                        <div v-else class="alert alert-warning p-3">
                            Ops, Parece que ainda não há nenhum choop cadastrado. Tente novamente mais tarde...
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center p-5" v-else>
                        <LoadersCubeLoader />
                    </div>
                    
                </div>
            </div>
            
            <div class="d-flex flex-column align-items-center mb-5">
                <small class="d-block text-center mb-3">Insira seu rfid*</small>
                <div class="form-floating col-sm-6">
                    <input type="text" class="form-control" id="rfid" name="rfid" placeholder="rfid">
                    <label for="rfid">RFID</label>
                </div>
            </div>
            
            <div class="col-sm-12 d-flex flex-column align-items-center">
                <button type="submit" class="btn btn-primary fw-bold">Solicitar</button>
            </div>
        </div>

    </form>

</template>

<script setup lang="ts">
    
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '~~/stores/ProductStore';
    
    useHead({
        title: 'Saída dos choops - LES GROUP'
    });

    definePageMeta({
        middleware: 'auth'
    });

    const { $swal } = useNuxtApp();

    const { destroy, getAll, getById, resetEntity, makeConsumption } = useProductStore();
    const { entities, loading } = storeToRefs(useProductStore());

    const formSave = (e:any) => {
        if(!document.querySelector('input[name = choop]:checked')){
            $swal.fire({
                    icon: 'error',
                    title: 'Nenhum choop selecionado, portanto, não podemos concluir seu pedido.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
            });
            return false;
        }

        if(!document.getElementById('rfid') || (<HTMLInputElement> document.getElementById('rfid'))?.value === ''){
            $swal.fire({
                    icon: 'error',
                    title: 'É necessário que você insira os dados do eu cartão RFID',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
            });
            return false;
        }

        makeConsumption((<HTMLInputElement> document.getElementById('rfid'))?.value, (<HTMLInputElement> document.querySelector('input[name = choop]:checked'))?.value,
        0.5
        );
        e.target.reset();
    }

    onMounted(() => getAll(1));

</script>