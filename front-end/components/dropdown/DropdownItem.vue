<template>
    <li>
        <div class="dropdown-item" @click="closeDropdown">
            <slot></slot>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    props:{
        target:String,
        link:String
    },
    setup(props) {
        const dropdown = inject("dropdown");
        const closeDropdown = () => {
            dropdown?.toogle();
        }
        const target = ref(props.target);
        const link = ref(props.link);
        const router = useRouter();
        const redirect = () => {
            const routerData = ref(router.resolve({name:link.value}));
            window.open(routerData.value.href, target.value);
        }
        return {redirect, closeDropdown};
    },
})
</script>

<style scoped>
    li{
    width: 100%;
    border-radius: 1.25rem;
    padding: 1rem 2rem;
    text-align: center;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem !important;
    }

    a{
    color: var(--flex-dark);
    white-space: nowrap;
    }

    li:hover{
    background-color: #18465d10;
    transition: all .5s;
    cursor: pointer;
    }

</style>