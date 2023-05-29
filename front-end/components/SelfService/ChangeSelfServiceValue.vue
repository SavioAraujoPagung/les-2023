<template>
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Mudar valor do quilo do self-service</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                <div class="form-floating">
                    <input type="text" class="money form-control" name="valor" id="valor" placeholder="valor" v-model="entity.saleCost">
                    <label for="valor" class="form-label">Valor</label>
                </div>
                <div class="text-center mt-5">
                    <button class="btn btn-primary text-white">Salvar</button>
                </div>
            </modal-body>
        </form>
    </ModalMyModal>
</template>

<script lang="ts" setup>

    import { storeToRefs } from "pinia";
    import { useProductStore } from "~~/stores/ProductStore";

    const { update, resetEntity, getById } = useProductStore();
    const { entity } = storeToRefs(useProductStore());

    const emit = defineEmits(['saved', 'close']);
    
    const formSave = async () => {
        if(!(await update(entity.value, entity.value.id)).value){
            return false;
        }
        emit('saved');
    }

    const closeModal = () =>{
        resetEntity();
        emit('close');
    }

    onMounted(() => {
        
        getById(1);

        const inputs = document.querySelectorAll('.money');

        inputs.forEach((input) => {
            input.addEventListener('keyup', () => {
                if(input.id === 'cost') entity.value.priceCost = maskMoney(input);
                else entity.value.saleCost = maskMoney(input);
            });
        });

    });

</script>