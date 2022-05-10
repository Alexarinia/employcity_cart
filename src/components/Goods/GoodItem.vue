<template>
  <div class="catalog-item text-white">
    {{ good.name }}
  </div>
</template>

<script>

export default {
  name: 'GoodsItem',
  data() {
    return {
    }
  },
  props: {
    good: Object
  },
  mounted() {
    //console.log(this.good);
  }
}
</script>
