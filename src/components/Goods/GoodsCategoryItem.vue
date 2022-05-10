<template>
  <div class="catalog-category-item" v-for="good in goodsCategory.goods" :key="good.G + '_' + good.T">
    <GoodItem :good="good" />
  </div>
</template>

<script>
import GoodItem from '@/components/Goods/GoodItem';

export default {
  name: 'GoodsCategoryItem',
  components: {
      GoodItem
  },
  props: {
    goodsCategory: Object
  },
  mounted() {
    console.log('goodsCategory');
    console.log(this.goodsCategory);
  }
}
</script>