<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Formul&aacute;rio de Produtos</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="form-floating mb-3">
                    <input type="text" name="nome" id="nome" class="form-control" v-model="entity.name" placeholder="nome" required>
                    <label for="nome" class="form-label">Nome</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" name="cost" id="cost" class="form-control" v-model="entity.cost" placeholder="cost" required>
                    <label for="cost" class="form-label">Valor</label>
                </div>
                
                <div class="form-group mb-3">
                    <small class="form-label">C&oacute;digo de barras</small>
                    <div class="col-sm-6">
                        <div class="input-group mb-3">
                            <button @click="generateBarCode" class="btn btn-sm fw-bold text-white btn-primary" type="button" id="buttonBarCode" >Gerar</button>
                            <input type="text" ref="numberBarCode" class="form-control" placeholder="Digite o c&oacute;digo de barras para ser gerado" v-model="entity.barcode" aria-label="Digite o c&oacute;digo de barras para ser gerado" aria-describedby="buttonBarCode">
                        </div>
                        <div class="barcode ratio ratio-21x9">
                            <canvas class="object-fit-contain" ref="barcode"></canvas>
                        </div>
                    </div>
                </div>
    
                <div class="col-sm-12 d-flex aling-items-center justify-content-center">
                    <small class="text-opacity-25">Caso opte por escanear o código de barras o salvamento será feito de forma automática.</small>
                </div>
            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary fw-bold text-white" type="submit">Salvar</button>
            </modal-footer>
        </form>
    </ModalMyModal>

</template>

<script lang="ts">
import { useProductStore } from "~~/stores/ProductStore";
import { storeToRefs } from "pinia";
import JsBarcode from "jsbarcode";


export default defineComponent({
    emits:['saved', 'close'],
    setup(props,{emit}) {

        const { save, update, resetEntity } = useProductStore();
        const { errors, entity } = storeToRefs(useProductStore());

        const { $swal } = useNuxtApp();
        const barcode = ref(null);
        const numberBarCode = ref("");

        const generateBarCode = () =>{
            if(!entity.value.barcode.length){
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
                        entity.value.barcode = string;
                        JsBarcode(barcode.value, entity.value.barcode);
                    }
                })
            }
            if(entity.value.barcode !== "" ) JsBarcode(barcode.value, entity.value.barcode);
        }

        const formSave = async () => {
            if(entity.value.id == null) await save(entity.value);
            else await update(entity.value, entity.value.id);
            emit('saved');
        }

        const closeModal = () =>{
            resetEntity();
            emit('close');
        }

        onMounted(() => {
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
        }   
    },
})
</script>