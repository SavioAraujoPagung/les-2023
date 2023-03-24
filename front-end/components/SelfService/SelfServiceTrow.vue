<template>
    <tr>
        <slot></slot>
        <td class="align-middle">
            <DropdownActionDropdown>
                <DropdownItem @click="emit('delete')">
                    <i class="icon icon-16">
                        <IconsTrash/>
                    </i>
                    Excluir
                </DropdownItem>
            </DropdownActionDropdown>
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