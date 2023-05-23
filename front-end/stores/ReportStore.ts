import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '~/services/api'
import { ChoppReport, ExpenseProfitReport, ReportForCostumer, ReportForUser } from '~~/models/Report';

export const useReportStore = defineStore('report', () => {
    const path = "/report/";
    const success = ref(true);
    const data = ref(new Array<ReportForCostumer>());
    const dataUser = ref(new Array<ReportForUser>());
    const dataChopp = ref(new Array<ChoppReport>());
    const dataExpense = ref(new ExpenseProfitReport());

    const getReportForCustomers = async (start:string, end:string) => {
        await api.get(path + `chopp/?start=${start}&end=${end}`).then((response) => {
            data.value = response.data;
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
    }
    
    const getReportForUsers = async (start:string, end:string) => {
        await api.get(path + `user/?start=${start}&end=${end}`).then((response) => {
            dataUser.value = response.data;
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
    }
    
    const getReportForChopp = async (start:string, end:string) => {
        await api.get(path + `chopp/?start=${start}&end=${end}&sort=liter`).then((response) => {
            dataChopp.value = response.data;
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
    }
    
    const getReportForExpense = async (start:string, end:string) => {
        await api.get(path + `expenses/?start=${start}&end=${end}`).then((response) => {
            dataExpense.value = response.data;
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            success.value = false;
        });
    }
    
    const sendReportForCustomers = async (start:string, end:string) => {
        await api.get(path + `?start=${start}&end=${end}&user=1`).then((response) => {
            Swal.fire({
                icon: 'error',
                title: 'E-mail enviado com sucesso',
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
            success.value = false;
        });
    }
  
    return {
        getReportForCustomers,
        getReportForChopp,
        sendReportForCustomers,
        getReportForExpense,
        getReportForUsers,
        success,
        dataChopp,
        dataExpense,
        dataUser,
        data
    };

  })
  