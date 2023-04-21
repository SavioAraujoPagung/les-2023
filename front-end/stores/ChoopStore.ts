import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import Choop from '~~/models/Choop';

export const useChoopStore = defineStore('choop', () => {
    
    const entity = reactive(new Choop());
    const entities = ref(new Array<Choop>());
    const loading = ref(true);
    
    const stock = ref(new Array<Choop>());
    
    const errors = ref("");

    const getAll = async () => {
        loading.value = true;
        await api.get(entity.path).then((response) => {
            entities.value = response.data;
        })
        .catch((error) => {
            errors.value = error.message;
        })
        .finally(() => loading.value = false);
    }

    const getById = async (id:any) => {
        const response = await api.get(entity.path + id );
        Object.assign(entity,response.data);
    }

    const getByRFID = async () => {
        const response = await api.get(entity.path + "rfid/" + entity.rfid );
        Object.assign(entity,{
            name: response.data.name,
            cost: response.data.cost
        });
        return response;
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
                await api.delete(entity.path + id).then(async (response) => {
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
        await api.post(entity.path, data).then((response) => {
            return response.data;
        }).catch((error) => {
            errors.value = error.message;
        });
    }
  
    return { entity, entities, errors, getAll, loading, getById, destroy, resetEntity, save, stock };
  })