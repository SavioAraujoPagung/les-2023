<template>
  <nav class="navbar navbar-ligh bg-gradient-primary">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand p-4" to="/">
        <img src="@/assets/img/brand.webp" alt="logo" class="img-fluid">
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar"
        aria-controls="sidebar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end bg-gradient-primary" tabindex="-1" id="sidebar"
        aria-labelledby="sidebarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-dark fw-bold h3" id="sidebarLabel">Admnistrador</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item">
              <NuxtLink class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/usuarios">
                <i class="icon icon-16">
                  <IconsPersonFill/>
                </i>
                Usu&aacute;rios
              </NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link d-flex align-items-center gap-2 text-white" to="/logout">
                <i class="icon icon-16"><IconsBoxArrowLeft/></i>
                Sair
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>