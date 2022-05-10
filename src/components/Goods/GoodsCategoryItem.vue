<template>

  <div class="w-full p-3">
      <!--Graph Card-->
      <div class="bg-gray-900 border border-gray-800 rounded shadow">
          <div class="border-b border-gray-800 p-3">
              <h5 class="font-bold uppercase text-gray-400">{{ goodsCategory.name }}</h5>
          </div>
          <div class="p-5">
            <GoodItem :good="good" v-for="good in goodsCategory.goods" :key="good.G + '_' + good.T" />
          </div>
      </div>
      <!--/Graph Card-->
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