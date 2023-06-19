import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Usuario, UsuarioEdit } from '~~/models/Usuario';

export const useUserStore = defineStore('user', () => {
    const entity = reactive(new Usuario());
    const entities = ref(new Array<Usuario>());
    const path = entity.path;
    const errors = ref("");
    const loading = ref(true);

    const getFunction = () => {
        return localStorage.getItem('session');
    }

    const getAll = async () => {
        loading.value = true;
        await api.get(path).then((response) => {
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
            confirmButtonText: 'Sim, deletar o registro!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(path + id).then(async (response) => {
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

    const resetEntity = () => Object.assign(entity,new Usuario());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const save = async (data:any) => {
        await api.post(path, data).then((response) => {
            return response.data;
        }).catch((error) => {
            errors.value = error.message;
        });
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new UsuarioEdit()));
        await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, loading, update, getFunction };
  })
  