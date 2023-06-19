<template>
    <div>
        <Sidebar />
        <main id="main-content" class="pt-0">
            <div class="container-xxl">
                <div class="card border-light shadow-lg p-2 p-lg-4">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>