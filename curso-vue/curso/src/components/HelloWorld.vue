<template>
    <div>
        <h1>Ola Hello World</h1>
        <p>meu nome é {{ nome }}</p>
    </div>

</template>

<script>
    export default {
        name: 'HelloWorld',
        data()
        {
            return {
                nome: "savio"
            }
        }
    }
</script>
