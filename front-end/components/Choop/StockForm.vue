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

                <div class="col-sm-6 mb-3">
                        <label for="cost" class="form-label">Valor de compra</label>
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">R$</span>
                            <input type="text" name="cost" id="cost" class="form-control money" v-model="entity.priceCost" placeholder="Valor de compra" required disabled>
                        </div>
                    </div>
                    
                    <div class="col-sm-6 mb-3">
                        <label for="sale" class="form-label">Valor de venda</label>
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">R$</span>
                            <input type="text" name="sale" id="sale" class="form-control money" v-model="entity.saleCost" placeholder="Valor de venda" required disabled>
                        </div>
                    </div>
                
                <div class="col-sm-12 mb-3">
                    <div class="input-group mb-3">
                        <input type="text" ref="numberRfid" class="form-control" v-model="entity.id" aria-label="RFID" placeholder="RFID" id="numberRfid" aria-describedby="buttonBarCode">
                        <button class="btn btn-primary fw-bold text-white" type="submit">Adicionar</button>
                    </div>
                </div>

                <div class="col-sm-12 mb-5">
                    <DefaultTable v-if="newItens.length">
                        <thead>
                            <th class="col-sm-4">RFID</th>
                            <th class="col-sm-4">Nome</th>
                            <th class="col-sm-4">Qtd(L)</th>
                        </thead>
                        <tbody>
                            <tr v-for="(choop, i) in newItens" :key="i" :id="'newChoop'+choop.id">
                                <td>{{ choop.id }}</td>
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
    
    import { storeToRefs } from "pinia";
import { Product } from "~~/models/Products";
    import { useProductStore } from "~~/stores/ProductStore";

    const props = defineProps({
        isIncrement:{
            type:Boolean,
            required:true
        },
    });

    const emit = defineEmits(['saved', 'close']);

    const { save, update, resetEntity, getById, saveAllInStock } = useProductStore();
    const { errors, entity } = storeToRefs(useProductStore());

    const { $swal } = useNuxtApp();
    const rfid = ref(null);
    const numberRfid = ref(null);
    const newItens = ref(new Array<Product>());

    const changeQtd = () => {
        if(!entity.value.id?.length){
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

        let index = newItens.value.findIndex(obj => obj.id === entity.value.id);
        
        
        if(index >= 0) {
            if(props.isIncrement) newItens.value[index].qtd += 100;
            else newItens.value[index].qtd -= 100;
            entity.value.id = "";
        }
        else{
            const newItem = getById(entity.value.id);
            newItem.then((response) => {
                newItens.value.push({
                    id: response.data.id,
                    name: response.data.name,
                    qtd: props.isIncrement ? 100 : -100
                });
            }).catch((error) => {
                $swal.fire({
                    icon: 'error',
                    title: "Não foi possível encontrar o produto!",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            entity.value.id = "";
        
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