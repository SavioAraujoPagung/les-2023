import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Product, ProductEdit, StockProduct} from '~~/models/Products';

export const useProductStore = defineStore('product', () => {
    const entity = reactive(new Product());
    const entities = ref(new Array<Product>());
    const productPath = entity.path;
    const loading = ref(true);
    
    const stock = ref(new Array<StockProduct>());
    const stockPath = new StockProduct().path;
    
    const errors = ref("");

    const getAll = async () => {
        loading.value = true;
        await api.get(productPath).then((response) => {
            entities.value = response.data;
        })
        .catch((error) => {
            errors.value = error.message;
        })
        .finally(() => loading.value = false);
    }

    const getAllStock = async () => {
        loading.value = true;
        await api.get(stockPath).then((response) => {
            stock.value = response.data;
        })
        .catch((error) => {
            errors.value = error.message;
        })
        .finally(() => loading.value = false);
    }

    const getById = async (id:any) => {
        const response = await api.get(productPath + id );
        Object.assign(entity,response.data);
    }

    const getByBarcode = async () => {
        const response = await api.get(productPath + "barcode/" + entity.barcode );
        Object.assign(entity,{
            name: response.data.name,
            cost: response.data.cost
        });
        return response;
    }

    const saveAllInStock = async (data:any) => {
        await api.post(stockPath, data);
    }

    const destroy = async (id:any, elem:any = undefined) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Esta ação não pode ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c57e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar o registro!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(productPath + id).then(async (response) => {
                    if(elem) await fadeOut(elem);
                    Swal.fire({
                        icon: 'success',
                        title: 'registro deletado com sucesso!',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: error.message,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }).finally(async () => {
                    await getAll();
                });
            }
        });
    }

    const resetEntity = () => Object.assign(entity,new Product());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const save = async (data:any) => {
        await api.post(productPath, data).then((response) => {
            return response.data;
        }).catch((error) => {
            errors.value = error.message;
        });
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new ProductEdit()));
        await api.put(productPath + id, object);
    }
  
    return { entity, entities, errors, getAll, loading, getById, destroy, resetEntity, save, update, getAllStock, getByBarcode, stock, saveAllInStock };
  })
  