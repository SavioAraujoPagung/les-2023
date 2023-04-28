import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Choop, ChoopEdit, StockChoop} from '~~/models/Choop';

export const useChoopStore = defineStore('choop', () => {
    const entity = reactive(new Choop());
    const entities = ref(new Array<Choop>());
    const productPath = entity.path;
    const loading = ref(true);
    
    const stock = ref(new Array<StockChoop>());
    const stockPath = new StockChoop().path;
    
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
        await api.get(productPath).then((response) => {
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

    const getByRFID = async (rfid:number = 0) => {
        let newRfid = rfid ? rfid : entity.rfid;
        const response = await api.get(productPath + "rfid/" + newRfid );
        Object.assign(entity,{
            name: response.data.name,
            cost: response.data.cost
        });
        return response;
    }

    const saveAllInStock = async (data:any) => {
        await api.post(stockPath, data);
    }

    const makeConsumption = async (data:object) => {
        await Swal.fire({
            title: 'Tem certeza que deseja realizar este pedido?',
            text: "Esta ação não pode ser revertida e a cobrança será gerada automaticamente ao seu cartão!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c57e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, realizar pedido!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.post(productPath + "saida/", data).then(async (response) => {
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
                    await getAll();
                });
            }
        });
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

    const resetEntity = () => Object.assign(entity,new Choop());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const save = async (data:any) => {
        let success = true;
        await api.post(productPath, data).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Choop cadastrado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: "O RFID inserido já existe no sistema!",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success = true;
        });
        return success;
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new ChoopEdit()));
        await api.put(productPath + id, object);
    }
  
    return { entity, entities, errors, getAll, loading, getById, destroy, resetEntity, save, update, getAllStock, getByRFID, stock, saveAllInStock, makeConsumption };
  })
  