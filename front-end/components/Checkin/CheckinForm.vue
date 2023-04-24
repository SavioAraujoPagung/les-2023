<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                Formul&aacute;lio de Usu&aacute;rio
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="form-floating mb-3">
                    <input type="text" name="rfid" id="rfid" ref="rfid" class="form-control" v-model="entity.rfid" placeholder="rfid" autofocus required>
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
        isCheckin:{
            type:Boolean,
            required:true
        },
    },
    setup(props,{emit}) {

        const { save, update, getById, resetEntity, doCheckin, doCheckout, clearErrors } = useCheckinStore();
        const { errors, entity } = storeToRefs(useCheckinStore());

        const isOpen = ref(false);
        const rfid = ref(null);

        const { $swal } = useNuxtApp();

        const formSave = async () => {
            if(props.isCheckin){
                await doCheckin(rfid.value ? (<HTMLInputElement> rfid.value).value : '' );
                if(!errors.value) emit('saved');
            }
            else{
                await doCheckout(rfid.value ? (<HTMLInputElement> rfid.value).value : '' );
                if(!errors.value) emit('saved');

            }
        }

        onMounted(() => rfid.value ? (<HTMLElement> rfid.value).focus() : false );

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
            rfid
        }   
    },
})
</script>