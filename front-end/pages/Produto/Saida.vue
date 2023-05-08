<template>
    <form v-on:submit.prevent="formSave($event)">
        <div class="text-center mb-5">
            <h1 class="fw-bold text-primary text-center">Self-service</h1>
            <small>Preencha os campos abaixo para completar o consumo no self-service. Lembre-se de pesar o prato!</small>
        </div>
        <div class="row">

            <div class="d-flex flex-column align-items-center mb-5">
                <div class="form-floating col-sm-6">
                    <input type="text" class="form-control" id="peso" name="peso" placeholder="peso">
                    <label for="peso">Peso</label>
                </div>
            </div>

            <div class="d-flex flex-column align-items-center mb-5">
                <small class="d-block text-center mb-3">Insira seu RFID*</small>
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

    const { $swal } = useNuxtApp();

    const { destroy, getAll, getById, resetEntity, makeConsumption } = useProductStore();
    const { entities, loading } = storeToRefs(useProductStore());

    const formSave = (e:any) => {
        if((<HTMLInputElement> document.getElementById('peso'))?.value === '' ){
            $swal.fire({
                    icon: 'error',
                    title: 'Nenhum peso registrado, portanto, não podemos concluir seu pedido.',
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

        makeConsumption(
            (<HTMLInputElement> document.getElementById('rfid'))?.value,
            '1234',
            +(<HTMLInputElement> document.getElementById('peso'))?.value
        );
        e.target.reset();
    }

    onMounted(() => getAll(1));

</script>