<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Adicione produtos no estoque</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body class="row">
                
                <div class="col-sm-6">
                    <div class="form-floating mb-3">
                        <input type="text" name="nome" id="nome" class="form-control" v-model="entity.foodName" placeholder="nome" required>
                        <label for="nome" class="form-label">Nome</label>
                    </div>
                </div>

                <div class="col-sm-2">
                    <div class="form-floating mb-3">
                        <input type="number" name="qtd" id="qtd" class="form-control" v-model="entity.qtd" placeholder="qtd" required>
                        <label for="qtd" class="form-label">Quantidade</label>
                    </div>
                </div>

                <div class="col-sm-3">
                    <button type="button" class="btn btn-primary fw-bold" @click="addItens">Adicionar</button>
                </div>

                <div class="col-sm-12 mb-5">
                    <DefaultTable v-if="newItens.length">
                        <thead>
                            <th class="col-sm-7">Nome</th>
                            <th class="col-sm-3">Quantidade (g)</th>
                            <th class="col-sm-2">&nbsp;</th>
                        </thead>
                        <tbody>
                            <tr v-for="(product, i) in newItens" :key="i" :id="'newProduct'+i">
                                <td>{{ product.foodName }}</td>
                                <td>{{ product.qtd }}</td>
                                <td>
                                    <a href="javascript:;" class="icon icon-16 text-primary" @click="increment(i)">
                                            <IconsArrowUpFill />
                                    </a>
                                    <a href="javascript:;" class="icon icon-16 text-danger" @click="decrement(i)">
                                        <IconsArrowDownFill />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </DefaultTable>
                </div>

            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary fw-bold text-white" type="submit">Confirmar</button>
            </modal-footer>
        </form>
    </ModalMyModal>

</template>

<script lang="ts">
import { useSelfServiceStore } from "~~/stores/SelfServiceStore";
import { storeToRefs } from "pinia";
import SelfService from "~~/models/SelfService";


export default defineComponent({
    emits:['saved', 'close'],
    setup(props,{emit}) {

        const { save, resetEntity, resetErrors } = useSelfServiceStore();
        const { errors, entity } = storeToRefs(useSelfServiceStore());

        const { $swal } = useNuxtApp();
        const newItens = ref(new Array<SelfService>());

        const closeModal = () =>{
            resetEntity();
            emit('close');
        }

        const increment = (index:any) => {
            if(index >= 0 && isset(newItens.value[index])) newItens.value[index].qtd++
        }
        
        const decrement = (index:any) => {
            if(index >= 0 && isset(newItens.value[index])) newItens.value[index].qtd--
        }

        const formSave = async () => {
            await save(newItens.value);
            if(errors.value.length > 0){
                $swal.fire({
                    icon: 'error',
                    title: errors.value,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else emit('saved');
            resetErrors();
        }

        const addItens = () => {
            if(!entity.value.foodName.length || entity.value.qtd <= 0){
                $swal.fire({
                    icon: 'error',
                    title: "É necessário escrever algum nome de prato e/ou a quantidade do mesmo deve ser maior que 0 para adiciona-lo!",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000
                });
                return false;
            }
            let index = newItens.value.findIndex(obj => obj.foodName === entity.value.foodName);
            if(index >= 0 && isset(newItens.value[index])) newItens.value[index].qtd += entity.value.qtd
            else newItens.value.push(getSubSet(entity.value, Object.getOwnPropertyNames(new SelfService())));
        }

        return {
            entity,
            errors,
            closeModal,
            newItens,
            addItens,
            increment,
            decrement,
            formSave
        }   
    },
})
</script>