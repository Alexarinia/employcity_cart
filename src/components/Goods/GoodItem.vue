<template>
  <div class="catalog-item text-white flex flex-row items-center mb-2">
    <div class="flex-1 flex-grow text-left">
        <h3 class="font-bold text-gray-400 text-sm">{{ good.name }} ({{ good.P }})</h3>
    </div>
    <div class="ml-4 flex-shrink text-xs">
        <div class="rounded p-3 bg-slate-700">{{ priceInRoubles(good.C) }} ₽</div>
    </div>
    <div class="ml-1 flex-shrink w-[150px] text-xs">
        <button type="button"
                @click="addGoodToCart(good)"
                class="rounded p-3 bg-slate-400 select-none disabled:opacity-50"
                :disabled="quantityInCart === good.P"
                v-text="quantityInCart ? 'В корзине (' + quantityInCart + ')' : 'В корзину'">
        </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import fetchCartGoods from "@/store/cartGoods";
import fetchCountPrice from "@/store/countPrice";

export default {
  name: 'GoodsItem',
  props: {
    good: Object
  },
  setup() {
    const { cartGoods, getCartGoods, addGoodToCart } = fetchCartGoods();
    const { priceInRoubles } = fetchCountPrice();

    onMounted(() => {
      getCartGoods();
    });

    return {
      cartGoods,
      addGoodToCart,
      priceInRoubles
    };
  },
  computed: {
    quantityInCart() {
      if(this.good.uniqueId in this.cartGoods) {
        return this.cartGoods[this.good.uniqueId].quantity
      }

      return 0;
    }
  },
  methods: {
      addToCart() {
          this.$state.addCartGood(this.good);
      }
  }
}
</script>
