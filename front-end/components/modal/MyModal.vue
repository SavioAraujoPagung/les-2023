<template>
    <transition>
        <div class="my-modal col-sm-12">
            <div class="my-modal-inner">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style>
    .my-modal{
        position:fixed;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .my-modal-inner{
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        padding: 2rem;
        min-width: 60%;
        max-width: 80%;
        max-height: 90%;
        overflow-y: auto;
    }

    .v-enter-active, .v-leave-active {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    .v-enter-from, .v-leave-to {
        opacity: 0;
    }

</style>