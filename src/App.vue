<template>
  <div class="container w-full mx-auto pt-20 text-gray-800">
    <GoodsCatalog msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import GoodsCatalog from '@/components/GoodsCatalog.vue'

export default {
  name: 'App',
  components: {
    GoodsCatalog
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
