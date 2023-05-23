<template>
    <div>
        <ModalMyModal>
            <form v-on:submit.prevent="formSave">
                <modal-header>
                    Relatório de Chopps
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
        <div style="display: none;z-index:2000;" id="modalReportForChopp" class="bg-white position-fixed w-100 h-100 start-0 top-0 align-items-center justify-content-center">
            <div class="w-100 p-5">
                <h2 class="fw-bold text-uppercase mb-3">Relatório de consumo de Chopps</h2>
                <div class="mb-3 p-3">
                    
                    <div v-for="(information, i) in dataChopp" :key="i" :id="'information'+i" class="mb-5">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th colspan="2" class="text-center h5 fw-bold bg-light">{{ information.key }}</th>
                                </tr>
                                <tr>
                                    <th>Total consumido(L)</th>
                                    <th>Valor Total consumido(R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ unparseMoney(Number(information.report.totalLiter).toFixed(2)) }}</td>
                                    <td>{{ unparseMoney(Number(information.report.totalPrice).toFixed(2)) }}</td>
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

    const { dataChopp } = storeToRefs(useReportStore());
    const { getReportForChopp } = useReportStore();

    const reportStart = ref('');
    const reportEnd = ref('');

    const formSave = async () => {
        getReportForChopp(reportStart.value, reportEnd.value);
        fadeIn(document.getElementById('modalReportForChopp'));
    }

    const closeReportShow = () => {
        fadeOut(document.getElementById('modalReportForChopp'));
    }

    const printReport = () => {
        printDoc("modalReportForChopp");
    }

    const closeModal = () =>{
        emit('close');
    }
    
</script>