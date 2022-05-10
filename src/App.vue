<template>
  <CatalogNavbar @toggleCart="toggleCart" />
  <div class="container w-full mx-auto pt-20 text-gray-800">
    <GoodsCatalog />
  </div>
  <CatalogCart @toggleCart="toggleCart"
               v-show="cartActive" />
</template>

<script>
import GoodsCatalog from '@/components/GoodsCatalog.vue';
import CatalogCart from '@/components/Cart/CatalogCart';
import CatalogNavbar from '@/components/CatalogNavbar';

export default {
  name: 'App',
  components: {
    GoodsCatalog,
    CatalogCart,
    CatalogNavbar
  },
  data() {
    return {
      cartActive: false,
      cartGoods: {}
    };
  },
  methods: {
    toggleCart() {
      this.cartActive = !this.cartActive;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
