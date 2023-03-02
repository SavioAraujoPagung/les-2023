<template>
    <div class="my-modal-header">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'MyModalHeader',
    setup() {
        return {}
    },
})
</script>

<style>
    .my-modal-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
</style>