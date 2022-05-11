<template>
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            @click="clickCart"></div>
        
        <div class="modal-container bg-slate-600 text-gray-300 w-10/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">

            <div class="modal-content py-4 text-left px-6">
                <div class="flex justify-between items-center pb-3 border-b-2">
                    <p class="text-2xl font-bold">Корзина</p>
                    <div class="modal-close cursor-pointer z-50"
                        @click="clickCart">
                        <svg class="fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>

                <table class="table-auto w-full mt-3" v-if="cartIsEmpty()">
                    <thead>
                        <tr>
                            <th>Наименование товара и описание</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colspan="4"
                                class="text-right pt-3">
                                Общая стоимость: <span class="text-orange-500">{{ totalPrice }} ₽</span>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-for="good in cartGoods"
                            :key="'cart_' + good.unit.uniqueId"
                            class="text-sm">
                            <td>
                                <div class="w-full flex items-end">
                                    <span>{{ good.unit.name }}</span>
                                    <span class="flex-grow border-b border-dotted"></span>
                                </div>
                            </td>
                            <td>
                                <input type="number"
                                       :min="1"
                                       :max="good.unit.P"
                                       step="1"
                                       class="text-gray-600 w-[100px] text-center rounded-sm"
                                       @input="good.quantity = validateQuantity($event, good.unit.P)"
                                       :value="good.quantity" />
                            </td>
                            <td>{{ countPositionPrice(priceInRoubles(good.unit.C), good.quantity) }} ₽</td>
                            <td class="text-right">
                                <button type="button"
                                        @click="removeGoodFromCart(good.unit.uniqueId)">
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else
                     class="text-center p-4">
                     Товаров в корзине пока нет
                </div>

                <div class="flex justify-start pt-2">
                    <button class="modal-close px-4 bg-slate-800 p-3 rounded-lg text-white hover:bg-indigo-400">Продолжить покупки</button>
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
    const { cartGoods, totalPrice, getCartGoods, getTotalPrice, reloadCartGoods, removeGoodFromCart } = fetchCartGoods();

    onMounted(() => {
      getCartGoods();
      getTotalPrice();
    });

    return {
      cartGoods,
      getTotalPrice,
      reloadCartGoods,
      removeGoodFromCart,
      totalPrice
    };
  },
  methods: {
    // Определяем, пуста ли корзина
    cartIsEmpty() {
        return Object.keys(this.cartGoods).length;
    },
    // Прячем корзину
    clickCart() {
      this.$emit('toggleCart');
    },
    // Считаем стоимость позиции
    countPositionPrice(price, quantity) {
        return price * quantity;
    },
    // Конвертируем цену в рубли
    priceInRoubles(price) {
        return countPrice.priceInRoubles(price);
    },
    // Ради валидации не используем v-model
    validateQuantity(event, max) {
        let quantity = event.target.value;
        if (event.target.value > max) {
            quantity = max;
        } else if (event.target.value < 1) {
            quantity = 1;
        }

        this.$forceUpdate();
        this.getTotalPrice();

        return quantity;
    }
  },
  watch: {
      // Наблюдаем за ручным вводом количества товара
      cartGoods: { 
          handler: function(newValue) {
            this.reloadCartGoods(newValue);
          },
          deep: true
      }
  }
}
</script>