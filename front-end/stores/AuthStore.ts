import { defineStore } from 'pinia';
import api from '~/services/api'
import { UsuarioAuth } from '~/models/Usuario'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = reactive(new UsuarioAuth());
    const path = "users/login";
    const errors = ref("");

    const getSubSet = (object:any, newObject:Object) => {
        const types = Object.getOwnPropertyNames(newObject);
        return types.reduce((obj:any, type:any) => {
            return {
            ...obj,
            [type]: object[type]
            }
        }, {});
    }

    const doLogin = async (data:any) => {

        await api.post(path, getSubSet(data, new UsuarioAuth())).then((response) => {
            localStorage.setItem('session', response.data.office);
        }).catch((error) => {
            errors.value = error.response.data.message;
        });
        
    }
  
    return { user, doLogin, errors };
  })
  