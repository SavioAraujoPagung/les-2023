<template>
    <div class="flex-dropdown mx-5 mx-md-0 d-flex flex-column align-items-center">
        <a href="#" class="flex-dropdown-toggle display-6 text-dark" data-toggle="flex-dropdown" @click.stop.prevent="toogle" >
            <i class="icon icon-24"><icons-three-dots /></i>
        </a>
        <transition>
            <ul ref="dropdown" id="dropdownList" class="bg-white" v-show="isOpen">
                <slot></slot>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">

export default defineComponent({
    setup() {

        const isOpen = ref(false);

        const toogle = () =>{ isOpen.value = !isOpen.value;}

        provide("dropdown", { toogle });

        const dropdown = ref(null);

        const clickOutListener = (evt:any) => {
            if(dropdown.value && !(<HTMLElement> dropdown.value)?.contains(evt.target)) isOpen.value = false 
        };
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
    z-index: 1;
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