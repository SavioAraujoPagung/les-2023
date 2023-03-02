<template>
  <div>
        <p>Estou aqui trabalhando no momento com golang</p>
        <ul>
            <li>golang</li>
            <li>JS</li>
            <li>vue</li>
        </ul>
        <FormVue/>

    </div>
</template>

<script>
    import FormVue from './form/FormVue.vue';
    export default {
        name: 'info',
        components: {
            FormVue
        }
    }
</script>

<style>

</style>