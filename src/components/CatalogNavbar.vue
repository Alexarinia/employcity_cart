<template>
  <nav id="header" class="bg-gray-900 fixed w-full z-10 top-0 shadow border-b border-white pb-2">
    <div class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
      <div class="w-1/2 pl-2 md:pl-0">
        <a class="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold" href="/"> 
          <i class="fas fa-moon text-blue-400 pr-3"></i> Employcity Shop
        </a>
      </div>
      <div class="w-1/2 pr-0">
        <div class="flex relative float-right">
          <div class="relative text-sm text-gray-100">
            <button id="userButton" @click="clickCart" type="button" class="flex items-center focus:outline-none mr-3">
              <img alt="Корзина" class="text-white w-[50px] h-[50px]" src="@/assets/cart.svg">
            </button>
          </div>
        </div>
      </div>
    </div>
	</nav>
</template>

<script>

export default {
  name: 'CatalogNavbar',
  emits: [
    'toggleCart'
  ],
  methods: {
    // Клик на корзину
    clickCart() {
      this.$emit('toggleCart');
    }
  }
}
</script>