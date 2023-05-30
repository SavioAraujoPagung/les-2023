<template>
    <div>
        <ModalMyModal>
            <form v-on:submit.prevent="formSave">
                <modal-header>
                    Relatório de ganhos e gastos
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </modal-header>
                <modal-body class="row">
                    
                    <div class="col-sm-6">
                        <div class="form-floating">
                            <input type="date" class="form-control" v-model="reportStart" name="reportStart" id="reportStart" placeholder="seu dado aqui" required>
                            <label for="">Início</label>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="form-floating">
                            <input type="date" class="form-control" name="reportFim" v-model="reportEnd" id="reportFim" placeholder="seu dado aqui" required>
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
        <div style="display: none;z-index:2000;" id="modalReportForExpense" class="bg-white position-fixed w-100 h-100 start-0 top-0 align-items-center justify-content-center">
            <div class="w-100 p-5">
                <h2 class="fw-bold text-uppercase mb-3">Relatório de consumo de consumo e gastos</h2>
                <div class="mb-3 p-3">
                    
                    <div id="expensesandprofit" class="mb-5">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th colspan="4" class="text-center h5 bg-light">
                                        <p class="fw-bold mb-5">Ganhos e gastos no período de {{ formatDate(new Date(reportStart)) }} - {{ formatDate(new Date(reportEnd)) }}</p>
                                        <p>Saldo anterior a data {{ formatDate(new Date(reportStart)) }}: <span class="fw-bold">R${{ unparseMoney(Number((dataExpense.revenue).toFixed(2))) }}</span></p>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Data</th>
                                    <th>Ganhos(R$)</th>
                                    <th>Gastos(R$)</th>
                                    <th>Saldo(R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dataValue, i) in dataExpense.reportExpenses" :key="i" :id="'dataExpense'+i">
                                    <td>{{ formatDate(new Date(dataValue.day)) }}</td>
                                    <td>{{ unparseMoney(Number((dataValue.revenue).toFixed(2))) }}</td>
                                    <td>{{ unparseMoney(Number(dataValue.expense).toFixed(2)) }}</td>
                                    <td>{{ (dataValue.revenue - dataValue.expense).toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>
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

    const { dataExpense } = storeToRefs(useReportStore());
    const { getReportForExpense } = useReportStore();

    const reportStart = ref('');
    const reportEnd = ref('');

    const formSave = async () => {
        getReportForExpense((reportStart.value + 'T00:00'), (reportEnd.value + 'T23:59'));
    console.log("🚀 ~ file: ExpensesReport.vue:83 ~ dataExpense:", dataExpense.value)

        fadeIn(document.getElementById('modalReportForExpense'));
    }

    const closeReportShow = () => {
        fadeOut(document.getElementById('modalReportForExpense'));
    }

    const printReport = () => {
        printDoc("modalReportForExpense");
    }

    const closeModal = () =>{
        emit('close');
    }
    
</script>