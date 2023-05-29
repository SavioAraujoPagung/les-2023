<template>
    <div>
        <ul class="nav nav-tabs" id="navChoop">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="javascript:;" @click="toggleComponents($event, true)">Produto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="toggleComponents($event,false)">Estoque</a>
            </li>
        </ul>
        <component :is="openProducts ? componentProduct : componentStock" />
    </div>
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'auth'
    });

    const openProducts = ref(true);

    useHead({
        title: 'Produtos - LES GROUP'
    });

    const toggleComponents = (event:any, type:boolean) => {
        if(openProducts.value !== type) openProducts.value = !openProducts.value;
        document.querySelector("#navChoop .active")?.classList.remove("active");
        event.target.classList.add("active");
    };

    const componentProduct = shallowRef(resolveComponent('product-list'));
    const componentStock = shallowRef(resolveComponent('product-stock-list'));

</script>