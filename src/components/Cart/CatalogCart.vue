<template>
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" @click="clickCart"></div>
        
        <div class="modal-container bg-slate-600 text-gray-300 w-10/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">

            <!-- Add margin if you want to see some of the overlay behind the modal-->
            <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                    <p class="text-2xl font-bold">Корзина</p>
                    <div class="modal-close cursor-pointer z-50"
                        @click="clickCart">
                        <svg class="fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>

                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Наименование товара и описание</th>
                            <th>Количество</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colspan="3"
                                class="text-right">
                                Общая стоимость: {{ totalPrice }} ₽
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-for="good in cartGoods" :key="'cart_' + good.uniqueId">
                            <td>{{ good.unit.name }}</td>
                            <td>
                                <input type="number"
                                    min="1"
                                    :max="good.unit.P"
                                    step="1"
                                    @input="getTotalPrice()"
                                    v-model="good.quantity" />
                            </td>
                            <td>{{ countPositionPrice(priceInRoubles(good.unit.C), good.quantity) }} ₽</td>
                        </tr>
                    </tbody>
                </table>

                <!--Footer-->
                <div class="flex justify-end pt-2">
                    <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
                    <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Продолжить покупки</button>
                </div>
                
            </div>
        </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import fetchCartGoods from "@/store/cartGoods";
import * as countPrice from "@/store/countPrice";

export default {
  name: 'CatalogCart',
  emits: [
      'toggleCart'
  ],
  setup() {
    const { cartGoods, totalPrice, getCartGoods, getTotalPrice, reloadCartGoods } = fetchCartGoods();

    onMounted(() => {
      getCartGoods();
      getTotalPrice();
    });

    return {
      cartGoods,
      getTotalPrice,
      reloadCartGoods,
      totalPrice
    };
  },
  methods: {
    clickCart() {
      this.$emit('toggleCart');
    },
    countPositionPrice(price, quantity) {
        return price * quantity;
    },
    priceInRoubles(price) {
        return countPrice.priceInRoubles(price);
    }
  },
  watch: {
      cartGoods: { 
          handler: function(newValue) {
            this.reloadCartGoods(newValue);
          },
          deep: true
      }
  }
}
</script>