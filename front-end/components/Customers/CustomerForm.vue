<template>
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                Formul&aacute;lio de Cliente
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body class="row">
                
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="text" name="nome" id="nome" class="form-control" v-model="entity.name" placeholder="nome" required>
                        <label for="nome" class="form-label">Nome</label>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="text" name="cpf" id="cpf" class="form-control" v-model="entity.cpf" placeholder="cpf" required>
                        <label for="cpf" class="form-label">CPF</label>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="tel" name="telefone" id="telefone" class="form-control" v-model="entity.phone" placeholder="telefone" required>
                        <label for="telefone" class="form-label">Telefone</label>
                    </div>
                </div>
                
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="email" name="email" id="email" class="form-control" v-model="entity.email" placeholder="email" required>
                        <label for="email" class="form-label">E-mail</label>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="date" name="nascimento" id="nascimento" class="form-control" v-model="entity.dateBirth" placeholder="nascimento" required>
                        <label for="nascimento" class="form-label">Nascimento</label>
                    </div>
                </div>
                
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="text" name="rfid" id="rfid" class="form-control" v-model="entity.rfid" placeholder="RFID" required>
                        <label for="rfid" class="form-label">RFID</label>
                    </div>
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
import { useCustomerStore } from "~~/stores/CustomerStore";
import { storeToRefs } from "pinia";


export default defineComponent({
    emits:['saved', 'close'],
    setup(props,{emit}) {

        const { save, update, getById, resetEntity } = useCustomerStore();
        const { errors, entity, isEdit } = storeToRefs(useCustomerStore());

        const isOpen = ref(false);

        const formSave = async () => {
            if(isEdit.value === false) await save(entity.value);
            else await update(entity.value, entity.value.rfid);
            emit('saved');
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