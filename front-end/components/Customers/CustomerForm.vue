<template>
    <div>
        
    </div>
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                Formul&aacute;lio de Usu&aacute;rio
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                
                <div class="form-floating mb-3">
                    <input type="text" name="nome" id="nome" class="form-control" v-model="entity.name" placeholder="nome" required>
                    <label for="nome" class="form-label">Nome</label>
                </div>
                
                <div class="form-floating mb-3">
                    <input type="email" name="email" id="email" class="form-control" v-model="entity.email" placeholder="email" required>
                    <label for="email" class="form-label">E-mail</label>
                </div>

                <div class="form-floating mb-3">
                    <!-- <input type="password" name="password" id="password" class="form-control" v-model="entity.password" placeholder="password" required>
                    <label for="password" class="form-label">Senha</label> -->
                </div>

                <div class="form-floating mb-3">
                    <!-- <select name="gender" id="gender" class="form-control" v-model="entity.gender">
                        <option value="">Selecione</option>
                        <option value="m">Masculino</option>
                        <option value="f">Feminino</option>
                    </select> -->
                    <label for="gender" class="form-label">Sexo</label>
                </div>

                <div class="form-floating mb-3">
                    <!-- <input type="text" name="office" id="office" class="form-control" v-model="entity.office">
                    <label for="office" class="form-label">Cargo</label> -->
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
        const { errors, entity } = storeToRefs(useCustomerStore());

        const isOpen = ref(false);

        const formSave = async () => {
            // console.log("🚀 ~ file: UserForm.vue:70 ~ formSave ~ entity:", entity.value.id);
            // return false;
            if(entity.value.id == null) await save(entity);
            else await update(entity.value, entity.value.id);
            emit('saved');
        }

        const closeModal = () =>{
            resetEntity();
            emit('close');
        }

        // watch(()=>props.editedId, (newVal) => {
        //     if(newVal != 0) getById(newVal);
        // });

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