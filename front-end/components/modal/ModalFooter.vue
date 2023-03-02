<template>
    <div class="my-modal-footer">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'myModalFooter',
    setup() {
        return {}
    },
})
</script>

<style>
    .my-modal-footer{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
</style>