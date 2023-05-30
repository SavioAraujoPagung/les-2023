<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Formul&aacute;rio de Produtos</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="row">
                    
                    <div class="col-sm-4  mb-3">
                        <div class="form-floating">
                            <input type="text" name="nome" id="nome" class="form-control" v-model="entity.name" placeholder="nome" required>
                            <label for="nome" class="form-label">Nome</label>
                        </div>
                    </div>

                    <div class="col-sm-4 mb-3">
                        <div class="form-floating">
                            <input type="text" name="ident" id="ident" class="form-control" v-model="id" placeholder="ident" :disabled="entity.id !== null" required>
                            <label for="ident" class="form-label">RFID</label>
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
                            <span class="input-group-text" id="basic-addon1">R$</span>
                            <input type="text" name="cost" id="cost" class="form-control money" v-model="entity.priceCost" placeholder="Valor de compra" required>
                        </div>
                    </div>
                    
                    <div class="col-sm-6 mb-3">
                        <label for="sale" class="form-label">Valor de venda</label>
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1">R$</span>
                            <input type="text" name="sale" id="sale" class="form-control money" v-model="entity.saleCost" placeholder="Valor de venda" required>
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
    import { storeToRefs } from "pinia";
    import { useProductStore } from "~~/stores/ProductStore";

    const emit = defineEmits(['saved', 'close']);

    const { save, update, resetEntity } = useProductStore();
    const { errors, entity, isEdit } = storeToRefs(useProductStore());

    const id = ref(entity.value.id);

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