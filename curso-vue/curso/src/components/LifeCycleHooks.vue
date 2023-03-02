<template>
    <h1>Meu nome é {{ nome }}</h1>
</template>

<script>
    export default {
        name: 'LifeCycleHooks',
        data(){
            return {
                nome: "Nao sei ainda"
            }
        },
        created(){ //ao criar o componente
            setTimeout(()=>{
                this.nome = "Savio"
            }, 1000)

        },
        mounted() {
            setTimeout(()=>{
                this.nome = "Pagung"
            }, 2000)
        }
    }
</script>
