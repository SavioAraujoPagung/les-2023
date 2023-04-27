import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Checkin, CustomerEdit} from '~~/models/Checkin';

export const useCheckinStore = defineStore('checkin', () => {
    const entity = reactive(new Checkin());
    const entities = ref(new Array<Checkin>());
    const path = entity.path;
    const errors = ref(false);

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

    const doCheckin = async (rfid:string) => {
        entity.rfid = "";
        await api.post('/check-in/' + rfid).then((response) => {
            Swal.fire({
                icon: 'success',
                title: "Check-in realizado com sucesso",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            errors.value = true;
        });
    }

    const doCheckout = async (rfid:string) => {
        entity.rfid = "";
        await api.post('/check-out/' + rfid).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Check-out efetuado com sucesso!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            errors.value = true;
        });
    }

    const clearErrors = () => errors.value = false;

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
  