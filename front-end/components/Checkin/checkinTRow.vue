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
            </DropdownActionDropdown>
        </td>
    </tr>
</template>

<script lang="ts">
import Broadcast from "../icons/Broadcast.vue"


export default defineComponent({
  components: { Broadcast },
    emits:['delete', 'edit', 'checkin', 'checkout'],
    setup(props, {emit}) {
        return {emit}
    },
})
</script>