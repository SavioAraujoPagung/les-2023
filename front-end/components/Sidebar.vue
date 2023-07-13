<template>
  <nav class="py-4 border-bottom border-light border-opacity-25 mb-5">
    <div class="container-xxl d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-3">
        <a class="text-decoration-none fw-bold text-white fs-1" href="#">LES GROUP</a>
        <a class="nav-link bg-light text-white bg-opacity-25 rounded-2 px-3 py-2" aria-current="page" href="#" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <i class="icon icon-16">
            <font-awesome-icon :icon="['fas', 'champagne-glasses']" />
          </i>
        </a>
      </div>
    </div>
  </nav>
  <div class="offcanvas offcanvas-start bg-light" tabindex="-1" id="sidebar"
        aria-labelledby="sidebarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-primary fw-bold h3" id="sidebarLabel">LES GROUP</h5>
          <button type="button" ref="closeBtn" class="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end">
            
            <li class="nav-item" v-if='userFunc == 1'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/usuarios">
                <i class="icon icon-16">
                  <IconsPersonFill/>
                </i>
                Usu&aacute;rios
              </NuxtLink>
            </li>

            <li class="nav-item" v-if='userFunc == 1 || userFunc == 2 || userFunc == 3'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/clientes">
                <i class="icon icon-16">
                  <IconsCustomer/>
                </i>
                Clientes
              </NuxtLink>
            </li>

            <li class="nav-item" v-if='userFunc == 1 || userFunc == 4'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/produto">
                <i class="icon icon-16">
                  <IconsBag/>
                </i>
                Produtos
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1 || userFunc == 4'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/choop">
                <i class="icon icon-16">
                  <IconsBeer/>
                </i>
                Choop
              </NuxtLink>
            </li>
            
            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/choop/saida">
                <i class="icon icon-16">
                  <IconsBeer/>
                </i>
                Saída de Choop
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1 || userFunc == 7 || userFunc == 8'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/selfservice">
                <i class="icon icon-16">
                  <IconsDish/>
                </i>
                Self Service
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/produto/saida">
                <i class="icon icon-16">
                  <IconsDish/>
                </i>
                Saída Self Service
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1 || userFunc == 4 || userFunc == 7'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/solicitacaocozinha">
                <i class="icon icon-16">
                  <IconsKitchen/>
                </i>
                Cozinha
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1 || userFunc == 5'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/caixa">
                <i class="icon icon-16">
                  <IconsWallet/>
                </i>
                Caixa
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1'>
              <NuxtLink @click=toggle class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" to="/relatorio">
                <i class="icon icon-16">
                  <icons-file-graph/>
                </i>
                Relatórios
              </NuxtLink>
            </li>
            
            <li class="nav-item" v-if='userFunc == 1'>
              <a @click="toggleModal" class="nav-link d-flex align-items-center gap-2 text-hover-primary" aria-current="page" href="javascript:;">
                <i class="icon icon-16">
                  <IconsDollar/>
                </i>
                Valor do self-service
              </a>
            </li>

            <li class="nav-item">
              <a href="javascript:;" @click="logout" class="nav-link d-flex align-items-center gap-2 text-hover-primary">
                <i class="icon icon-16"><IconsBoxArrowLeft/></i>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
  <component :is="openSelfService ? modalForm : 'div'" @close="toggleModal" @saved="toggleModal" />
</template>

<script setup>
import { useUserStore } from "~~/stores/UserStore";


  const openSelfService = ref(false);
  const closeBtn = ref(null);
  const isOpen = ref(false);

  const userFunc = ref(0);

  const { getFunction } = useUserStore();

  const modalForm = shallowRef(resolveComponent('SelfServiceChangeSelfServiceValue'));

  const toggle = () => closeBtn.value.click();

  const toggleModal = () => {
    toggle();
    openSelfService.value = !openSelfService.value;
  }

  const logout = () => {
    navigateTo('login');
    localStorage.removeItem("isLogged");
  }

  onMounted(() => userFunc.value = getFunction());


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