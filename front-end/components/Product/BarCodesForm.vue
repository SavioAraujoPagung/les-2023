<template>
    
    <ModalMyModal>
        <form v-on:submit.prevent="formSave">
            <modal-header>
                <h4 class="fw-bold text-dark">Solicite ingredientes do estoque</h4>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </modal-header>
            <modal-body>
                <div class="input-group mb-5">
                    <input type="search" ref="searchBar" @input="searchElements" placeholder="Pesquise por nome ou código de barras" class="form-control">
                </div>
                <div class="mb-5">
                    
                    <div v-if="filteredEntities.length" class="mb-5">
                        <h5 class="fw-bold text-primary">Produtos ainda não selecionados</h5>
                        <DefaultTable>
                            <thead>
                                <th class="col-sm-7">Cod. Barras</th>
                                <th class="col-sm-7">Nome</th>
                                <th class="col-sm-2">&nbsp;</th>
                            </thead>
                            <tbody>
                                <tr v-for="(product, i) in filteredEntities" :key="i" :id="'newProduct'+i">
                                    <td>{{ product.product.id }}</td>
                                    <td>{{ product.product.name }}</td>
                                    <td>
                                        <button class="fw-bold text-white btn btn-primary btn-sm" type="button" @click="addItens($event, product)">+</button>
                                    </td>
                                </tr>
                            </tbody>
                        </DefaultTable>
                    </div>
                    <div v-if="selectedItens.length">
                        <h5 class="fw-bold text-primary">Produtos selecionados</h5>
                        <DefaultTable>
                            <thead>
                                <th class="col-sm-7">Cod. Barras</th>
                                <th class="col-sm-7">Nome</th>
                                <th class="col-sm-3">Quantidade</th>
                                <th class="col-sm-2">&nbsp;</th>
                            </thead>
                            <tbody>
                                <tr v-for="(product, i) in selectedItens" :key="i" :id="'newProduct'+i">
                                    <td>{{ product.product.id }}</td>
                                    <td>{{ product.product.name }}</td>
                                    <td>{{ product.qtd }}</td>
                                    <td>
                                        <a href="javascript:;" class="icon icon-16 text-primary" @click="increment(product)">
                                                <IconsArrowUpFill />
                                        </a>
                                        <a href="javascript:;" class="icon icon-16 text-danger" @click="decrement(product)">
                                            <IconsArrowDownFill />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </DefaultTable>
                    </div>
                </div>

            </modal-body>
            <modal-footer>
                <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary fw-bold text-white" type="submit">Imprimir</button>
            </modal-footer>
        </form>
        <div class="d-none" id="barcodesModal">
            <div class="row row-cols-3">
                <template v-for="(selectedProduct, i) in selectedItens" :key="i">
                    <div class="col mt-3" v-for="(newBarcode, k) in selectedProduct.qtd" :key="k">
                        <small style="font-size: .5rem;" class="fw-bold text-center d-block text-uppercase">{{ selectedProduct.product.name }}</small>
                        <ProductBarcode :barcode="selectedProduct.product.id ? selectedProduct.product.id : ''" />
                    </div>
                </template>
            </div>
        </div>
    </ModalMyModal>
</template>

<script lang="ts">

import { storeToRefs } from "pinia";
import { ProductForPrint, ProductType } from "~~/models/Products";
import { useProductStore } from "~~/stores/ProductStore";

export default defineComponent({
    emits:['saved', 'close'],
    setup(props,{emit}) {

        const { getAll } = useProductStore();
        const { entities } = storeToRefs(useProductStore());

        const newEntities = ref(new Array<ProductForPrint>());

        const filteredEntities = ref(new Array<ProductForPrint>());

        const selectedItens = ref(new Array<ProductForPrint>());

        const barcodesModal = ref(null);

        const searchBar = ref(null);

        const { $swal } = useNuxtApp();

        const searchElements = () => {
            if(!searchBar.value || (<HTMLInputElement> searchBar.value).value === ""){
                filteredEntities.value = newEntities.value;
                return false;
            }

            filteredEntities.value = newEntities.value.filter(obj => {
                if(searchBar.value &&
                ((obj.product.id?.toLowerCase().includes((<HTMLInputElement>searchBar.value).value))
                || (obj.product.name.toLowerCase().includes((<HTMLInputElement>searchBar.value).value)))) return true;
                return false;
            });
            
        }

        const formSave = () => {
            if(selectedItens.value.length <= 0) return false;
            printDoc("barcodesModal");
        }

        const closeModal = () => emit('close');

        const increment = (product:any) => {
            const index = selectedItens.value.indexOf(product);
            if(index >= 0 && isset(selectedItens.value[index])) selectedItens.value[index].qtd++
        }
        
        const decrement = (product:any) => {
            
            const index = selectedItens.value.indexOf(product);
            if(index >= 0 && isset(selectedItens.value[index])){
                
                if(selectedItens.value[index].qtd <= 1){
                    selectedItens.value[index].qtd--;
                    newEntities.value.push(product);
                    selectedItens.value.splice(index, 1);
                }

                else selectedItens.value[index].qtd--;
            }

        }

        const addItens = (event:any, product:ProductForPrint) => {
            const index = newEntities.value.indexOf(product);
            if(index >= 0) newEntities.value.splice(index,1);
            product.qtd++;
            selectedItens.value.push(product);
        }

        onMounted(async () => {
            await getAll(ProductType.another);
            entities.value.forEach(el => {
                let kitchenItem = new ProductForPrint();
                kitchenItem.idProduct = el.id;
                kitchenItem.product = el;
                newEntities.value.push(kitchenItem);
            })
            filteredEntities.value = newEntities.value;
        });

        return {
            closeModal,
            addItens,
            increment,
            decrement,
            entities,
            newEntities,
            searchBar,
            selectedItens,
            searchElements,
            filteredEntities,
            barcodesModal,
            formSave,
        }   
    },
})
</script>