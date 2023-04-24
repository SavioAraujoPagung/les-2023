import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { Customer, CustomerEdit } from '~~/models/Customer';

export const useCustomerStore = defineStore('Customer', () => {
    const entity = reactive(new Customer());
    const entities = ref(new Array<Customer>());
    const path = entity.path;
    const errors = ref("");
    const loading = ref(true);
    const isEdit = ref(false);

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

    const getById = async (rfid:any) => {
        const response = await api.get(path + rfid );
        Object.assign(entity,response.data);
    }

    const destroy = async (rfid:any, elem:any = undefined) => {
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
                await api.put(path + rfid).then(async (response) => {
                    if(elem) await fadeOut(elem);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro deletado com sucesso!',
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

    const resetEntity = () => Object.assign(entity, new Customer());

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
            Swal.fire({
                icon: 'success',
                title: 'Cliente cadastrado com sucesso!',
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
        });
    }

    const update = async (data:any, rfid:any) => {
        let object = getSubSet(data, Object.getOwnPropertyNames(new CustomerEdit()));
        await api.put(path + rfid, object).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Cliente editado com sucesso!',
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
        });
    }
  
    return {
        entity,
        entities,
        errors,
        getAll,
        getById,
        destroy,
        resetEntity,
        save,
        loading,
        update,
        isEdit
    };
  })
  