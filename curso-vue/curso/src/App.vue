<template>
    <div>
        <HelloWorld/>
        <LifeCycleHooks/>
        <Pessoa/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';
    import LifeCycleHooks from './components/LifeCycleHooks.vue';
    import Pessoa from './components/Pessoa.vue';

    export default {
        name: 'App',
        components: {
            HelloWorld,
            LifeCycleHooks,
            Pessoa
        }
    }
</script>