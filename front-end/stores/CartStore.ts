import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import Cart from '~~/models/Cart';
import { Customer } from '~~/models/Customer';

export const useCartStore = defineStore('cart', () => {
    const entity = reactive(new Cart());
    const entities = ref(new Array<Customer>());
    const path = entity.path;
    const errors = ref("");
    const loading = ref(true);

    const getCustomerCart = async (rfid:string) => {
        if (entities.value.some(e => e.rfid === rfid)) {
            Swal.fire({
                icon: 'error',
                title: "Cliente já inserido",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return false;
        }

        loading.value = true;

        if(entities.value.length <= 0){

            await api.get("/customer/" + rfid).then((response) => {
                entity.customer = response.data;
                entities.value.push(response.data);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            });

        }
        else{
            await api.get("/customer/" + rfid).then((response) => {
                entities.value.push(response.data);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            });
        }

        await api.get("/consumption/" + rfid).then((response) => {
            entity.productCart.push(...response.data);
        }).catch((error) => {
            let index = entities.value.findIndex(e => e.rfid === rfid)
            entities.value.splice(index, 1);
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        });
        await api.get("/consumption/pagar/" + rfid).then((response) => {
            entity.total += +response.data
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        });
    }

    const resetCustomers = () => entities.value = new Array<Customer>();

    const getById = async (id:any) => {
        const response = await api.get(path + id );
        Object.assign(entity,response.data);
    }

    const pay = async () => {

        let success = true;

        let savedEntities = new Array();

        entities.value.forEach(customer => {
            savedEntities.push({
                customer:{
                    rfid: customer.rfid
                }
            });
        });

        await api.post('/check-in/pagar/' + entity.customer?.rfid, savedEntities).then((response) => {
            
            Swal.fire({
                icon: 'success',
                title: "Pagamento efetuado com sucesso!",
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
            success = false;
        });

        return success;

    }

    const resetEntity = () => {
        Object.assign(entity,new Cart());
        entities.value = new Array<Customer>();
    }

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
        let object = getSubSet(data, Object.getOwnPropertyNames(new Cart()));
        await api.put(path + id, object);
    }
  
    return { 
        entity,
        entities,
        errors,
        getById,
        resetEntity,
        save,
        loading,
        update,
        getCustomerCart,
        resetCustomers,
        pay
    };
  })
  