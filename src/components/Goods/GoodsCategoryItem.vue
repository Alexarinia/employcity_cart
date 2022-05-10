<template>

  <div class="w-full p-3">
      <div class="bg-gray-900 border border-gray-800 rounded shadow">
          <div class="flex justify-center border-b border-gray-800 p-3"
              @click="collapsed = !collapsed">
              <h5 class="font-bold uppercase text-gray-200">{{ goodsCategory.name }}</h5>
              <span class="font-bold text-3xl text-gray-600">2 <span class="text-yellow-600"><i class="fas fa-caret-down"></i></span></span>
          </div>
          <div class="p-5" :class="{ hidden: collapsed }">
            <GoodItem :good="good" v-for="good in goodsCategory.goods" :key="good.G + '_' + good.T" />
          </div>
      </div>
  </div>
</template>

<script>
import GoodItem from '@/components/Goods/GoodItem';

export default {
  name: 'GoodsCategoryItem',
  components: {
      GoodItem
  },
  data() {
    return {
      collapsed: false
    }
  },
  props: {
    goodsCategory: Object
  }
}
</script>