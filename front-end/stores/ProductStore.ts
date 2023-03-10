import { defineStore } from 'pinia';
import api from '~/services/api'
import { Product } from '~~/models/Products';

export const useProductStore = defineStore('product', () => {
    const entity = reactive(new Product());
    const entities = ref(new Array<Product>());
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
        await api.post(path, data);
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new Product()));
        await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update };
  })
  