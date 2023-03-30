import { defineStore } from 'pinia';
import api from '~/services/api'
import KitchenRequest from '~/models/KitchenRequest'
import Swal from 'sweetalert2';

export const useKitchenRequestStore = defineStore('KitchenRequest', () => {
    const entity = reactive(new KitchenRequest());
    const entities = ref(new Array<KitchenRequest>());
    const path = entity.path;
    const errors = ref("");
    const loading = ref(true);

    const getAll = async () => {
        loading.value = true;
        await api.get(path + "status").then((response) => {
            entities.value = response.data;
        })
        .catch((error) => {
            errors.value = error.message;
        })
        .finally(() => loading.value = false);
    }

    const getById = async (id:any) => {
        const response = await api.get(path + id );
        Object.assign(entity,response.data);
    }

    const destroy = async (id:any, elem:any = undefined) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Esta ação não pode ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c57e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, executar o registro!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(path + id).then(async (response) => {
                    if(elem) await fadeOut(elem);
                    Swal.fire({
                        icon: 'success',
                        title: 'registro executado com sucesso!',
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

    const resetEntity = () => Object.assign(entity, new KitchenRequest());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const resetErrors = () => errors.value = "";

    const save = async (data:any) => {
        await api.post(path, data).then((response) => {
            return response.data;
        }).catch((error) => {
            errors.value = error.message;
        });
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, resetErrors, loading };
  })
  