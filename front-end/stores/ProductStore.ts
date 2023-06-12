import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Consumption } from '~~/models/Consumption';
import { Product, ProductEdit } from '~~/models/Products';

export const useProductStore = defineStore('choop', () => {
    const entity = reactive(new Product());
    const entities = ref(new Array<Product>());
    const productPath = entity.path;
    const consumption = reactive(new Consumption());
    const loading = ref(true);
    const isEdit = ref(false);
    const success = ref(true);
    const errors = ref(false);

    const getAll = async (type:number) => {
        loading.value = true;
        await api.get(productPath + "type/" + type).then((response) => {
            entities.value = response.data;
        })
        .catch((error) => {
            errors.value = error.message;
        })
        .finally(() => loading.value = false);
    }

    const getById = async (id:any) => {
        const response = await api.get(productPath + id );
        Object.assign(entity,response.data);
        return response;
    }

    const makeConsumption = async (customerRfid:string, productRfid:string, qtd:number) => {
        await getById(productRfid).then(async (response) => {
            consumption.product = entity;
        }).catch(async (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Produto não encontrado!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });

        if(!success.value) return false;

        await api.get('/check-in/' + customerRfid).then(async (response) => {
            consumption.checkin = response.data;
        }).catch(async (err) => {
            Swal.fire({
                icon: 'error',
                title: 'CheckIn não encontrado!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });

        if(!success.value) return false;

        consumption.qtd = qtd;
        
        consumption.price = qtd * consumption.product.saleCost;

        await Swal.fire({
            title: 'O total do pedido é: R$ ' + (consumption.product.saleCost * qtd).toFixed(2) + '<br>Tem certeza que deseja realizar este pedido?',
            text: "Esta ação não pode ser revertida e a cobrança será gerada automaticamente ao seu cartão!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c57e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, realizar pedido!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.post(consumption.path, consumption).then(async (response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido realizado com sucesso!',
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
                    // await getAll();
                });
            }
        });

        success.value = true;
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
                    // await getAll();
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

    const saveAllInStock = async (data:any) => {
        await api.post(productPath + "stock", data).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Produtos inseridos com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
        return success;

    }

    const save = async (data:any) => {

        data.priceCost = parseMoney(data.priceCost);
        data.saleCost = parseMoney(data.saleCost);

        await api.post(productPath, data).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Produto cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
        return success;

    }

    const update = async (data:any, id:any) => {
        
        let object = getSubSet(data, Object.getOwnPropertyNames(new ProductEdit()));
        
        object.priceCost = parseMoney(object.priceCost);
        object.saleCost = parseMoney(object.saleCost);

        await api.put(productPath + id, object).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Produto alterado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
        
        return success;
    }
  
    return { 
        entity,
        entities,
        errors,
        getAll,
        loading,
        getById,
        destroy,
        resetEntity,
        save,
        update,
        makeConsumption,
        isEdit,
        saveAllInStock
    };
  })