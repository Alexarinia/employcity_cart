<template>
  <div class="catalog-item text-white flex flex-row items-center mb-2">
    <div class="flex-1 text-left">
        <h3 class="font-bold text-gray-400">{{ good.name }} ({{ good.P }})</h3>
    </div>
    <div class="ml-4 flex-shrink w-[100px] pr-4">
        <div class="rounded p-3 bg-slate-700">{{ priceInRoubles }}</div>
    </div>
    <div class="ml-1 flex-shrink w-[100px] pr-4">
        <button type="button"
                @click="addGoodToCart(good)"
                class="rounded p-3 bg-slate-400"
                v-text="isInCart() ? '+1' : 'Крзн'">
        </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import fetchCartGoods from "@/store/cartGoods";
import * as countPrice from "@/store/countPrice";

export default {
  name: 'GoodsItem',
  data() {
    return {
        dollarRate: 70
    }
  },
  props: {
    good: Object
  },
  setup() {
    const { cartGoods, getCartGoods, addGoodToCart } = fetchCartGoods();

    onMounted(() => {
      getCartGoods();
    });

    return {
      cartGoods,
      addGoodToCart
    };
  },
  computed: {
    priceInRoubles() {
       return countPrice.priceInRoubles(this.good.P);
    }
  },
  methods: {
      addToCart() {
          this.$state.addCartGood(this.good);
      },
      isInCart() {
        return (this.good.uniqueId in this.cartGoods);
      }
  }
}
</script>
