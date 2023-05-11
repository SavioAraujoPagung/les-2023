<template>
    <div>
        <ul class="nav nav-tabs" id="navChoop">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="javascript:;" @click="toggleComponents($event, true)">Choop</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="toggleComponents($event,false)">Estoque</a>
            </li>
        </ul>
        <component :is="openChoops ? componentChoop : componentStock" />
    </div>
</template>

<script setup lang="ts">

    definePageMeta({
        middleware: 'auth'
    });

    const openChoops = ref(true);

    useHead({
        title: 'Choops - LES GROUP'
    });

    const toggleComponents = (event:any, type:boolean) => {
        if(openChoops.value !== type) openChoops.value = !openChoops.value;
        document.querySelector("#navChoop .active")?.classList.remove("active");
        event.target.classList.add("active");
    };

    const componentChoop = shallowRef(resolveComponent('choop-list'));
    const componentStock = shallowRef(resolveComponent('choop-stock-list'));

</script>
