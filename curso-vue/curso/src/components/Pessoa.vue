<template>
    <div>
        <h2>Esta é a descricao da pessoa:{{ nome }}</h2>
        <info/>
    </div>

</template>

<script>
    import info from './info.vue'
    export default {
        components: { info },
        name: 'Pessoa',
        data() {
            return {
                nome: "savio"
            }
        }
    }
</script>