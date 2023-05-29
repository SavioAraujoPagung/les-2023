<template>
    <div>
        <div style="z-index:2000;" id="modalReportForChopp" class="bg-white position-fixed w-100 h-100 start-0 top-0 align-items-center justify-content-center">
            <div class="w-100 p-5">
                <h2 class="fw-bold text-uppercase mb-3">Relatório de balanço de estoque</h2>
                <div class="mb-3 p-3">
                    
                    <div v-for="(information, i) in dataProducts" :key="i" :id="'information'+i" class="mb-5">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th colspan="4" class="text-center h5 fw-bold bg-light">{{information.type === 'products' ? 'Cozinha' : 'Chopp'}}</th>
                                </tr>
                                <tr>
                                    <th>Nome</th>
                                    <th>Valor de compra(R$)</th>
                                    <th>Valor de venda(R$)</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(informationProduct, i) in information.products" :key="i" :id="'informationProduct'+i">
                                    <td>{{ informationProduct.name }}</td>
                                    <td>{{ informationProduct.priceCost.toFixed(2) }}</td>
                                    <td>{{ informationProduct.saleCost.toFixed(2) }}</td>
                                    <td>{{ informationProduct.qtd }}</td>
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

    const { dataProducts } = storeToRefs(useReportStore());
    const { getReportForProduct } = useReportStore();

    const closeReportShow = () => {
        fadeOut(document.getElementById('modalReportForChopp'));
    }

    const printReport = () => {
        printDoc("modalReportForChopp");
    }

    const closeModal = () =>{
        emit('close');
    }

    onMounted(() => getReportForProduct())
    
</script>