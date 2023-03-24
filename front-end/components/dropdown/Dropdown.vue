<template>
    <div class="flex-dropdown mx-5 mx-md-0 d-flex flex-column align-items-center">
        <a href="#" class="flex-dropdown-toggle btn btn-dark" data-toggle="flex-dropdown" @click.stop.prevent="toogle" >
            {{title}}
            <i class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </i>
        </a>
        <transition>
            <ul id="dropdownList" class="bg-white" v-show="isOpen">
                <slot></slot>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: "Dropdown",
        }
    },
    setup(props) {

        
        const isOpen = ref(false);

        const toogle = () =>{ isOpen.value = !isOpen.value;}

        provide("dropdown", { toogle });

        const dropdown = ref(null)

        const clickOutListener = (evt:any) => { if(dropdown.value && !( <HTMLElement> dropdown.value)?.contains(evt.target)) isOpen.value = false };

        onMounted(()=>{ document.addEventListener("click", clickOutListener) });

        return { toogle, isOpen, dropdown }
    },
})
</script>

<style scoped>
    .flex-dropdown {
    position: relative;
    }

    .flex-dropdown i{
    transition: all 0.6s;
    pointer-events: none;
    }

    .flex-dropdown > .flex-dropdown-toggle{
    display: flex;
    gap:.5rem;
    align-items: center;
    }

    .flex-dropdown a{
    text-decoration: none;
    }

    .flex-dropdown ul::after{
    content: ".";
    width: 2rem;
    left: 50%;
    top: 1px;
    transform: translate(-50%, -1.5rem);
    position: absolute;
    background-color: #fff;
    clip-path: polygon(50% 35%, 0 100%, 100% 100%);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }

    .flex-dropdown ul{
    /* display: none; */
    list-style: none;
    position: absolute;
    border-radius: 1.25rem;
    min-width: 10rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 1rem;
    left:50%;
    transform: translateX(-50%);
    top: calc(100% + 30px);
    }

    .v-enter-active, .v-leave-active {
        transition: opacity 0.3s ease;
    }
    .v-enter-from, .v-leave-to {
        opacity: 0;
    }

</style>