import { defineStore } from 'pinia';
import api from '~/services/api'
import SelfService from '~/models/SelfService'

export const useSelfServiceStore = defineStore('SelfService', () => {
    const entity = reactive(new SelfService());
    const entities = ref(new Array<SelfService>());
    const path = entity.path;
    const errors = ref("");

    const getAll = async () => {
        const response = await api.get(path);
        entities.value = response.data;
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
            console.log("🚀 ~ file: SelfServiceStore.ts:40 ~ awaitapi.post ~ response:", response)
            return response.data;
        }).catch((error) => {
            console.log("🚀 ~ file: SelfServiceStore.ts:40 ~ awaitapi.post ~ response:", error)
            errors.value = error.response.data.message;
        });

        // await api.post(path, data);
    }

    const update = async (data:any, id:any) => {
        // let object = getSubSet(data, Object.getOwnPropertyNames(new SelfServiceEdit()));
        // await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update, resetErrors};
  })
  