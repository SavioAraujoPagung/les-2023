import { defineStore } from 'pinia';
import api from '~/services/api'
import SelfService from '~/models/SelfService'

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

    const destroy = async (id:any) => {
        const response = await api.delete(path + id);
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
  