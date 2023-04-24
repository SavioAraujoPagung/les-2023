<template>
    <div class="h-100">
        <Sidebar />
        <main class="main-content d-flex flex-column align-items-center justify-content-center">
            <div class="container shadow-lg border-1 p-5">
                <slot></slot>
            </div>
        </main>
    </div>
</template>