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
                <DropdownItem @click="emit('edit')">
                    <i class="icon icon-16">
                        <IconsEdit />
                    </i>
                    Editar
                </DropdownItem>
                <DropdownItem @click="emit('checkin')">
                    <i class="icon icon-16">
                        <!-- <IconsEdit /> -->
                    </i>
                    CheckIn
                </DropdownItem>
            </DropdownActionDropdown>
        </td>
    </tr>
</template>

<script lang="ts">

export default defineComponent({
    emits:['delete', 'edit', 'checkin'],
    setup(props, {emit}) {
        return {emit}
    },
})
</script>