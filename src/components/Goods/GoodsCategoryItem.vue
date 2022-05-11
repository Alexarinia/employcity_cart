<template>

  <div class="w-full p-3">
      <div class="bg-gray-900 border border-gray-800 rounded shadow">
          <div class="flex justify-center border-b border-gray-800 p-3 cursor-pointer"
              @click="collapsed = !collapsed">
              <h5 class="font-bold uppercase text-gray-200">
                {{ goodsCategory.name }}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  class="w-4 ml-2 text-3xl text-gray-600 inline mb-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    v-if="collapsed"
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                  <path
                    v-else
                    fill="currentColor"
                    class="rotate-180 origin-[50%_50%]"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </h5>
          </div>
          <div class="p-5" :class="{ hidden: collapsed }">
            <GoodItem :good="good" v-for="good in goodsCategory.goods" :key="good.uniqueId" />
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