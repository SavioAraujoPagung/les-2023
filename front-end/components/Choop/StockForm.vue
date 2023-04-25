<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="changeQtd">
            <modal-header>
                <h4 class="fw-bold text-dark">Adicione Choop no estoque</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body class="row">
                
                <div class="col-sm-9">
                    <div class="form-floating mb-3">
                        <input type="text" name="nome" id="nome" disabled class="form-control" v-model="entity.name" placeholder="nome" required>
                        <label for="nome" class="form-label">Nome</label>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="form-floating mb-3">
                        <input type="text" name="cost" id="cost" disabled class="form-control" v-model="entity.cost" placeholder="cost" required>
                        <label for="cost" class="form-label">Valor unidade</label>
                    </div>
                </div>
                
                <div class="col-sm-12 mb-3">
                    <div class="input-group mb-3">
                        <input type="text" ref="numberRfid" class="form-control" v-model="entity.rfid" aria-label="RFID" placeholder="RFID" id="numberRfid" aria-describedby="buttonBarCode">
                        <button class="btn btn-primary fw-bold text-white" type="submit">Adicionar</button>
                    </div>
                </div>

                <div class="col-sm-12 mb-5">
                    <DefaultTable v-if="newItens.length">
                        <thead>
                            <th class="col-sm-4">RFID</th>
                            <th class="col-sm-6">Nome</th>
                            <th class="col-sm-2">Qtd</th>
                        </thead>
                        <tbody>
                            <tr v-for="(choop, i) in newItens" :key="i" :id="'newChoop'+choop.rfid">
                                <td>{{ choop.rfid }}</td>
                                <td>{{ choop.name }}</td>
                                <td>{{ choop.qtd }}</td>
                            </tr>
                        </tbody>
                    </DefaultTable>
                </div>

            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary fw-bold text-white" type="button" @click="formSave">Confirmar</button>
            </modal-footer>
        </form>
    </ModalMyModal>

</template>

<script setup lang="ts">
    
    import { useChoopStore } from "~/stores/ChoopStore";
    import { storeToRefs } from "pinia";
    import { Choop, SavedStockChoop } from "~/models/Choop";

    const props = defineProps({
        isIncrement:{
            type:Boolean,
            required:true
        },
    });

    const emit = defineEmits(['saved', 'close']);

    const { save, update, resetEntity, getByRFID, saveAllInStock } = useChoopStore();
    const { errors, entity } = storeToRefs(useChoopStore());

    const { $swal } = useNuxtApp();
    const rfid = ref(null);
    const numberRfid = ref(null);
    const newItens = ref(new Array<Choop>());

    const changeQtd = () => {
        if(!entity.value.rfid.length){
            $swal.fire({
                icon: 'error',
                title: 'Nenhum código de barras inserido',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        }

        let index = newItens.value.findIndex(obj => obj.rfid === entity.value.rfid);
        
        
        if(index >= 0) {
            if(props.isIncrement) newItens.value[index].qtd++;
            else newItens.value[index].qtd--;
            entity.value.rfid = "";
        }
        else{
            const newItem = getByRFID();
            newItem.then((response) => {
                newItens.value.push({
                    rfid: response.data.rfid,
                    name: response.data.name,
                    cost: response.data.cost,
                    qtd: props.isIncrement ? 1 : -1
                });
            }).catch((error) => {
                $swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            entity.value.rfid = "";
        
        }


    }

    const formSave = async () => {
        if(!newItens.value.length) return true;
        else await saveAllInStock(newItens.value);
        emit('saved');
    }

    const closeModal = () =>{
        resetEntity();
        emit('close');
    }

    onMounted(() => {
        if(numberRfid.value) (<HTMLElement> numberRfid.value).focus();
        document.onkeydown = (event) => {
            if (event.ctrlKey && event.key == 'j') event.preventDefault();
        }
    });

</script>