import { defineStore } from 'pinia';
import api from '~/services/api'
import { Usuario, UsuarioEdit } from '~~/models/Usuario';

export const useUserStore = defineStore('user', () => {
    const entity = reactive(new Usuario());
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
        await api.post(path, data);
    }

    const update = async (data:any, id:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new UsuarioEdit()));
        await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update };
  })
  