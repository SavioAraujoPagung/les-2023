import { defineStore } from 'pinia';
import api from '~/services/api'
import Auth from '~/models/Auth'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = reactive(new Auth());
    const path = "login";
    const errors = ref("");

    const doLogin = async (data:any) => {
        await api.post(path + "login", data).then((response) => {
            localStorage.setItem('isLogged', 'true');
            console.log("🚀 ~ file: AuthStore.ts:16 ~ response ~ response:", response)
        }).catch((error) => {
            console.log("🚀 ~ file: AuthStore.ts:16 ~ awaitapi.post ~ error:", error)
        });
    }
  
    return { user, doLogin };
  })
  