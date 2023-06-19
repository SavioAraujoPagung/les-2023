<template>
    <tr>
        <slot></slot>
        <td>
            <div class="d-flex align-items-center justify-content-center gap-3">
                <a href="javascript:;" @click="emit('edit')">
                    <i class="icon icon-16 text-primary">
                        <IconsEdit/>
                    </i>
                </a>
                <a href="javascript:;" @click="emit('delete')">
                    <i class="icon icon-16 text-danger">
                        <IconsTrash/>
                    </i>
                </a>
            </div>
        </td>
    </tr>
</template>

<script lang="ts">

export default defineComponent({
    emits:['delete', 'edit'],
    setup(props, {emit}) {
        return {emit}
    },
})
</script>