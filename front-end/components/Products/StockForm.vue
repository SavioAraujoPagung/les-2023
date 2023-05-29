<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="changeQtd">
            <modal-header>
                <h4 class="fw-bold text-dark">Adicione produtos no estoque</h4>
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
                        <input type="text" ref="numberBarCode" class="form-control" v-model="entity.barcode" aria-label="Código de barras" placeholder="Código de barras" id="numberBarCode" aria-describedby="buttonBarCode">
                        <button class="btn btn-primary fw-bold text-white" type="submit">Adicionar</button>
                    </div>
                    <div class="ratio ratio-21x9">
                        <canvas class="object-fit-contain" ref="barcode"></canvas>
                    </div>
                </div>

                <div class="col-sm-12 mb-5">
                    <DefaultTable v-if="newItens.length">
                        <thead>
                            <th class="col-sm-4">C&oacute;digo de Barras</th>
                            <th class="col-sm-6">Nome</th>
                            <th class="col-sm-2">Qtd</th>
                        </thead>
                        <tbody>
                            <tr v-for="(product, i) in newItens" :key="i" :id="'newProduct'+product.barcode">
                                <td>{{ product.barcode }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.qtd }}</td>
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

<script lang="ts">
import { useProductStore } from "~~/stores/ProductStore";
import { storeToRefs } from "pinia";
import JsBarcode from "jsbarcode";
import { SavedStockProduct } from "~~/models/Products";


export default defineComponent({
    props:{
        isIncrement:{
            type:Boolean,
            required:true
        },
    },
    emits:['saved', 'close'],
    setup(props,{emit}) {

        const { save, update, resetEntity, getByBarcode, saveAllInStock } = useProductStore();
        const { errors, entity } = storeToRefs(useProductStore());

        const { $swal } = useNuxtApp();
        const barcode = ref(null);
        const numberBarCode = ref(null);
        const newItens = ref(new Array<SavedStockProduct>());

        const changeQtd = () => {
            if(!entity.value.barcode.length){
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

            generateBarCode();

            let index = newItens.value.findIndex(obj => obj.barcode === entity.value.barcode);
            
            
            if(index >= 0) {
                if(props.isIncrement) newItens.value[index].qtd++;
                else newItens.value[index].qtd--;
                entity.value.barcode = "";
            }
            else{
                const newItem = getByBarcode();
                newItem.then((response) => {
                    newItens.value.push({
                        barcode: response.data.barcode,
                        name: response.data.name,
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
                entity.value.barcode = "";
            
            }


        }

        const generateBarCode = () => JsBarcode(barcode.value, entity.value.barcode);

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
            if(numberBarCode.value) (<HTMLElement> numberBarCode.value).focus();
            document.onkeydown = (event) => {
                if (event.ctrlKey && event.key == 'j') event.preventDefault();
            }
        });

        return {
            entity,
            errors,
            formSave,
            barcode,
            closeModal,
            generateBarCode,
            numberBarCode,
            newItens,
            changeQtd
        }   
    },
})
</script>