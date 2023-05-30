<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Formul&aacute;rio de Produtos</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="row">
                    
                    <div class="col-sm-8  mb-3">
                        <div class="form-floating">
                            <input type="text" name="nome" id="nome" class="form-control" v-model="entity.name" placeholder="nome" required>
                            <label for="nome" class="form-label">Nome</label>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-3">
                        <div class="form-floating">
                            <input type="text" name="qtdMin" id="qtdMin" class="form-control" v-model="entity.minQtd" placeholder="quantidade" required>
                            <label for="qtdMin" class="form-label">Quantidade mínima</label>
                        </div>
                    </div>
                    
                    <div class="col-sm-6 mb-3">
                        <label for="cost" class="form-label">Valor de compra</label>
                        <div class="input-group">
                            <span class="input-group-text">R$</span>
                            <input type="text" name="cost" id="cost" class="form-control money" v-model="(entity.priceCost)" placeholder="Valor de compra" required>
                        </div>
                    </div>
                    
                    <div class="col-sm-6 mb-3">
                        <label for="sale" class="form-label">Valor de venda</label>
                        <div class="input-group">
                            <span class="input-group-text">R$</span>
                            <input type="text" name="sale" id="sale" class="form-control money" v-model="entity.saleCost" placeholder="Valor de venda" required>
                        </div>
                    </div>

                    <div class="form-group col-sm-12">
                        <small class="form-label">C&oacute;digo de barras</small>
                        <div class="input-group mb-3">
                            <button @click="generateBarCode" class="btn btn-sm fw-bold text-white btn-primary" type="button" id="buttonBarCode" >Gerar</button>
                            <input type="text" ref="numberBarCode" class="form-control" placeholder="Digite o c&oacute;digo de barras para ser gerado" v-model="id" aria-label="Digite o c&oacute;digo de barras para ser gerado" aria-describedby="buttonBarCode">
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="barcode ratio ratio-21x9 w-50">
                                <canvas class="object-fit-contain" ref="barcode"></canvas>
                            </div>
                        </div>
                    </div>

                </div>

            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary fw-bold text-white" type="submit">Salvar</button>
            </modal-footer>
        </form>
    </ModalMyModal>

</template>

<script setup lang="ts">
    import JsBarcode from "jsbarcode";
import { storeToRefs } from "pinia";
import { ProductType } from "~~/models/Products";
    import { useProductStore } from "~~/stores/ProductStore";

    const emit = defineEmits(['saved', 'close']);

    const { save, update, resetEntity } = useProductStore();
    const { errors, entity, isEdit } = storeToRefs(useProductStore());

    const id = ref(entity.value.id);

    entity.value.priceCost = unparseMoney(entity.value.priceCost);
    entity.value.saleCost = unparseMoney(entity.value.saleCost);

    entity.value.type = ProductType.another;

    const { $swal } = useNuxtApp();
    const barcode = ref(null);

    const generateBarCode = () =>{
        if(!id.value?.length){
            $swal.fire({
                title: 'Você deseja gerar um código aleatório?',
                text: "Você pode gerar um código aleatório para gerenciar os produtos do estoque",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00c57e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, gerar código'
            }).then((result) => {
                if (result.isConfirmed) {
                    var string = geraStringAleatoria(11);
                    $swal.fire({
                        icon: 'success',
                        title: 'Código gerado!',
                        text: 'Código: ' + string,
                        confirmButtonColor: '#00c57e',
                    });
                    id.value = string;
                    JsBarcode(barcode.value, id.value);
                }
            })
        }
        if(entity.value.id !== "" ) JsBarcode(barcode.value, id.value);
    }

    const formSave = async () => {
        
        if(entity.value.id === null){
            entity.value.id = id;
            if(!(await save(entity.value)).value){
                return false;
            }
        }
        else {
            entity.value.id = id;
            if(!(await update(entity.value, entity.value.id)).value){
                return false;
            }
        };
        emit('saved');
    }

    const closeModal = () =>{
        resetEntity();
        emit('close');
    }

    onMounted(() => {
        const inputs = document.querySelectorAll('.money');

        inputs.forEach((input) => {
            input.addEventListener('keyup', () => {
                if(input.id === 'cost') entity.value.priceCost = maskMoney(input);
                else entity.value.saleCost = maskMoney(input);
            });
        });

        document.onkeydown = (event) => {
            if (event.ctrlKey && event.key == 'j') event.preventDefault();
        }
    });

</script>