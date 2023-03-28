import { defineStore } from 'pinia';
import api from '~/services/api'
import SelfService from '~/models/SelfService'
import Swal from 'sweetalert2';

export const useSelfServiceStore = defineStore('SelfService', () => {
    const entity = reactive(new SelfService());
    const entities = ref(new Array<SelfService>());
    const path = entity.path;
    const errors = ref("");
    const loading = ref(true);

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

    const resetEntity = () => Object.assign(entity, new SelfService());

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
  