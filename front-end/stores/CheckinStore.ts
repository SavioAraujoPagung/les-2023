import { defineStore } from 'pinia';
import api from '~/services/api'
import { Checkin, CustomerEdit} from '~~/models/Checkin';

export const useCheckinStore = defineStore('checkin', () => {
    const entity = reactive(new Checkin());
    const entities = ref(new Array<Checkin>());
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

    const doCheckin = async () => {
        await api.post(path, entity);
    }

    const doCheckout = async () => {

        await api.get(path + "rfid/" + entity.rfid).then((response) => {
            return;
        }).catch((error) => {
            errors.value = error.response.data.message;
        });

        // await api.get(path + rfid);
    }

    const clearErrors = () => errors.value = "";

    const resetEntity = () => Object.assign(entity,new Checkin());

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
        let object = getSubSet(data, Object.getOwnPropertyNames(new CustomerEdit()));
        await api.put(path + id, object);
    }
  
    return { entity, entities, errors, getAll, getById, destroy, resetEntity, save, update, doCheckin, doCheckout, clearErrors };
  })
  