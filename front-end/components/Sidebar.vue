<template>
  <nav class="navbar navbar-ligh bg-gradient-primary">
    <div class="container-fluid">
      <NuxtLink @click=toggle class="navbar-brand p-4" to="/">
        <img src="@/assets/img/brand.webp" alt="logo" class="img-fluid">
      </NuxtLink>
      <button class="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar"
        aria-controls="sidebar">
        <i class="icon icon-32"><IconsMenu/></i>
      </button>
      <div class="offcanvas offcanvas-end bg-gradient-primary" tabindex="-1" id="sidebar"
        aria-labelledby="sidebarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-dark fw-bold h3" id="sidebarLabel">Admnistrador</h5>
          <button type="button" ref="closeBtn" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end">
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/usuarios">
                <i class="icon icon-16">
                  <IconsPersonFill/>
                </i>
                Usu&aacute;rios
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/clientes">
                <i class="icon icon-16">
                  <IconsCustomer/>
                </i>
                Clientes
              </NuxtLink>
            </li>
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/estoque">
                <i class="icon icon-16">
                  <IconsBox/>
                </i>
                Estoque
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/produtos">
                <i class="icon icon-16">
                  <IconsBag/>
                </i>
                Produtos
              </NuxtLink>
            </li>
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/selfservice">
                <i class="icon icon-16">
                  <IconsDish/>
                </i>
                Self Service
              </NuxtLink>
            </li>
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/solicitacaocozinha">
                <i class="icon icon-16">
                  <IconsKitchen/>
                </i>
                Cozinha
              </NuxtLink>
            </li>
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-white" aria-current="page" to="/caixa">
                <i class="icon icon-16">
                  <IconsWallet/>
                </i>
                Caixa
              </NuxtLink>
            </li>

            <li class="nav-item">
              <a href="javascript:;" @click="logout" class="nav-link d-flex align-items-center gap-2 text-white">
                <i class="icon icon-16"><IconsBoxArrowLeft/></i>
                Sair
              </a>
            </li>


          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

  const closeBtn = ref(null);
  const isOpen = ref(false);
  const toggle = () => closeBtn.value.click();

  const logout = () => {
    navigateTo('login');
    localStorage.removeItem("isLogged");
  }

</script>

<style scoped>

  li.nav-item{
    position: relative;
  }
  li.nav-item::after{
    content: "";
    position: absolute;
    background-color: #fff;
    border-radius: 1rem;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 0;
    width: 5px;
    transition: all 0.1s ease-in-out;
  }

  li.nav-item:hover::after{
    height: 70%;
    transition: all 0.1s ease-in-out;

  }

</style>