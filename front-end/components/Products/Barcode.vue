<template>
    <div class="barcode ratio ratio-21x9 divCanvas">
        <canvas class="object-fit-contain" ref="barcode"></canvas>
    </div>
</template>

<script lang="ts" setup>
import JsBarcode from "jsbarcode";

const props = defineProps({
    barcode: {
        type: String,
        default: "",
        required: true
    }
});
    const barcode = ref(null);
    onMounted(() => {
        if(props.barcode !== "") JsBarcode(barcode.value, props.barcode);
        const divCanvas = barcode.value ? (<HTMLCanvasElement> barcode.value).parentElement : "";
        if(divCanvas && barcode.value){
            divCanvas.innerHTML ="<img class='object-fit-contain' src='"+(<HTMLCanvasElement> barcode.value).toDataURL('image/jpeg')+"'/>";
        }
    });
</script>

<style>
    .ratio-21x9 {
        --bs-aspect-ratio: 49.8571428571%;
    }
</style>
