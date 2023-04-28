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
                
                <div class="form-floating mb-3">
                    <input type="text" name="rfid" id="rfid" class="form-control" v-model="entity.rfid" placeholder="rfid" required>
                    <label for="rfid" class="form-label">RFID</label>
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
    
    import { useChoopStore } from "~/stores/ChoopStore";
    import { storeToRefs } from "pinia";

    const emit = defineEmits(['saved', 'close']);

    const { save, update, resetEntity } = useChoopStore();
    const { errors, entity } = storeToRefs(useChoopStore());

    const { $swal } = useNuxtApp();
    const barcode = ref(null);
    const numberBarCode = ref("");

    const formSave = async () => {
        if(entity.value.id == null){
            if(!await save(entity.value)) return false;
        }
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

</script>