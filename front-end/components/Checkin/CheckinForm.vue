<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                Formul&aacute;lio de Usu&aacute;rio
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="form-floating mb-3">
                    <input type="text" name="rfid" id="rfid" class="form-control" v-model="entity.rfid" placeholder="rfid" required>
                    <label for="rfid" class="form-label">RFID</label>
                </div>
                
            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary" type="submit">Salvar</button>
            </modal-footer>
        </form>
    </ModalMyModal>

</template>

<script lang="ts">
import { useCheckinStore } from "~~/stores/CheckinStore";
import { storeToRefs } from "pinia";


export default defineComponent({
    emits:['saved', 'close'],
    props:{
        customer_id: {
            type: String,
            default:"0"
        },
        isCheckin:{
            type:Boolean,
            required:true
        },
    },
    setup(props,{emit}) {

        const { save, update, getById, resetEntity, doCheckin, doCheckout, clearErrors } = useCheckinStore();
        const { errors, entity } = storeToRefs(useCheckinStore());

        const isOpen = ref(false);

        const { $swal } = useNuxtApp();

        const formSave = async () => {
            entity.value.customer_id = props.customer_id;
            if(props.isCheckin){
                await doCheckin();
                emit('saved');
            }
            else{
                await doCheckout();
                if(errors.value.length > 0){
                    $swal.fire({
                        icon: 'error',
                        title: errors.value,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000
                    });
                    clearErrors();
                }
                else emit('saved');


            }
        }

        const closeModal = () =>{
            resetEntity();
            emit('close');
        }

        return {
            entity,
            errors,
            formSave,
            isOpen,
            closeModal,
        }   
    },
})
</script>