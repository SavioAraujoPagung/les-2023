import { defineStore } from 'pinia';
import api from '~/services/api'
import { Cliente, ClientEdit } from '~~/models/Cliente';

export const useClientStore = defineStore('client', () => {
    const entity = reactive(new Cliente());
    const entities = ref([]);
    const path = entity.path;
    const errors = ref("");
    // const doubleCount = computed(() => count.value * 2)

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

    const resetEntity = () => Object.assign(entity, new Cliente());

    const getSubSet = (object:any, types:any) => {
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const save = async (data:any) => {
        await api.post(path, data);
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new ClientEdit()));
        await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update};
  })
  