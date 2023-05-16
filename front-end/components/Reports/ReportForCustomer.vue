<template>
    <div>
        <ModalMyModal>
            <form v-on:submit.prevent="formSave">
                <modal-header>
                    Relatório de consumo do cliente
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </modal-header>
                <modal-body class="row">
                    
                    <div class="col-sm-6">
                        <div class="form-floating">
                            <input type="datetime-local" class="form-control" v-model="reportStart" name="reportStart" id="reportStart" placeholder="seu dado aqui" required>
                            <label for="">Início</label>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="form-floating">
                            <input type="datetime-local" class="form-control" name="reportFim" v-model="reportEnd" id="reportFim" placeholder="seu dado aqui" required>
                            <label for="">Fim</label>
                        </div>
                    </div>
        
        
                </modal-body>
                <modal-footer>
                    <button class="btn btn-outline-danger" type="button" @click="closeModal">Cancelar</button>
                    <button class="btn btn-primary" type="submit">Visualizar</button>
                </modal-footer>
            </form>
        </ModalMyModal>
        <div style="display: none;z-index:2000;" id="modalReportForCustomer" class="bg-white position-fixed w-100 h-100 start-0 top-0 align-items-center justify-content-center">
            <div class="w-100 p-5">
                <h2 class="fw-bold text-uppercase mb-3">Relatório de consumo do cliente</h2>
                <div class="mb-3 p-3">
                    
                    <div v-for="(information, i) in data" :key="i" :id="'information'+i" class="mb-3">
                        <h5 class="fw-bold text-uppercase text-center w-100 bg-light p-3 border border-1 border-default">{{ information.customer.name }} - {{ formatDate(information.time) }}</h5>
                        <div class="d-flex gap-3 align-items-center justify-content-between flex-wrap" v-for="(consumption, i) in information.consumptions" :key="i" :id="'consumption'+consumption.id">
                            <p class="mb-3">
                                <strong>NOME: </strong>{{ consumption.product.name }}
                            </p>
                            <p class="mb-3">
                                <strong>QUANTIDADE: </strong>{{ consumption.qtd }}
                            </p>
                            <p class="mb-3">
                                <strong>TOTAL(R$): </strong>{{ Number(consumption.price).toFixed(2) }}
                            </p>
                        </div>
                    </div>
                
                </div>
                <div class="d-flex align-items-center gap-3 justify-content-center" id="btnControlPrintAndSend">
                    <button class="btn btn-outline-danger" type="button" @click="closeReportShow">Cancelar</button>
                    <button class="btn btn-primary" type="button" @click="printReport">Imprimir e enviar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
    import { storeToRefs } from "pinia";
import { useReportStore } from "~~/stores/ReportStore";
    const emit = defineEmits(['saved', 'close']);

    const { data } = storeToRefs(useReportStore());
    const { getReportForCustomers, sendReportForCustomers } = useReportStore();

    const reportStart = ref('');
    const reportEnd = ref('');

    const formSave = async () => {
        getReportForCustomers(reportStart.value, reportEnd.value);
        fadeIn(document.getElementById('modalReportForCustomer'));
    }

    const closeReportShow = () => {
        fadeOut(document.getElementById('modalReportForCustomer'));
    }

    const printReport = () => {
        sendReportForCustomers(reportStart.value, reportEnd.value);
        printDoc("modalReportForCustomer");
    }

    const closeModal = () =>{
        emit('close');
    }
</script>